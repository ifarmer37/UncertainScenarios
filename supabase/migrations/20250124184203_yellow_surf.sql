/*
  # Simplify RLS policies to prevent recursion

  1. Changes
    - Drop and recreate policies if they don't exist
    - Simplify policy conditions to prevent recursion
    - Add performance index for player lookups

  2. Security
    - Maintain basic RLS protection
    - Allow authenticated access with simple conditions
    - Prevent circular policy dependencies
*/

DO $$ 
BEGIN
    -- Drop policies if they exist
    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'allow_read_game_sessions') THEN
        DROP POLICY "allow_read_game_sessions" ON game_sessions;
    END IF;

    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'allow_insert_game_sessions') THEN
        DROP POLICY "allow_insert_game_sessions" ON game_sessions;
    END IF;

    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'allow_update_game_sessions') THEN
        DROP POLICY "allow_update_game_sessions" ON game_sessions;
    END IF;

    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'allow_read_game_players') THEN
        DROP POLICY "allow_read_game_players" ON game_players;
    END IF;

    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'allow_insert_game_players') THEN
        DROP POLICY "allow_insert_game_players" ON game_players;
    END IF;

    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'allow_update_game_players') THEN
        DROP POLICY "allow_update_game_players" ON game_players;
    END IF;
END $$;

-- Create simple policies for game_sessions
CREATE POLICY "allow_read_game_sessions"
  ON game_sessions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "allow_insert_game_sessions"
  ON game_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "allow_update_game_sessions"
  ON game_sessions
  FOR UPDATE
  TO authenticated
  USING (host_id = auth.uid());

-- Create simple policies for game_players
CREATE POLICY "allow_read_game_players"
  ON game_players
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "allow_insert_game_players"
  ON game_players
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "allow_update_game_players"
  ON game_players
  FOR UPDATE
  TO authenticated
  USING ((player_data->>'id')::text = auth.uid()::text);

-- Add index for better query performance if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_game_players_player_id 
ON game_players((player_data->>'id'));