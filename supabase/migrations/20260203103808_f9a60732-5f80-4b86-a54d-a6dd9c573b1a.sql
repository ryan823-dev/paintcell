-- Secure the leads table with RLS policies
-- Only admin users can access leads data
-- Edge functions use service_role key to bypass RLS for insertions

-- First ensure RLS is enabled (should already be, but confirm)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy: Only admins can SELECT leads
CREATE POLICY "Only admins can view leads"
ON public.leads
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create policy: Only admins can INSERT leads (edge functions use service_role)
CREATE POLICY "Only admins can insert leads"
ON public.leads
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create policy: Only admins can UPDATE leads
CREATE POLICY "Only admins can update leads"
ON public.leads
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create policy: Only admins can DELETE leads
CREATE POLICY "Only admins can delete leads"
ON public.leads
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));