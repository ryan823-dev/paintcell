-- Add explicit SELECT policy on user_roles to restrict reads to admins only
-- This prevents non-admin users from querying user_roles directly
-- Note: SECURITY DEFINER functions (has_role, is_admin_or_editor) bypass RLS and will still work

CREATE POLICY "Only admins can read user_roles"
ON public.user_roles
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));