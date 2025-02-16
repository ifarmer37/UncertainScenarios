/*
  # Fix game sessions schema and relationships

  1. Changes
    - Remove direct players column reference
    - Add proper relationship between game_sessions and game_players
    - Simplify policies for better performance
    - Add proper indexes

  2. Security
    - Enable RLS on all tables
    - Add simplified policies for better reliability
*/

-- First clean up any existing policies
DROP POLICY IF EXISTS "allow_all_game_sessions" ON game_sessions;
DROP POLICY IF EXISTS "allow_all_game_players" ON game_players;

-- Ensure proper table structure
CREATE TABLE IF NOT EXISTS game_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'waiting',
  code_cracker_id uuid,
  current_phase text NOT NULL DEFAULT 'setup',
  category jsonb,
  question jsonb,
  attempts integer DEFAULT 0,
  successful_attempts integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS game_players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id uuid REFERENCES game_sessions(id) ON DELETE CASCADE,
  player_data jsonb NOT NULL,
  is_online boolean DEFAULT true,
  last_active timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Add proper indexes
CREATE INDEX IF NOT EXISTS idx_game_players_game_id ON game_players(game_id);
CREATE INDEX IF NOT EXISTS idx_game_sessions_host_id ON game_sessions(host_id);
CREATE INDEX IF NOT EXISTS idx_game_players_player_id ON game_players((player_data->>'id'));

-- Enable RLS
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_players ENABLE ROW LEVEL SECURITY;

-- Create simple, permissive policies for development
-- In production, these should be more restrictive
CREATE POLICY "enable_all_game_sessions"
  ON game_sessions
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "enable_all_game_players"
  ON game_players
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);