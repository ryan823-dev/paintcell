-- Fix RLS policy error: "new row violates row-level security policy for table 'resources_posts'"
-- This happens when the user is not in the user_roles table with admin or editor role

-- Step 1: Check your user ID
-- Run this in Supabase SQL Editor to find your user ID:
-- SELECT id, email FROM auth.users;

-- Step 2: Add admin role for your user (replace USER_ID with your actual user ID from step 1)
-- Example:
-- INSERT INTO public.user_roles (user_id, role)
-- VALUES ('YOUR_USER_ID_HERE', 'admin')
-- ON CONFLICT (user_id, role) DO NOTHING;

-- Alternative: If you want to add editor role instead:
-- INSERT INTO public.user_roles (user_id, role)
-- VALUES ('YOUR_USER_ID_HERE', 'editor')
-- ON CONFLICT (user_id, role) DO NOTHING;

-- Quick fix for development: Grant admin role to all authenticated users (USE WITH CAUTION)
-- Uncomment the following lines if you want to auto-grant admin to all users:
-- INSERT INTO public.user_roles (user_id, role)
-- SELECT id, 'admin' FROM auth.users
-- ON CONFLICT (user_id, role) DO NOTHING;

-- Verify the fix:
-- SELECT u.email, r.role
-- FROM auth.users u
-- LEFT JOIN public.user_roles r ON u.id = r.user_id;
