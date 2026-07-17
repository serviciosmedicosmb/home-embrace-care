REVOKE SELECT ON public.testimonials FROM anon;
GRANT SELECT (id, name, relation, service, rating, comment, status, featured, created_at, updated_at) ON public.testimonials TO anon;