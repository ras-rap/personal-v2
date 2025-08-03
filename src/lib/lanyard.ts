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

export const DISCORD_ID = "867970591267881000";