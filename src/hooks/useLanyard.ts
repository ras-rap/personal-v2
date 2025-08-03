import { useState, useEffect, useRef } from "react";

export interface DiscordUser {
  username: string;
  public_flags: number;
  id: string;
  discriminator: string;
  avatar: string;
  global_name?: string;
  bot?: boolean;
}

export interface Activity {
  type: number;
  timestamps?: {
    start: number;
    end?: number;
  };
  sync_id?: string;
  state: string;
  session_id?: string;
  party?: {
    id: string;
  };
  name: string;
  id: string;
  flags?: number;
  details?: string;
  created_at: number;
  assets?: {
    small_text: string;
    small_image: string;
    large_text: string;
    large_image: string;
  };
  application_id?: string;
}

export interface Spotify {
  track_id: string;
  timestamps: {
    start: number;
    end: number;
  };
  song: string;
  artist: string;
  album_art_url: string;
  album: string;
}

export interface LanyardData {
  spotify: Spotify | null;
  listening_to_spotify: boolean;
  discord_user: DiscordUser;
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: Activity[];
  active_on_discord_web: boolean;
  active_on_discord_mobile: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_embedded: boolean;
}

const useLanyardPolling = (userId: string) => {
  const [data, setData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchLanyardData = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        console.error("Failed to fetch Lanyard data:", err);
        setError("Failed to load Discord data");
      } finally {
        setLoading(false);
      }
    };

    // Fetch immediately on mount
    fetchLanyardData();

    // Set up polling every 10 seconds
    intervalRef.current = setInterval(fetchLanyardData, 10000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [userId]);

  return { data, loading, error };
};

export default useLanyardPolling;