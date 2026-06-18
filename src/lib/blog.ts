import heroFeatured from "@/assets/blog/adulto-mayor-supervision.jpg";
import heroMedico from "@/assets/blog/medico-domicilio-urgencias.jpg";
import heroTens from "@/assets/blog/tens-enfermera-cuidadora.jpg";

export type BlogCategory =
  | "Médico a Domicilio"
  | "Enfermería a Domicilio"
  | "Cuidadoras Adulto Mayor"
  | "Cuidados Paliativos"
  | "Pacientes Postrados"
  | "Adulto Mayor"
  | "Consejos para Familias"
  | "Noticias y Novedades";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string; // ISO
  readingMinutes: number;
  featured?: boolean;
  image?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export const CATEGORIES: BlogCategory[] = [
  "Médico a Domicilio",
  "Enfermería a Domicilio",
  "Cuidadoras Adulto Mayor",
  "Cuidados Paliativos",
  "Pacientes Postrados",
  "Adulto Mayor",
  "Consejos para Familias",
  "Noticias y Novedades",
];

export const POSTS: BlogPost[] = [
  // FEATURED
  {
    slug: "7-senales-adulto-mayor-necesita-supervision",
    title: "7 señales de que tu padre o madre ya no debería vivir sin supervisión",
    excerpt:
      "Aprenda a identificar las señales de alerta que indican que su familiar necesita acompañamiento profesional en casa.",
    category: "Adulto Mayor",
    date: "2026-05-12",
    readingMinutes: 6,
    featured: true,
    image: heroFeatured,
  },
  {
    slug: "cuando-llamar-medico-a-domicilio-evita-urgencias",
    title: "5 situaciones en las que llamar un médico a domicilio puede evitar una visita a urgencias",
    excerpt:
      "Conozca los escenarios clínicos donde la atención médica en casa es más segura, rápida y cómoda que ir a urgencias.",
    category: "Médico a Domicilio",
    date: "2026-05-08",
    readingMinutes: 5,
    featured: true,
    image: heroMedico,
  },
  {
    slug: "tens-enfermera-o-cuidadora",
    title: "¿TENS, enfermera o cuidadora? La diferencia que puede afectar el cuidado de tu familiar",
    excerpt:
      "Una guía clara para entender los roles, competencias y cuándo elegir cada profesional para el cuidado domiciliario.",
    category: "Enfermería a Domicilio",
    date: "2026-05-02",
    readingMinutes: 7,
    featured: true,
    image: heroTens,
  },

  // ADULTO MAYOR
  {
    slug: "familiar-se-cae-con-frecuencia-senales-de-alerta",
    title: "¿Tu familiar se cae con frecuencia? Estas son las señales de alerta que no debes ignorar",
    excerpt: "Las caídas recurrentes son síntoma de algo más profundo. Aprenda qué buscar y cuándo actuar.",
    category: "Adulto Mayor",
    date: "2026-04-28",
    readingMinutes: 5,
  },
  {
    slug: "error-familias-hospitalizacion-adulto-mayor",
    title: "El error que cometen muchas familias y que termina en una hospitalización del adulto mayor",
    excerpt: "Una decisión común que muchas familias toman demasiado tarde y cómo evitarla a tiempo.",
    category: "Adulto Mayor",
    date: "2026-04-22",
    readingMinutes: 6,
  },
  {
    slug: "cuando-cuidadora-deja-de-ser-gasto",
    title: "¿Cuándo una cuidadora deja de ser un gasto y se convierte en una necesidad?",
    excerpt: "Cómo evaluar objetivamente cuándo contratar apoyo profesional para el cuidado en casa.",
    category: "Cuidadoras Adulto Mayor",
    date: "2026-04-18",
    readingMinutes: 5,
  },
  {
    slug: "adulto-mayor-oculta-problemas-de-salud",
    title: "Cómo saber si un adulto mayor está ocultando problemas de salud",
    excerpt: "Señales sutiles que delatan síntomas que muchos mayores prefieren no compartir con su familia.",
    category: "Adulto Mayor",
    date: "2026-04-12",
    readingMinutes: 6,
  },

  // MÉDICO A DOMICILIO
  {
    slug: "por-que-familias-prefieren-atencion-medica-en-casa",
    title: "La razón por la que cada vez más familias prefieren atención médica en casa",
    excerpt: "Comodidad, seguridad y trato humano: las claves detrás del crecimiento del modelo domiciliario.",
    category: "Médico a Domicilio",
    date: "2026-04-09",
    readingMinutes: 5,
  },
  {
    slug: "vale-la-pena-pagar-medico-a-domicilio",
    title: "¿Vale la pena pagar un médico a domicilio? Comparación real de costos y beneficios",
    excerpt: "Análisis transparente del costo total entre urgencias, consultas y atención médica domiciliaria.",
    category: "Médico a Domicilio",
    date: "2026-04-03",
    readingMinutes: 7,
  },
  {
    slug: "adulto-mayor-se-niega-a-ir-al-medico",
    title: "Qué hacer cuando un adulto mayor se niega a ir al médico",
    excerpt: "Estrategias respetuosas para abordar la negativa sin generar conflictos familiares.",
    category: "Médico a Domicilio",
    date: "2026-03-28",
    readingMinutes: 5,
  },
  {
    slug: "sintomas-que-nunca-debes-ignorar-adulto-mayor",
    title: "Los síntomas que nunca deberías ignorar en un adulto mayor",
    excerpt: "Una lista clínica de banderas rojas que requieren evaluación médica inmediata.",
    category: "Médico a Domicilio",
    date: "2026-03-22",
    readingMinutes: 6,
  },

  // ENFERMERÍA
  {
    slug: "es-seguro-administrar-medicamentos-iv-en-casa",
    title: "¿Es seguro administrar medicamentos intravenosos en casa?",
    excerpt: "Requisitos, protocolos y profesionales necesarios para una terapia IV domiciliaria segura.",
    category: "Enfermería a Domicilio",
    date: "2026-03-18",
    readingMinutes: 6,
  },
  {
    slug: "riesgos-de-retrasar-curacion-avanzada",
    title: "Los riesgos de retrasar una curación avanzada",
    excerpt: "Por qué postergar una curación profesional puede comprometer la recuperación.",
    category: "Enfermería a Domicilio",
    date: "2026-03-12",
    readingMinutes: 5,
  },
  {
    slug: "prevenir-infecciones-postoperatorias",
    title: "Cómo prevenir infecciones en pacientes postoperatorios",
    excerpt: "Buenas prácticas en el hogar para reducir el riesgo de infecciones tras una cirugía.",
    category: "Enfermería a Domicilio",
    date: "2026-03-06",
    readingMinutes: 6,
  },
  {
    slug: "que-debe-tener-enfermera-a-domicilio-capacitada",
    title: "Qué debe tener una enfermera a domicilio realmente capacitada",
    excerpt: "Certificaciones, experiencia y habilidades blandas que debe reunir una enfermera profesional.",
    category: "Enfermería a Domicilio",
    date: "2026-03-01",
    readingMinutes: 5,
  },

  // CONSEJOS PARA FAMILIAS
  {
    slug: "no-puedo-cuidarlo-solo-pedir-ayuda",
    title: "No puedo cuidarlo solo: cuándo pedir ayuda profesional no es un fracaso",
    excerpt: "Romper el mito de que cuidar implica hacerlo todo y reconocer cuándo delegar.",
    category: "Consejos para Familias",
    date: "2026-02-24",
    readingMinutes: 5,
  },
  {
    slug: "culpa-al-contratar-cuidadora",
    title: "La culpa que sienten muchos hijos al contratar una cuidadora",
    excerpt: "Una mirada empática a una emoción frecuente y cómo procesarla con perspectiva.",
    category: "Consejos para Familias",
    date: "2026-02-19",
    readingMinutes: 5,
  },
  {
    slug: "cuidar-familiar-sin-descuidar-tu-salud",
    title: "Cómo cuidar a un familiar sin descuidar tu propia salud",
    excerpt: "Estrategias prácticas para evitar el agotamiento del cuidador principal.",
    category: "Consejos para Familias",
    date: "2026-02-13",
    readingMinutes: 6,
  },
  {
    slug: "lo-que-aprendimos-acompanando-familias",
    title: "Lo que aprendimos acompañando a familias en el cuidado de adultos mayores",
    excerpt: "Lecciones reales de nuestro equipo tras años de atención domiciliaria.",
    category: "Consejos para Familias",
    date: "2026-02-08",
    readingMinutes: 6,
  },
  {
    slug: "desgaste-silencioso-cuidar-24-horas",
    title: "El desgaste silencioso de cuidar a un ser querido las 24 horas",
    excerpt: "Cómo identificar el síndrome del cuidador y qué hacer para prevenirlo.",
    category: "Consejos para Familias",
    date: "2026-02-02",
    readingMinutes: 6,
  },

  // NOTICIAS Y NOVEDADES
  {
    slug: "campana-vacunacion-influenza-2026",
    title: "Campaña de vacunación contra la influenza 2026: lo que su familia debe saber",
    excerpt: "Fechas, grupos prioritarios y opciones de vacunación a domicilio.",
    category: "Noticias y Novedades",
    date: "2026-05-15",
    readingMinutes: 4,
  },
  {
    slug: "prevencion-enfermedades-respiratorias-invierno",
    title: "Prevención de enfermedades respiratorias en invierno",
    excerpt: "Recomendaciones clínicas para proteger a adultos mayores en la temporada fría.",
    category: "Noticias y Novedades",
    date: "2026-05-10",
    readingMinutes: 5,
  },
  {
    slug: "nuevos-servicios-cobertura-region-metropolitana",
    title: "Nuevos servicios y coberturas en la Región Metropolitana",
    excerpt: "Ampliamos planes y zonas de atención para llegar a más familias.",
    category: "Noticias y Novedades",
    date: "2026-05-04",
    readingMinutes: 3,
  },
];

const MONTHS_ES = [
  "enero","febrero","marzo","abril","mayo","junio",
  "julio","agosto","septiembre","octubre","noviembre","diciembre",
];
export const formatDate = (iso: string) => {
  // Parse as date-only to avoid timezone shifts between SSR (UTC) and client (local).
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} de ${MONTHS_ES[m - 1]} de ${y}`;
};

export const getPostBySlug = (slug: string) => POSTS.find((p) => p.slug === slug);
