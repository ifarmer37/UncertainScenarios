/*
  # Fix RLS Policies for Unauthenticated Access

  1. Changes
    - Allow unauthenticated access to game sessions and players
    - Simplify policies to work with anonymous users
    - Keep basic security while allowing game functionality

  2. Security Notes
    - This is a temporary solution for development
    - In production, we should implement proper authentication
*/

-- First disable RLS
ALTER TABLE game_sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE game_players DISABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "allow_all_game_sessions" ON game_sessions;
DROP POLICY IF EXISTS "allow_all_game_players" ON game_players;

-- Create new policies that allow public access
CREATE POLICY "allow_public_game_sessions"
  ON game_sessions
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "allow_public_game_players"
  ON game_players
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Re-enable RLS
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_players ENABLE ROW LEVEL SECURITY;