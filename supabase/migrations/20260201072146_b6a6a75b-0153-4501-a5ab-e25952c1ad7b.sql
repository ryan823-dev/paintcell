-- ===========================================
-- SECURITY FIX: Restrict leads table access
-- Only service role can SELECT/UPDATE/DELETE
-- Anonymous users can INSERT only (for form submissions)
-- ===========================================

-- Step 1: Drop existing policies on leads table
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
DROP POLICY IF EXISTS "Service role can manage leads" ON public.leads;

-- Step 2: Revoke all direct table privileges from anon and authenticated roles
-- This ensures even without RLS, these roles have no table-level access
REVOKE ALL ON TABLE public.leads FROM anon;
REVOKE ALL ON TABLE public.leads FROM authenticated;

-- Step 3: Grant minimal privileges needed
-- anon needs INSERT only (for quote wizard and AI chat submissions)
GRANT INSERT ON TABLE public.leads TO anon;
-- authenticated also gets INSERT in case they're logged in
GRANT INSERT ON TABLE public.leads TO authenticated;

-- Step 4: Create new restrictive RLS policies

-- Policy 1: Allow anonymous INSERT for form submissions
-- Frontend quote wizard and AI chat need to create leads
CREATE POLICY "Anonymous can submit leads"
  ON public.leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy 2: Allow authenticated INSERT (in case user is logged in)
CREATE POLICY "Authenticated can submit leads"
  ON public.leads
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy 3: Service role has full access (for edge functions and admin)
-- Service role bypasses RLS by default, but explicit policy for clarity
CREATE POLICY "Service role full access"
  ON public.leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- NO SELECT policies for anon or authenticated = they cannot read any leads
-- NO UPDATE policies for anon or authenticated = they cannot modify leads
-- NO DELETE policies for anon or authenticated = they cannot delete leads

-- Step 5: Add a comment explaining the security model
COMMENT ON TABLE public.leads IS 'Lead submissions from quote wizard and AI chat. SECURITY: No public read access. Only service role (edge functions) can read/update/delete. Anonymous users can only INSERT new leads.';