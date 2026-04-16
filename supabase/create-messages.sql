-- ===========================================
-- LSMX Guestbook - Messages Table
-- Run this SQL in your Supabase SQL Editor
-- ===========================================

-- Create the messages table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL CHECK (char_length(name) >= 1 AND char_length(name) <= 50),
  content TEXT NOT NULL CHECK (char_length(content) >= 1 AND char_length(content) <= 500),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read messages
CREATE POLICY "Anyone can read messages"
  ON public.messages
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Anyone can insert messages
CREATE POLICY "Anyone can insert messages"
  ON public.messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: No one can update messages
CREATE POLICY "No one can update messages"
  ON public.messages
  FOR UPDATE
  USING (false);

-- Policy: No one can delete messages
CREATE POLICY "No one can delete messages"
  ON public.messages
  FOR DELETE
  USING (false);

-- Create index for faster ordering
CREATE INDEX IF NOT EXISTS messages_created_at_idx
  ON public.messages (created_at DESC);
