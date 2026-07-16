import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Loader2, LogOut, CheckCircle2, XCircle, Star, Trash2, Pencil, Save, X, ShieldAlert,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { StarRating } from "@/components/site/StarRating";
import { formatTestimonialDate, type Testimonial, type TestimonialStatus } from "@/lib/testimonials";

export const Route = createFileRoute("/_authenticated/admin/testimonios")({
  component: AdminTestimoniosPage,
  head: () => ({ meta: [{ title: "Panel · Testimonios" }, { name: "robots", content: "noindex" }] }),
});

type Filter = "all" | TestimonialStatus;

function AdminTestimoniosPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("pending");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return;
      setUserId(data.user.id);
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id);
      setIsAdmin(Boolean(roles?.some((r) => r.role === "admin")));
    })();
  }, []);

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["admin-testimonials", filter],
    enabled: isAdmin === true,
    queryFn: async (): Promise<Testimonial[]> => {
      let q = supabase.from("testimonials").select("id,name,relation,service,rating,comment,status,featured,created_at,updated_at").order("created_at", { ascending: false });
      if (filter !== "all") q = q.eq("status", filter);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as Testimonial[];
    },
  });

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (isAdmin === null) {
    return (
      <div className="min-h-screen grid place-items-center">
        <Loader2 className="h-8 w-8 animate-spin text-[color:var(--brand)]" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center px-4">
        <div className="max-w-md rounded-2xl border border-amber-300 bg-amber-50 p-8 text-center">
          <ShieldAlert className="h-10 w-10 text-amber-600 mx-auto" />
          <h1 className="mt-4 font-display text-xl font-bold text-brand-deep">Acceso restringido</h1>
          <p className="mt-2 text-sm text-ink/80">
            Tu cuenta no tiene rol de administrador. Pide al propietario del sitio que te asigne el rol{" "}
            <code className="px-1 py-0.5 bg-white rounded">admin</code> para tu usuario.
          </p>
          {userId && <p className="mt-3 text-xs text-ink/60 break-all">Tu user_id: <code>{userId}</code></p>}
          <button onClick={signOut} className="mt-6 text-sm font-semibold text-[color:var(--brand)] hover:underline">
            Cerrar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-soft/30">
      <header className="bg-white border-b border-[color:var(--brand-soft)] sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="font-display text-lg font-bold text-brand-deep">Panel · Testimonios</h1>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 text-sm font-medium text-ink/80 hover:text-brand-deep"
          >
            <LogOut className="h-4 w-4" /> Cerrar sesión
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {(["pending","approved","rejected","all"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filter === f
                  ? "bg-brand-deep text-white"
                  : "bg-white border border-[color:var(--brand-soft)] text-ink hover:border-[color:var(--brand)]"
              }`}
            >
              {f === "pending" ? "Pendientes" : f === "approved" ? "Aprobados" : f === "rejected" ? "Rechazados" : "Todos"}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-[color:var(--brand)]" /></div>
        ) : items.length === 0 ? (
          <p className="text-center text-ink/70 py-16">No hay testimonios en esta categoría.</p>
        ) : (
          <div className="grid gap-4">
            {items.map((t) => <AdminRow key={t.id} t={t} />)}
          </div>
        )}
      </main>
    </div>
  );
}

function AdminRow({ t }: { t: Testimonial }) {
  const qc = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ name: t.name, comment: t.comment, rating: t.rating });
  const [busy, setBusy] = useState(false);

  async function update(patch: Partial<Testimonial>) {
    setBusy(true);
    const { error } = await supabase.from("testimonials").update(patch).eq("id", t.id);
    setBusy(false);
    if (!error) qc.invalidateQueries({ queryKey: ["admin-testimonials"] });
    else alert(error.message);
  }

  async function remove() {
    if (!confirm("¿Eliminar este testimonio? Esta acción no se puede deshacer.")) return;
    setBusy(true);
    const { error } = await supabase.from("testimonials").delete().eq("id", t.id);
    setBusy(false);
    if (!error) qc.invalidateQueries({ queryKey: ["admin-testimonials"] });
    else alert(error.message);
  }

  async function saveEdit() {
    await update({ name: draft.name, comment: draft.comment, rating: draft.rating });
    setEditing(false);
  }

  const statusBadge = {
    pending: "bg-amber-100 text-amber-800",
    approved: "bg-emerald-100 text-emerald-800",
    rejected: "bg-red-100 text-red-800",
  }[t.status];

  return (
    <article className="rounded-2xl bg-white border border-[color:var(--brand-soft)] p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusBadge}`}>{t.status}</span>
            {t.featured && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-400 text-brand-deep">Destacado</span>
            )}
            <StarRating value={t.rating} />
            <span className="text-xs text-ink/60">{formatTestimonialDate(t.created_at)}</span>
          </div>

          {editing ? (
            <div className="mt-3 space-y-2">
              <input
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[color:var(--brand-soft)]"
              />
              <textarea
                value={draft.comment}
                onChange={(e) => setDraft({ ...draft, comment: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-[color:var(--brand-soft)]"
              />
              <div className="flex items-center gap-2">
                <label className="text-sm">Estrellas:</label>
                <select
                  value={draft.rating}
                  onChange={(e) => setDraft({ ...draft, rating: Number(e.target.value) })}
                  className="px-2 py-1 rounded border border-[color:var(--brand-soft)]"
                >
                  {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>
          ) : (
            <>
              <p className="mt-3 font-semibold text-brand-deep">{t.name}</p>
              {(t.service || t.email) && (
                <p className="text-xs text-ink/60">
                  {t.service}{t.service && t.email ? " · " : ""}{t.email}
                </p>
              )}
              <p className="mt-2 text-sm text-ink/85">"{t.comment}"</p>
            </>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {editing ? (
          <>
            <button onClick={saveEdit} disabled={busy} className="btn-action bg-brand-deep text-white">
              <Save className="h-4 w-4" /> Guardar
            </button>
            <button onClick={() => setEditing(false)} className="btn-action bg-gray-100 text-ink">
              <X className="h-4 w-4" /> Cancelar
            </button>
          </>
        ) : (
          <>
            {t.status !== "approved" && (
              <button onClick={() => update({ status: "approved" })} disabled={busy} className="btn-action bg-emerald-600 text-white">
                <CheckCircle2 className="h-4 w-4" /> Aprobar
              </button>
            )}
            {t.status !== "rejected" && (
              <button onClick={() => update({ status: "rejected" })} disabled={busy} className="btn-action bg-red-600 text-white">
                <XCircle className="h-4 w-4" /> Rechazar
              </button>
            )}
            <button onClick={() => update({ featured: !t.featured })} disabled={busy} className="btn-action bg-amber-500 text-white">
              <Star className="h-4 w-4" /> {t.featured ? "Quitar destacado" : "Destacar"}
            </button>
            <button onClick={() => setEditing(true)} className="btn-action bg-gray-100 text-ink">
              <Pencil className="h-4 w-4" /> Editar
            </button>
            <button onClick={remove} disabled={busy} className="btn-action bg-white border border-red-200 text-red-700">
              <Trash2 className="h-4 w-4" /> Eliminar
            </button>
          </>
        )}
      </div>

      <style>{`
        .btn-action {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.5rem 0.9rem; border-radius: 0.6rem;
          font-size: 0.85rem; font-weight: 600;
          transition: opacity 0.2s;
        }
        .btn-action:hover { opacity: 0.9; }
        .btn-action:disabled { opacity: 0.5; }
      `}</style>
    </article>
  );
}
