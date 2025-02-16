import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { GameSession, Player } from "../types";

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

// Create Supabase client with retries and error handling
const createSupabaseClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  });
};

let supabase = createSupabaseClient();

export function useGameSession(gameId?: string) {
  const [gameSession, setGameSession] = useState<GameSession | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Reset function to clear game session
  const resetGameSession = () => {
    setGameSession(null);
    setError(null);
    setIsLoading(false);
  };

  // Retry mechanism for Supabase operations
  const retryOperation = async <T>(
    operation: () => Promise<T>,
    maxRetries = 3,
    delay = 500
  ): Promise<T> => {
    let lastError;
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await operation();
      } catch (err) {
        lastError = err;
        console.warn(`Attempt ${i + 1} failed, ${i < maxRetries - 1 ? 'retrying...' : 'giving up.'}`, err);
        if (i < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
          // Recreate client on failure
          supabase = createSupabaseClient();
        }
      }
    }
    throw lastError;
  };

  // Initialize game session
  const initializeGame = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase configuration is missing');
      }

      const fetchSession = async () => {
        if (gameId) {
          // Fetch existing game session
          const { data: sessionData, error: sessionError } = await supabase
            .from("game_sessions")
            .select("*")
            .eq("id", gameId)
            .single();
          
          if (sessionError) throw sessionError;

          // Fetch players for this session
          const { data: playersData, error: playersError } = await supabase
            .from("game_players")
            .select("player_data")
            .eq("game_id", gameId);
          
          if (playersError) throw playersError;

          return {
            ...sessionData,
            players: playersData?.map(p => p.player_data as Player) || []
          };
        } else {
          // Create new game session
          const { data, error } = await supabase
            .from("game_sessions")
            .insert([{
              host_id: crypto.randomUUID(),
              status: 'waiting',
              is_locked: false
            }])
            .select()
            .single();

          if (error) throw error;
          return { ...data, players: [] };
        }
      };

      const session = await retryOperation(fetchSession);
      setGameSession(session);
    } catch (err: any) {
      console.error("Failed to initialize game:", err);
      setError(err.message || "Failed to initialize game session");
      setGameSession(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Poll for updates
  useEffect(() => {
    if (!gameId) return;

    const pollInterval = setInterval(() => {
      refreshPlayers().catch(err => {
        console.error('Failed to refresh players:', err);
      });
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(pollInterval);
  }, [gameId]);

  const addPlayer = async (player: Player) => {
    if (!gameSession?.id) {
      throw new Error("No active game session");
    }

    const addPlayerOperation = async () => {
      const cleanPlayerData = {
        ...player,
        token: {
          name: player.token.name,
          image: player.token.image,
          color: player.token.color,
          type: player.token.type || 'standard'
        }
      };

      const playerRecord = {
        game_id: gameSession.id,
        player_data: cleanPlayerData
      };

      const { data, error } = await supabase
        .from("game_players")
        .insert([playerRecord])
        .select()
        .single();

      if (error) throw error;

      await refreshPlayers();
      return data;
    };

    try {
      return await retryOperation(addPlayerOperation);
    } catch (err) {
      console.error("Failed to add player:", err);
      throw new Error('Failed to add player after multiple attempts');
    }
  };

  const refreshPlayers = async () => {
    if (!gameSession?.id) return;
    
    const refreshOperation = async () => {
      const { data, error } = await supabase
        .from("game_players")
        .select("player_data")
        .eq("game_id", gameSession.id)
        .order('created_at', { ascending: true })
        .limit(10);
        
      if (error) throw error;

      const playerMap = new Map();
      data?.forEach(d => {
        const player = d.player_data as Player;
        playerMap.set(player.id, player);
      });

      const uniquePlayers = Array.from(playerMap.values());
      setGameSession(prev => prev ? { ...prev, players: uniquePlayers } : null);
      return uniquePlayers;
    };

    try {
      return await retryOperation(refreshOperation);
    } catch (err) {
      console.error("Failed to refresh players:", err);
      throw new Error('Failed to refresh players after multiple attempts');
    }
  };

  const lockGame = async () => {
    if (!gameSession?.id) return;
    
    const lockOperation = async () => {
      const { error } = await supabase
        .from("game_sessions")
        .update({ is_locked: true })
        .eq("id", gameSession.id);
      
      if (error) throw error;

      await refreshPlayers();
      setGameSession(prev => prev ? { ...prev, is_locked: true } : null);
      return true;
    };

    try {
      return await retryOperation(lockOperation);
    } catch (err) {
      console.error("Failed to lock game:", err);
      throw new Error('Failed to lock game after multiple attempts');
    }
  };

  useEffect(() => {
    initializeGame();
  }, [gameId]);

  return {
    gameSession,
    error,
    isLoading,
    addPlayer,
    refreshPlayers,
    lockGame,
  };
}