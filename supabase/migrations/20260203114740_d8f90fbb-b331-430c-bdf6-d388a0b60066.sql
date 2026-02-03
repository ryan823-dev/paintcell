-- =====================================================
-- Secure chat_sessions and chat_messages tables
-- Restrict access to admin users only
-- Edge functions use service_role which bypasses RLS
-- =====================================================

-- Ensure RLS is enabled on chat_sessions (it should already be enabled)
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;

-- Ensure RLS is enabled on chat_messages (it should already be enabled)
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Revoke all privileges from anon and authenticated roles on these tables
-- This ensures no direct client access even without policies
REVOKE ALL ON public.chat_sessions FROM anon, authenticated;
REVOKE ALL ON public.chat_messages FROM anon, authenticated;

-- =====================================================
-- chat_sessions policies - Admin only access
-- =====================================================

-- Admin can view all chat sessions
CREATE POLICY "Only admins can view chat_sessions"
ON public.chat_sessions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Admin can update chat sessions
CREATE POLICY "Only admins can update chat_sessions"
ON public.chat_sessions
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Admin can delete chat sessions
CREATE POLICY "Only admins can delete chat_sessions"
ON public.chat_sessions
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- =====================================================
-- chat_messages policies - Admin only access
-- =====================================================

-- Admin can view all chat messages
CREATE POLICY "Only admins can view chat_messages"
ON public.chat_messages
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Admin can update chat messages
CREATE POLICY "Only admins can update chat_messages"
ON public.chat_messages
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Admin can delete chat messages
CREATE POLICY "Only admins can delete chat_messages"
ON public.chat_messages
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Note: INSERT is handled by Edge Functions using service_role key
-- which bypasses RLS, so no INSERT policies are needed for client access