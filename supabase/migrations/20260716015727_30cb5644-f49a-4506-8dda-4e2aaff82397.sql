
-- Make the public view honor caller RLS
ALTER VIEW public.approved_testimonials SET (security_invoker = true);

-- Re-add a public SELECT policy so anon/authenticated can read approved rows,
-- but strip email at the column-privilege level so it stays private.
CREATE POLICY "Public can view approved testimonials"
ON public.testimonials
FOR SELECT
TO anon, authenticated
USING (status = 'approved');

REVOKE SELECT (email) ON public.testimonials FROM anon, authenticated;

-- Admin-only fetch returning full testimonial rows (including email).
CREATE OR REPLACE FUNCTION public.admin_list_testimonials(_status text DEFAULT NULL)
RETURNS SETOF public.testimonials
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL OR NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Not authorized' USING ERRCODE = '42501';
  END IF;
  RETURN QUERY
    SELECT * FROM public.testimonials
    WHERE _status IS NULL OR status = _status
    ORDER BY created_at DESC;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_list_testimonials(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_testimonials(text) TO authenticated;
