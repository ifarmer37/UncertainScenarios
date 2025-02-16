/*
  # Add isLocked column to game_sessions table

  1. Changes
    - Add is_locked boolean column to game_sessions table
    - Add index for better query performance
    - Update policies to handle locked games

  2. Security
    - Maintain RLS with simplified policies
    - Prevent modifications to locked games while allowing reads
*/

-- Add isLocked column
ALTER TABLE game_sessions 
ADD COLUMN is_locked boolean DEFAULT false;

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_game_sessions_is_locked 
ON game_sessions(is_locked);

-- Update policies to consider locked status
DROP POLICY IF EXISTS "enable_all_game_sessions" ON game_sessions;

-- Create separate policies for different operations
CREATE POLICY "enable_read_game_sessions"
  ON game_sessions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "enable_insert_game_sessions"
  ON game_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (NOT is_locked);

CREATE POLICY "enable_update_unlocked_games"
  ON game_sessions
  FOR UPDATE
  TO authenticated
  USING (NOT is_locked AND host_id = auth.uid())
  WITH CHECK (NOT is_locked AND host_id = auth.uid());