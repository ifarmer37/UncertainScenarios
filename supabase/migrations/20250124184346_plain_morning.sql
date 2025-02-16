/*
  # Simplify policies to prevent recursion
  
  1. Changes
    - Drop all existing policies
    - Create new simplified policies without recursive checks
    - Remove complex policy conditions causing recursion
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "allow_read_game_sessions" ON game_sessions;
DROP POLICY IF EXISTS "allow_insert_game_sessions" ON game_sessions;
DROP POLICY IF EXISTS "allow_update_game_sessions" ON game_sessions;
DROP POLICY IF EXISTS "allow_read_game_players" ON game_players;
DROP POLICY IF EXISTS "allow_insert_game_players" ON game_players;
DROP POLICY IF EXISTS "allow_update_game_players" ON game_players;

-- Disable RLS temporarily
ALTER TABLE game_sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE game_players DISABLE ROW LEVEL SECURITY;

-- Create basic policies
CREATE POLICY "basic_game_sessions_policy"
  ON game_sessions
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "basic_game_players_policy"
  ON game_players
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Re-enable RLS
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_players ENABLE ROW LEVEL SECURITY;