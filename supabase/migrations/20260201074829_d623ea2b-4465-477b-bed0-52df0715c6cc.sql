-- ===========================================
-- SECURITY FIX: Secure chat_messages and chat_sessions tables
-- Remove all public access - only service role can access
-- ===========================================

-- Step 1: Drop any existing policies on chat_messages
DROP POLICY IF EXISTS "allow anon insert chat_messages" ON public.chat_messages;
DROP POLICY IF EXISTS "allow auth insert chat_messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Anonymous can insert messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Authenticated can insert messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Service role full access" ON public.chat_messages;

-- Step 2: Drop any existing policies on chat_sessions
DROP POLICY IF EXISTS "allow anon insert chat_sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "allow auth insert chat_sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Anonymous can create chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Authenticated can create chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Service role manages sessions" ON public.chat_sessions;

-- Step 3: Ensure RLS is enabled on both tables
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;

-- Step 4: Revoke ALL privileges from anon and authenticated roles
-- This prevents any direct table access even without RLS
REVOKE ALL ON TABLE public.chat_messages FROM anon;
REVOKE ALL ON TABLE public.chat_messages FROM authenticated;
REVOKE ALL ON TABLE public.chat_sessions FROM anon;
REVOKE ALL ON TABLE public.chat_sessions FROM authenticated;

-- NO POLICIES for anon/authenticated = zero access (RLS blocks everything)
-- Service role bypasses RLS by default, so no explicit policy needed

-- Step 5: Add comments explaining the security model
COMMENT ON TABLE public.chat_messages IS 'AI chat conversation messages. SECURITY: No public access. Only service role (edge functions) can read/write. Anonymous users must use edge functions for chat operations.';
COMMENT ON TABLE public.chat_sessions IS 'AI chat sessions for tracking conversations. SECURITY: No public access. Only service role (edge functions) can manage sessions.';