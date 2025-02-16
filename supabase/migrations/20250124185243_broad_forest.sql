-- First disable RLS
ALTER TABLE game_sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE game_players DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "simple_game_sessions_policy" ON game_sessions;
DROP POLICY IF EXISTS "simple_game_players_policy" ON game_players;

-- Create extremely simple policies without any joins or complex checks
CREATE POLICY "public_access_game_sessions"
  ON game_sessions
  AS PERMISSIVE
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "public_access_game_players"
  ON game_players
  AS PERMISSIVE
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Re-enable RLS
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_players ENABLE ROW LEVEL SECURITY;

-- Create simple indexes for performance
DROP INDEX IF EXISTS idx_game_players_game_id;
DROP INDEX IF EXISTS idx_game_sessions_host_id;
DROP INDEX IF EXISTS idx_game_players_player_id;

CREATE INDEX IF NOT EXISTS idx_game_players_game_id ON game_players(game_id);
CREATE INDEX IF NOT EXISTS idx_game_sessions_host_id ON game_sessions(host_id);
CREATE INDEX IF NOT EXISTS idx_game_players_player_id ON game_players((player_data->>'id'));