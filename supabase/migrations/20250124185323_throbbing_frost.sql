-- First, drop all existing tables and start fresh
DROP TABLE IF EXISTS game_players CASCADE;
DROP TABLE IF EXISTS game_sessions CASCADE;

-- Recreate tables with simplified structure
CREATE TABLE game_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'waiting',
  is_locked boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE game_players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id uuid REFERENCES game_sessions(id) ON DELETE CASCADE,
  player_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_game_players_game_id ON game_players(game_id);
CREATE INDEX idx_game_sessions_host_id ON game_sessions(host_id);
CREATE INDEX idx_game_players_player_id ON game_players((player_data->>'id'));

-- Enable RLS
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_players ENABLE ROW LEVEL SECURITY;

-- Create single, simple policy for each table
CREATE POLICY "allow_all_game_sessions"
  ON game_sessions
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "allow_all_game_players"
  ON game_players
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);