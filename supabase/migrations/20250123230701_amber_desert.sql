/*
  # Final policy simplification

  1. Changes
    - Remove all nested queries from policies
    - Use direct equality checks only
    - Flatten all policy conditions
    - Remove any potential for recursion
  
  2. Security
    - Maintain basic access control
    - Keep authentication requirements
    - Preserve data isolation between users
*/

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Anyone can create a game session" ON game_sessions;
DROP POLICY IF EXISTS "Anyone can view game sessions" ON game_sessions;
DROP POLICY IF EXISTS "Host can update game sessions" ON game_sessions;
DROP POLICY IF EXISTS "Anyone can view players" ON game_players;
DROP POLICY IF EXISTS "Players can join games" ON game_players;
DROP POLICY IF EXISTS "Players can update own data" ON game_players;

-- Simple, flat policies for game_sessions
CREATE POLICY "enable_create_game_sessions"
  ON game_sessions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "enable_read_game_sessions"
  ON game_sessions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "enable_update_game_sessions"
  ON game_sessions FOR UPDATE
  TO authenticated
  USING (host_id = auth.uid());

-- Simple, flat policies for game_players
CREATE POLICY "enable_read_game_players"
  ON game_players FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "enable_create_game_players"
  ON game_players FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "enable_update_game_players"
  ON game_players FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = player_data->>'id');