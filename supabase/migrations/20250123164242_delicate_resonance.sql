/*
  # Create game sessions schema

  1. New Tables
    - `game_sessions`
      - `id` (uuid, primary key)
      - `status` (text)
      - `host_id` (uuid)
      - `code_cracker_id` (uuid)
      - `current_phase` (text)
      - `category` (jsonb)
      - `question` (jsonb)
      - `attempts` (int)
      - `successful_attempts` (int)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `game_players`
      - `id` (uuid, primary key)
      - `game_id` (uuid, foreign key)
      - `player_data` (jsonb)
      - `is_online` (boolean)
      - `last_active` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create game_sessions table
CREATE TABLE IF NOT EXISTS game_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  status text NOT NULL DEFAULT 'waiting',
  host_id uuid NOT NULL,
  code_cracker_id uuid,
  current_phase text NOT NULL DEFAULT 'setup',
  category jsonb,
  question jsonb,
  attempts integer DEFAULT 0,
  successful_attempts integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create game_players table
CREATE TABLE IF NOT EXISTS game_players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id uuid REFERENCES game_sessions(id) ON DELETE CASCADE,
  player_data jsonb NOT NULL,
  is_online boolean DEFAULT true,
  last_active timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_players ENABLE ROW LEVEL SECURITY;

-- Policies for game_sessions
CREATE POLICY "Anyone can create a game session"
  ON game_sessions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Players can view their game sessions"
  ON game_sessions FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT game_id 
      FROM game_players 
      WHERE player_data->>'id' = auth.uid()::text
    )
    OR host_id = auth.uid()
  );

CREATE POLICY "Host can update their game sessions"
  ON game_sessions FOR UPDATE
  TO authenticated
  USING (host_id = auth.uid())
  WITH CHECK (host_id = auth.uid());

-- Policies for game_players
CREATE POLICY "Players can view game players"
  ON game_players FOR SELECT
  TO authenticated
  USING (
    game_id IN (
      SELECT id 
      FROM game_sessions 
      WHERE host_id = auth.uid()
      OR id IN (
        SELECT game_id 
        FROM game_players 
        WHERE player_data->>'id' = auth.uid()::text
      )
    )
  );

CREATE POLICY "Players can join games"
  ON game_players FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Players can update their own status"
  ON game_players FOR UPDATE
  TO authenticated
  USING (player_data->>'id' = auth.uid()::text)
  WITH CHECK (player_data->>'id' = auth.uid()::text);

-- Function to update last_active timestamp
CREATE OR REPLACE FUNCTION update_last_active()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_active = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update last_active on player updates
CREATE TRIGGER update_player_last_active
  BEFORE UPDATE ON game_players
  FOR EACH ROW
  EXECUTE FUNCTION update_last_active();

-- Function to update game_sessions updated_at
CREATE OR REPLACE FUNCTION update_game_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on game updates
CREATE TRIGGER update_game_timestamp
  BEFORE UPDATE ON game_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_game_updated_at();