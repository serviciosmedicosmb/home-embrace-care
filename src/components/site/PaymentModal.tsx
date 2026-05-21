import { useEffect, useState } from "react";
import { X, Lock, CreditCard, CheckCircle2, Loader2 } from "lucide-react";

type Method = "webpay" | "mercadopago";

const services = [
  { id: "medico", label: "Médico a domicilio (consulta)", price: 80000 },
  { id: "enfermeria", label: "Enfermería domiciliaria (consulta)", price: 50000 },
  { id: "adulto", label: "Cuidado adulto mayor (día)", price: 110000 },
  { id: "postop", label: "Cuidado postoperatorio (día)", price: 120000 },
  { id: "plan-basico", label: "Plan Básico (mensual)", price: 1550000 },
  { id: "plan-integral", label: "Plan Integral (mensual)", price: 3100000 },
  { id: "plan-premium", label: "Plan Premium (mensual)", price: 4100000 },
  { id: "plan-personalizado", label: "Plan Personalizado (cotización)", price: 0 },
];

const fmt = (n: number) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n);

export function PaymentModal({ open, onClose, method }: { open: boolean; onClose: () => void; method: Method | null }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [serviceId, setServiceId] = useState(services[0].id);
  const [form, setForm] = useState({
    fullName: "",
    rut: "",
    email: "",
    phone: "",
    address: "",
    commune: "",
    notes: "",
  });

  useEffect(() => {
    if (open) { setStep(1); setLoading(false); }
  }, [open, method]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open || !method) return null;

  const service = services.find((s) => s.id === serviceId)!;
  const brandLabel = method === "webpay" ? "WebPay Plus" : "Mercado Pago";
  const brandColor = method === "webpay" ? "#E60028" : "#00B1EA";

  const handle = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const canContinue = form.fullName && form.rut && form.email && form.phone && form.address && form.commune;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canContinue) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(3); }, 1600);
  };

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-4 animate-fade">
      <div className="absolute inset-0 bg-brand-deep/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-card border border-[color:var(--brand-soft)]">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-6 py-4 border-b border-[color:var(--brand-soft)] bg-white/95 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl grid place-items-center text-white" style={{ background: brandColor }}>
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-ink">Pago seguro</p>
              <h3 className="font-display font-bold text-brand-deep">{brandLabel}</h3>
            </div>
          </div>
          <button onClick={onClose} aria-label="Cerrar" className="h-10 w-10 grid place-items-center rounded-xl hover:bg-brand-soft text-brand-deep">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 pt-5">
          <div className="flex items-center gap-2 text-xs font-medium">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`h-7 w-7 rounded-full grid place-items-center font-display font-bold ${step >= (s as 1|2|3) ? "bg-[color:var(--brand)] text-white" : "bg-brand-soft text-brand-deep/60"}`}>{s}</div>
                {s < 3 && <div className={`flex-1 h-0.5 ${step > (s as 1|2|3) ? "bg-[color:var(--brand)]" : "bg-brand-soft"}`} />}
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-3 text-[11px] text-ink uppercase tracking-wider">
            <span>Servicio</span><span className="text-center">Datos</span><span className="text-right">Confirmar</span>
          </div>
        </div>

        {step === 1 && (
          <div className="p-6">
            <h4 className="font-display font-bold text-brand-deep text-lg">Selecciona el servicio</h4>
            <p className="text-sm text-ink mt-1">Elige el servicio que deseas pagar.</p>
            <div className="mt-5 grid gap-2">
              {services.map((s) => (
                <label key={s.id} className={`flex items-center justify-between gap-4 p-4 rounded-2xl border cursor-pointer transition ${serviceId === s.id ? "border-[color:var(--brand)] bg-brand-soft/60" : "border-[color:var(--brand-soft)] hover:border-[color:var(--brand)]/40"}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="svc" checked={serviceId === s.id} onChange={() => setServiceId(s.id)} className="accent-[color:var(--brand)]" />
                    <span className="font-medium text-brand-deep">{s.label}</span>
                  </div>
                  <span className="font-display font-bold text-brand-deep">{fmt(s.price)}</span>
                </label>
              ))}
            </div>
            <button onClick={() => setStep(2)} className="btn-primary mt-6 w-full justify-center">Continuar</button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={submit} className="p-6">
            <h4 className="font-display font-bold text-brand-deep text-lg">Datos del pagador</h4>
            <p className="text-sm text-ink mt-1">Información necesaria para emitir tu boleta y coordinar el servicio.</p>
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              <Field label="Nombre completo" required value={form.fullName} onChange={handle("fullName")} placeholder="Ej. María Pérez" />
              <Field label="RUT" required value={form.rut} onChange={handle("rut")} placeholder="12.345.678-9" />
              <Field label="Email" type="email" required value={form.email} onChange={handle("email")} placeholder="tucorreo@ejemplo.cl" />
              <Field label="Teléfono" type="tel" required value={form.phone} onChange={handle("phone")} placeholder="+56 9 ..." />
              <Field label="Dirección" required value={form.address} onChange={handle("address")} placeholder="Calle 123, depto" wrapperClass="sm:col-span-2" />
              <Field label="Comuna" required value={form.commune} onChange={handle("commune")} placeholder="Las Condes" />
              <Field label="Paciente / nota" value={form.notes} onChange={handle("notes")} placeholder="Opcional" />
            </div>

            <div className="mt-6 flex items-center justify-between rounded-2xl bg-brand-soft px-4 py-3">
              <span className="text-sm text-brand-deep">{service.label}</span>
              <span className="font-display font-bold text-brand-deep">{fmt(service.price)}</span>
            </div>

            <div className="mt-2 flex items-center gap-2 text-xs text-ink">
              <Lock className="h-3.5 w-3.5" /> Conexión cifrada · Tus datos están protegidos.
            </div>

            <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3">
              <button type="button" onClick={() => setStep(1)} className="btn-outline flex-1 justify-center">Volver</button>
              <button type="submit" disabled={!canContinue || loading} className="btn-primary flex-1 justify-center disabled:opacity-60 disabled:cursor-not-allowed" style={{ background: brandColor }}>
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Conectando con {brandLabel}…</> : <>Pagar {fmt(service.price)}</>}
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="p-8 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-[color:var(--whatsapp)]/15 grid place-items-center text-[color:var(--whatsapp)]">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h4 className="mt-5 font-display font-bold text-2xl text-brand-deep">¡Solicitud recibida!</h4>
            <p className="mt-2 text-ink max-w-md mx-auto">
              Hemos recibido tus datos para pagar <span className="font-semibold text-brand-deep">{service.label}</span> con {brandLabel}.
              Un ejecutivo te contactará en minutos para finalizar el pago de forma segura.
            </p>
            <div className="mt-6 rounded-2xl bg-brand-soft p-4 text-left text-sm text-brand-deep">
              <p><b>{form.fullName}</b> · {form.rut}</p>
              <p>{form.email} · {form.phone}</p>
              <p>{form.address}, {form.commune}</p>
            </div>
            <button onClick={onClose} className="btn-primary mt-6 w-full justify-center">Cerrar</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, required, wrapperClass = "", type = "text", ...rest }: {
  label: string; required?: boolean; wrapperClass?: string; type?: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string;
}) {
  return (
    <label className={`block ${wrapperClass}`}>
      <span className="text-xs font-semibold text-brand-deep uppercase tracking-wider">{label}{required && <span className="text-[color:var(--brand)]"> *</span>}</span>
      <input
        type={type}
        required={required}
        {...rest}
        className="mt-1.5 w-full rounded-xl border border-[color:var(--brand-soft)] bg-white px-4 py-3 text-sm text-brand-deep outline-none focus:border-[color:var(--brand)] focus:ring-4 focus:ring-[color:var(--brand)]/10 transition"
      />
    </label>
  );
}
