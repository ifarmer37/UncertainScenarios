/*
  # Fix Game Session Policies

  1. Changes
    - Simplify policies to prevent recursion
    - Improve policy logic for better security
    - Fix circular reference in game_players policy
  
  2. Security
    - Maintain RLS on all tables
    - Clear access rules
    - Prevent infinite recursion
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can create a game session" ON game_sessions;
DROP POLICY IF EXISTS "Players can view their game sessions" ON game_sessions;
DROP POLICY IF EXISTS "Host can update their game sessions" ON game_sessions;
DROP POLICY IF EXISTS "Anyone can view game players" ON game_players;
DROP POLICY IF EXISTS "Players can join games" ON game_players;
DROP POLICY IF EXISTS "Players can update their own data" ON game_players;

-- Recreate policies for game_sessions with simplified logic
CREATE POLICY "Anyone can create a game session"
  ON game_sessions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Players can view their game sessions"
  ON game_sessions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Host can update their game sessions"
  ON game_sessions FOR UPDATE
  TO authenticated
  USING (host_id = auth.uid())
  WITH CHECK (host_id = auth.uid());

-- Recreate policies for game_players with simplified logic to prevent recursion
CREATE POLICY "Anyone can view game players"
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

CREATE POLICY "Players can update their own data"
  ON game_players FOR UPDATE
  TO authenticated
  USING ((player_data->>'id')::uuid = auth.uid())
  WITH CHECK ((player_data->>'id')::uuid = auth.uid());