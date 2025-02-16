/*
  # Simplify policies to prevent recursion
  
  1. Changes
    - Drop all existing policies
    - Create single, simple policy per table
    - Remove all complex conditions causing recursion
*/

-- First disable RLS
ALTER TABLE game_sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE game_players DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "basic_game_sessions_policy" ON game_sessions;
DROP POLICY IF EXISTS "basic_game_players_policy" ON game_players;
DROP POLICY IF EXISTS "allow_read_game_sessions" ON game_sessions;
DROP POLICY IF EXISTS "allow_insert_game_sessions" ON game_sessions;
DROP POLICY IF EXISTS "allow_update_game_sessions" ON game_sessions;
DROP POLICY IF EXISTS "allow_read_game_players" ON game_players;
DROP POLICY IF EXISTS "allow_insert_game_players" ON game_players;
DROP POLICY IF EXISTS "allow_update_game_players" ON game_players;

-- Create single, simple policy per table
CREATE POLICY "simple_game_sessions_policy"
  ON game_sessions
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "simple_game_players_policy"
  ON game_players
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Re-enable RLS with simple policies
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_players ENABLE ROW LEVEL SECURITY;