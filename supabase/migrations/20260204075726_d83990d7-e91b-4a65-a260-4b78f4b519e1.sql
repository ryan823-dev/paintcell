-- =====================================================
-- Create rate limiting table for AI presales chat
-- Tracks requests per IP to prevent AI resource abuse
-- =====================================================

CREATE TABLE public.rate_limit_tracking (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    identifier text NOT NULL,  -- IP address or fingerprint
    endpoint text NOT NULL,    -- Which endpoint is being rate limited
    request_count integer NOT NULL DEFAULT 1,
    window_start timestamp with time zone NOT NULL DEFAULT now(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE (identifier, endpoint)
);

-- Enable RLS
ALTER TABLE public.rate_limit_tracking ENABLE ROW LEVEL SECURITY;

-- Revoke all access from client roles - only service_role can access
REVOKE ALL ON public.rate_limit_tracking FROM anon, authenticated;

-- Create index for fast lookups
CREATE INDEX idx_rate_limit_identifier_endpoint ON public.rate_limit_tracking (identifier, endpoint);
CREATE INDEX idx_rate_limit_window_start ON public.rate_limit_tracking (window_start);

-- Add trigger for updated_at
CREATE TRIGGER update_rate_limit_tracking_updated_at
BEFORE UPDATE ON public.rate_limit_tracking
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();