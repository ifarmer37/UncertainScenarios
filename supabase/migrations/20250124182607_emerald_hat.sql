/*
  # Fix Player Display and Recursion Issues

  1. Changes
    - Simplify policies to prevent recursion
    - Remove complex policy conditions
    - Ensure proper player display
  
  2. Security
    - Maintain basic access control
    - Allow proper player management
*/

-- First drop existing policies
DROP POLICY IF EXISTS "enable_read_game_sessions" ON game_sessions;
DROP POLICY IF EXISTS "enable_insert_game_sessions" ON game_sessions;
DROP POLICY IF EXISTS "enable_update_game_sessions" ON game_sessions;
DROP POLICY IF EXISTS "enable_read_game_players" ON game_players;
DROP POLICY IF EXISTS "enable_insert_game_players" ON game_players;
DROP POLICY IF EXISTS "enable_update_game_players" ON game_players;

-- Create extremely simple policies for game_sessions
CREATE POLICY "enable_read_game_sessions"
  ON game_sessions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "enable_insert_game_sessions"
  ON game_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "enable_update_game_sessions"
  ON game_sessions
  FOR UPDATE
  TO authenticated
  USING (host_id = auth.uid());

-- Create extremely simple policies for game_players
CREATE POLICY "enable_read_game_players"
  ON game_players
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "enable_insert_game_players"
  ON game_players
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "enable_update_game_players"
  ON game_players
  FOR UPDATE
  TO authenticated
  USING ((player_data->>'id')::text = auth.uid()::text);

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_game_players_player_id 
ON game_players((player_data->>'id'));