import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Acceso administrativo | Servicios Médicos MB" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin/testimonios" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setBusy(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setError(error.message);
      navigate({ to: "/admin/testimonios" });
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin + "/admin/testimonios" },
      });
      setBusy(false);
      if (error) return setError(error.message);
      setInfo("Cuenta creada. Pídele al administrador del sitio que te asigne el rol de admin para acceder al panel.");
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-brand-soft/40 px-4 py-16">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-card border border-[color:var(--brand-soft)] p-8">
        <div className="text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-deep text-white mx-auto">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold text-brand-deep">
            {mode === "signin" ? "Acceso administrativo" : "Crear cuenta"}
          </h1>
          <p className="mt-1 text-sm text-ink/70">
            Panel de gestión de testimonios
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-brand-deep mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[color:var(--brand-soft)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-deep mb-2">Contraseña</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[color:var(--brand-soft)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {info && <p className="text-sm text-emerald-700">{info}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-deep text-white font-semibold hover:bg-brand-deep/90 transition disabled:opacity-60"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "signin" ? "Iniciar sesión" : "Crear cuenta"}
          </button>
        </form>

        <button
          onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(null); setInfo(null); }}
          className="mt-4 w-full text-sm text-[color:var(--brand)] hover:underline"
        >
          {mode === "signin" ? "¿No tienes cuenta? Crear una" : "Ya tengo cuenta · Iniciar sesión"}
        </button>

        <Link to="/" className="block mt-6 text-center text-xs text-ink/60 hover:underline">
          ← Volver al sitio
        </Link>
      </div>
    </div>
  );
}
