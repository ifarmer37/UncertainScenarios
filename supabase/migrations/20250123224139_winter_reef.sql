/*
  # Fix infinite recursion in policies

  1. Changes
    - Simplify policies to prevent recursion
    - Remove circular dependencies in game_players policies
    - Add direct user checks instead of nested queries
  
  2. Security
    - Maintain RLS security while fixing recursion
    - Ensure proper access control for players
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can create a game session" ON game_sessions;
DROP POLICY IF EXISTS "Anyone can view game sessions" ON game_sessions;
DROP POLICY IF EXISTS "Host can update their game sessions" ON game_sessions;
DROP POLICY IF EXISTS "Anyone can view game players" ON game_players;
DROP POLICY IF EXISTS "Anyone can join games" ON game_players;
DROP POLICY IF EXISTS "Players can update their own data" ON game_players;

-- Recreate policies for game_sessions with simplified logic
CREATE POLICY "Anyone can create a game session"
  ON game_sessions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view game sessions"
  ON game_sessions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Host can update game sessions"
  ON game_sessions FOR UPDATE
  TO authenticated
  USING (host_id = auth.uid())
  WITH CHECK (host_id = auth.uid());

-- Recreate policies for game_players with direct user checks
CREATE POLICY "Anyone can view players"
  ON game_players FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Players can join games"
  ON game_players FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 
      FROM game_sessions 
      WHERE id = game_id 
      AND status = 'waiting'
    )
  );

CREATE POLICY "Players can update own data"
  ON game_players FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = player_data->>'id')
  WITH CHECK (auth.uid()::text = player_data->>'id');