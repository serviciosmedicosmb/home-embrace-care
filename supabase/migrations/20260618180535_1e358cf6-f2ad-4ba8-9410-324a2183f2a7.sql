
-- Roles enum and table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Testimonials
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  relation TEXT,
  service TEXT,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT, INSERT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Anyone can read approved testimonials
CREATE POLICY "Public can view approved testimonials"
  ON public.testimonials FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');

-- Admins see everything
CREATE POLICY "Admins can view all testimonials"
  ON public.testimonials FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Anyone (anon or authenticated) can submit, but only as pending and not featured
CREATE POLICY "Anyone can submit testimonials"
  ON public.testimonials FOR INSERT
  TO anon, authenticated
  WITH CHECK (status = 'pending' AND featured = FALSE);

-- Only admins can update / delete
CREATE POLICY "Admins can update testimonials"
  ON public.testimonials FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete testimonials"
  ON public.testimonials FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Seed a few approved testimonials so the section isn't empty
INSERT INTO public.testimonials (name, relation, service, rating, comment, status, featured) VALUES
  ('María González', 'Hija de paciente', 'Enfermería a Domicilio', 5, 'Excelente atención. La enfermera fue muy profesional, puntual y amable. Mi madre recibió un cuidado excepcional.', 'approved', TRUE),
  ('Carlos Rodríguez', 'Familiar', 'Cuidadoras de Adulto Mayor', 5, 'Contratamos una cuidadora para mi padre y la experiencia fue excelente. Muy recomendable.', 'approved', TRUE),
  ('Ana Pérez', 'Paciente', 'Médico a Domicilio', 5, 'El equipo médico respondió rápidamente y nos entregó tranquilidad en un momento difícil.', 'approved', FALSE),
  ('Roberto Silva', 'Hijo de paciente', 'Enfermería a Domicilio', 5, 'Servicio de primer nivel, el TENS llegó puntual y trató a mi padre con muchísimo respeto.', 'approved', FALSE),
  ('Patricia Muñoz', 'Familiar', 'Cuidados Postrados', 5, 'Nos acompañaron en un proceso muy difícil con calidez humana y profesionalismo. Gracias.', 'approved', FALSE);
