
-- Fix 1: has_role -> SECURITY INVOKER (avoids linter warning). 
-- Drop admin policy on user_roles that would cause recursion under INVOKER; 
-- self-view policy remains and is sufficient for the app.
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Fix 2: Do not expose submitter emails to the public. 
-- Replace the public SELECT policy with a column-safe view.
DROP POLICY IF EXISTS "Public can view approved testimonials" ON public.testimonials;

CREATE OR REPLACE VIEW public.approved_testimonials
WITH (security_invoker = false) AS
SELECT id, name, relation, service, rating, comment, featured, created_at
FROM public.testimonials
WHERE status = 'approved';

GRANT SELECT ON public.approved_testimonials TO anon, authenticated;

-- Fix 3: Constrain content on public inserts to reduce spam/abuse surface.
ALTER TABLE public.testimonials
  ADD CONSTRAINT testimonials_name_len CHECK (char_length(name) BETWEEN 2 AND 100),
  ADD CONSTRAINT testimonials_comment_len CHECK (char_length(comment) BETWEEN 10 AND 1000),
  ADD CONSTRAINT testimonials_rating_range CHECK (rating BETWEEN 1 AND 5),
  ADD CONSTRAINT testimonials_relation_len CHECK (relation IS NULL OR char_length(relation) <= 100),
  ADD CONSTRAINT testimonials_service_len CHECK (service IS NULL OR char_length(service) <= 100),
  ADD CONSTRAINT testimonials_email_len CHECK (email IS NULL OR char_length(email) <= 255);
