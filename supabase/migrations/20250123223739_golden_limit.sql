/*
  # Update function search paths

  1. Changes
    - Drop triggers before functions
    - Recreate functions with explicit search paths
    - Add SECURITY DEFINER and search_path settings
  
  2. Security
    - Functions run with definer's permissions
    - Explicit search path prevents search path injection
*/

-- First drop the triggers that depend on the functions
DROP TRIGGER IF EXISTS update_player_last_active ON game_players;
DROP TRIGGER IF EXISTS update_game_timestamp ON game_sessions;

-- Now we can safely drop the functions
DROP FUNCTION IF EXISTS update_last_active();
DROP FUNCTION IF EXISTS update_game_updated_at();

-- Recreate functions with proper security settings
CREATE OR REPLACE FUNCTION public.update_last_active()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_active = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql 
   SECURITY DEFINER 
   SET search_path = public;

CREATE OR REPLACE FUNCTION public.update_game_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql 
   SECURITY DEFINER 
   SET search_path = public;

-- Recreate the triggers
CREATE TRIGGER update_player_last_active
  BEFORE UPDATE ON game_players
  FOR EACH ROW
  EXECUTE FUNCTION update_last_active();

CREATE TRIGGER update_game_timestamp
  BEFORE UPDATE ON game_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_game_updated_at();