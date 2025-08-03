import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { LanyardData } from "@/hooks/useLanyard";
import { FaSpotify, FaGamepad } from "react-icons/fa";
import { useState, useEffect } from "react";
import addRipple from "@/components/useRipple";

interface DiscordActivityProps {
  lanyardData: LanyardData | null;
  loading: boolean;
}

const DiscordActivity = ({ lanyardData, loading }: DiscordActivityProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDM = () => {
    window.open(`https://discord.com/users/867970591267881000`, "_blank");
  };

  useEffect(() => {
    if (lanyardData?.discord_user) {
      const { id, avatar } = lanyardData.discord_user;
      if (avatar) {
        setAvatarUrl(
          `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=256`
        );
      } else {
        const discriminator =
          parseInt(lanyardData.discord_user.discriminator) || 0;
        const defaultAvatar = discriminator % 5;
        setAvatarUrl(
          `https://cdn.discordapp.com/embed/avatars/${defaultAvatar}.png`
        );
      }
      setImageError(false);
    }
  }, [lanyardData]);

  useEffect(() => {
    if (!lanyardData?.listening_to_spotify || !lanyardData.spotify) return;
    const { timestamps } = lanyardData.spotify;
    if (!timestamps?.start || !timestamps?.end) return;

    const updateProgress = () => {
      const now = Date.now();
      const start = timestamps.start;
      const end = timestamps.end;
      const total = end - start;
      const current = now - start;
      const percentage = Math.min(100, Math.max(0, (current / total) * 100));
      setProgress(percentage);
    };

    updateProgress();
    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval);
  }, [lanyardData]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const renderActivity = (activity: LanyardData["activities"][0]) => {
    if (activity.type === 2) {
      const { timestamps, artist, song } = lanyardData?.spotify || {};
      const startTime = timestamps?.start || 0;
      const endTime = timestamps?.end || 0;
      const duration = endTime - startTime;
      const elapsed = Date.now() - startTime;

      return (
        <div key={activity.id} className="space-y-2">
          <div className="flex items-center gap-2">
            <FaSpotify className="text-green-500 flex-shrink-0 text-xl" />
            <div>
              <p className="font-bold">Listening to Spotify</p>
              <p className="truncate max-w-xs">
                {song} - {artist}
              </p>
            </div>
          </div>

          <div className="w-full">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(elapsed)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div
                className="bg-green-500 h-1.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      );
    } else if (activity.type === 0) {
      return (
        <div key={activity.id} className="flex items-center gap-2">
          <FaGamepad className="text-blue-500 flex-shrink-0" />
          <div>
            <p className="font-bold">{activity.name}</p>
            <p className="truncate max-w-xs">
              {activity.details || "No details"} - {activity.state || "No state"}
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div key={activity.id} className="flex items-center gap-2">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-5 h-5 flex-shrink-0" />
          <div>
            <p className="font-bold">{activity.name}</p>
            <p className="truncate max-w-xs">
              {activity.details || "No details"} - {activity.state || "No state"}
            </p>
          </div>
        </div>
      );
    }
  };

  const getCurrentActivityImage = () => {
    if (!lanyardData) return null;

    if (lanyardData.listening_to_spotify && lanyardData.spotify?.album_art_url) {
      return lanyardData.spotify.album_art_url;
    }

    const gameActivity = lanyardData.activities?.find(
      (a) => a.type === 0 && a.assets?.large_image
    );

    if (gameActivity?.assets?.large_image) {
      const { application_id, assets } = gameActivity;
      if (assets.large_image.startsWith("mp:")) {
        return `https://media.discordapp.net/${assets.large_image.replace(
          "mp:",
          ""
        )}`;
      }
      return `https://cdn.discordapp.com/app-assets/${application_id}/${assets.large_image}.png?size=256`;
    }

    return null;
  };

  const activityImage = getCurrentActivityImage();

  return (
    <section className="py-16" id="activity">
      <h2 className="text-3xl font-bold mb-8 text-center">What I'm Doing</h2>

      <div className="bg-secondary-background rounded-lg border border-border p-6 max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            {loading ? (
              <Skeleton className="w-24 h-24 rounded-lg" />
            ) : (
              <div className="relative">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 overflow-hidden flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                  {activityImage && !imageError ? (
                    <img
                      src={activityImage}
                      alt="Activity"
                      className="w-full h-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Discord Avatar"
                      className="w-full h-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="bg-gray-300 w-full h-full" />
                  )}
                </div>
                {!loading && lanyardData && (
                  <div
                    className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-secondary-background ${
                      lanyardData.discord_status === "online"
                        ? "bg-green-500"
                        : lanyardData.discord_status === "idle"
                        ? "bg-yellow-500"
                        : lanyardData.discord_status === "dnd"
                        ? "bg-red-500"
                        : "bg-gray-500"
                    } shadow-[0_4px_14px_rgba(0,0,0,0.15)]`}
                  />
                )}
              </div>
            )}
          </div>

          <div className="flex-grow text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">
              {loading ? (
                <Skeleton className="h-6 w-48 mx-auto md:mx-0" />
              ) : (
                lanyardData?.discord_user?.global_name ||
                lanyardData?.discord_user?.username ||
                "Unknown User"
              )}
            </h3>

            {loading ? (
              <>
                <Skeleton className="h-4 w-32 mx-auto md:mx-0 mb-1" />
                <Skeleton className="h-4 w-48 mx-auto md:mx-0" />
              </>
            ) : lanyardData?.activities && lanyardData.activities.length > 0 ? (
              <div className="space-y-4">
                {lanyardData.activities.map((activity) =>
                  renderActivity(activity)
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">
                {lanyardData?.discord_status === "offline"
                  ? "I'm currently offline"
                  : "I'm not doing anything right now"}
              </p>
            )}

            <div className="mt-4">
              <Button
                onClick={(e) => {
                  addRipple(e as any);
                  handleDM();
                }}
                className="btn-ripple bg-main text-main-foreground hover:bg-main/90 transition-transform hover:-translate-y-0.5 active:translate-y-0"
                disabled={loading}
              >
                Message Me on Discord
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscordActivity;