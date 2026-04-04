-- Create the tag_audit table for tracking scans
CREATE TABLE tag_audit (
  id SERIAL PRIMARY KEY,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  scanned_at TIMESTAMPTZ DEFAULT NOW(),
  user_info JSONB
);
