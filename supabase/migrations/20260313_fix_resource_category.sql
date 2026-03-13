-- Fix resource_category enum to match website Resources modules
-- Website has: Engineering Library, Standards & Compliance, Glossary, Tools & Templates
-- Current enum: learning-center, tools-templates, glossary

-- Step 1: Rename learning-center to engineering-library (if any data exists)
UPDATE public.resources_posts
SET category = 'engineering-library'
WHERE category = 'learning-center';

-- Step 2: Drop the old enum values and add new ones
-- First, alter existing values
ALTER TYPE public.resource_category RENAME TO resource_category_old;

-- Create new enum with correct values
CREATE TYPE public.resource_category AS ENUM (
  'engineering-library',
  'standards-compliance',
  'glossary',
  'tools-templates'
);

-- Update the column to use new enum type
ALTER TABLE public.resources_posts
ALTER COLUMN category TYPE public.resource_category
USING category::text::public.resource_category;

-- Drop old enum
DROP TYPE public.resource_category_old;

-- Add comment for documentation
COMMENT ON TYPE public.resource_category IS 'Resource categories matching website navigation: Engineering Library, Standards & Compliance, Glossary, Tools & Templates';
