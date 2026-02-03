-- Refactor has_role() to require authenticated caller
-- SECURITY DEFINER is required to prevent RLS recursion when used in policies
-- Added explicit auth.uid() check to ensure only authenticated users can query roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  -- Require authenticated session - return false if no auth context
  SELECT CASE 
    WHEN auth.uid() IS NULL THEN false
    ELSE EXISTS (
      SELECT 1
      FROM public.user_roles
      WHERE user_id = _user_id
        AND role = _role
    )
  END
$$;

-- Refactor is_admin_or_editor() to require authenticated caller
-- SECURITY DEFINER is required to prevent RLS recursion when used in policies
-- Added explicit auth.uid() check to ensure only authenticated users can query roles
CREATE OR REPLACE FUNCTION public.is_admin_or_editor(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  -- Require authenticated session - return false if no auth context
  SELECT CASE 
    WHEN auth.uid() IS NULL THEN false
    ELSE EXISTS (
      SELECT 1
      FROM public.user_roles
      WHERE user_id = _user_id
        AND role IN ('admin', 'editor')
    )
  END
$$;