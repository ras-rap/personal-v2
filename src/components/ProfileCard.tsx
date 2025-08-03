import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import type { LanyardData } from "@/hooks/useLanyard";

interface ProfileCardProps {
  lanyardData: LanyardData | null;
  loading: boolean;
}

const ProfileCard = ({ lanyardData, loading }: ProfileCardProps) => {
  const statusColors = {
    online: "bg-green-500",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
    offline: "bg-gray-500",
  };

  const status = lanyardData?.discord_status || "offline";
  const statusColor = statusColors[status] || "bg-gray-500";

  return (
    <section className="py-12 flex flex-col md:flex-row items-center gap-8">
      <div className="relative">
        {loading ? (
          <Skeleton className="w-48 h-48 rounded-full" />
        ) : lanyardData?.discord_user ? (
          <>
            <div
              className="will-change-transform transition-transform duration-300"
              onMouseMove={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                const rect = el.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                el.style.transform = `translateY(${y * 6}px) translateX(${
                  x * 6
                }px) rotateX(${-y * 4}deg) rotateY(${x * 6}deg)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateX(0) translateY(0) rotateX(0) rotateY(0)";
              }}
            >
              <Avatar className="w-48 h-48 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                {lanyardData.discord_user.avatar ? (
                  <AvatarImage
                    src={`https://cdn.discordapp.com/avatars/${lanyardData.discord_user.id}/${lanyardData.discord_user.avatar}.png?size=512`}
                    alt={lanyardData.discord_user.username || "Profile"}
                  />
                ) : (
                  <AvatarFallback className="bg-secondary-background text-foreground text-4xl">
                    {lanyardData.discord_user.username
                      ?.charAt(0)
                      .toUpperCase() || "R"}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
            <div
              className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-background ${statusColor} shadow-[0_4px_14px_rgba(0,0,0,0.15)]`}
            ></div>
          </>
        ) : (
          <Skeleton className="w-48 h-48 rounded-full" />
        )}
      </div>

      <div className="text-center md:text-left">
        <h1 className="text-4xl font-bold mb-2">
          {loading ? (
            <Skeleton className="h-10 w-64 mx-auto md:mx-0" />
          ) : (
            lanyardData?.discord_user?.username || "Ras_rap"
          )}
        </h1>
        <div className="text-xl text-main mb-4">
          {loading ? (
            <Skeleton className="h-6 w-48 mx-auto md:mx-0" />
          ) : (
            "Full Stack and miscellaneous Developer"
          )}
        </div>
        <div className="max-w-2xl">
          {loading ? (
            <>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mx-auto md:mx-0" />
            </>
          ) : (
            <p>
              I create beautiful websites and applications, along with Minecraft
              plugins and servers. Along with many other things.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;