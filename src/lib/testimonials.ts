export type TestimonialStatus = "pending" | "approved" | "rejected";

export interface Testimonial {
  id: string;
  name: string;
  email: string | null;
  relation: string | null;
  service: string | null;
  rating: number;
  comment: string;
  status: TestimonialStatus;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export const SERVICES = [
  "Médico a Domicilio",
  "Enfermería a Domicilio",
  "Cuidadoras de Adulto Mayor",
  "Cuidados Postoperatorios",
  "Cuidados Paliativos",
  "Otro",
] as const;

const MONTHS_ES = [
  "enero","febrero","marzo","abril","mayo","junio",
  "julio","agosto","septiembre","octubre","noviembre","diciembre",
];

export function formatTestimonialDate(iso: string): string {
  const d = new Date(iso);
  // Use UTC to keep SSR and client output identical.
  return `${d.getUTCDate()} de ${MONTHS_ES[d.getUTCMonth()]} de ${d.getUTCFullYear()}`;
}

// Placeholder — el usuario lo reemplazará por su enlace real de Google Reviews.
export const GOOGLE_REVIEWS_URL = "#";
