-- Drop all existing policies
DROP POLICY IF EXISTS "enable_create_game_sessions" ON game_sessions;
DROP POLICY IF EXISTS "enable_read_game_sessions" ON game_sessions;
DROP POLICY IF EXISTS "enable_update_game_sessions" ON game_sessions;
DROP POLICY IF EXISTS "enable_read_game_players" ON game_players;
DROP POLICY IF EXISTS "enable_create_game_players" ON game_players;
DROP POLICY IF EXISTS "enable_update_game_players" ON game_players;

-- Create extremely simple policies for game_sessions
CREATE POLICY "allow_all_game_sessions"
  ON game_sessions
  USING (true)
  WITH CHECK (true);

-- Create extremely simple policies for game_players
CREATE POLICY "allow_all_game_players"
  ON game_players
  USING (true)
  WITH CHECK (true);

-- Add indexes to improve query performance
CREATE INDEX IF NOT EXISTS idx_game_players_game_id ON game_players(game_id);
CREATE INDEX IF NOT EXISTS idx_game_sessions_host_id ON game_sessions(host_id);