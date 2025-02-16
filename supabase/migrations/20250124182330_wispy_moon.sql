-- First drop existing policies
DROP POLICY IF EXISTS "enable_read_game_sessions" ON game_sessions;
DROP POLICY IF EXISTS "enable_insert_game_sessions" ON game_sessions;
DROP POLICY IF EXISTS "enable_update_unlocked_games" ON game_sessions;
DROP POLICY IF EXISTS "enable_all_game_players" ON game_players;

-- Simple, non-recursive policies for game_sessions
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
  USING (host_id = auth.uid())
  WITH CHECK (host_id = auth.uid());

-- Simple, non-recursive policies for game_players
CREATE POLICY "enable_read_game_players"
  ON game_players
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "enable_insert_game_players"
  ON game_players
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 
      FROM game_sessions 
      WHERE id = game_id 
      AND NOT is_locked
    )
  );

CREATE POLICY "enable_update_game_players"
  ON game_players
  FOR UPDATE
  TO authenticated
  USING (
    (player_data->>'id')::text = auth.uid()::text
    AND EXISTS (
      SELECT 1 
      FROM game_sessions 
      WHERE id = game_id 
      AND NOT is_locked
    )
  )
  WITH CHECK (
    (player_data->>'id')::text = auth.uid()::text
    AND EXISTS (
      SELECT 1 
      FROM game_sessions 
      WHERE id = game_id 
      AND NOT is_locked
    )
  );