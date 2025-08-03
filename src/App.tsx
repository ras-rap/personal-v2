import { useEffect } from "react";
import useLanyardPolling from "./hooks/useLanyard";
import Header from "./components/Header";
import ProfileCard from "./components/ProfileCard";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import DiscordActivity from "./components/DiscordActivity";
import SkillsSection from "./components/SkillsSection";
import CommissionSection from "./components/CommissionSection";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import Starfield from "./components/Starfield";

const DISCORD_ID = "867970591267881000";

function App() {
  const { data, loading, error } = useLanyardPolling(DISCORD_ID);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Cursor glow
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, []);

  // Scroll progress bar updater
  useEffect(() => {
    const onScroll = () => {
      const h =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      const p = (window.scrollY / h) * 100;
      document.documentElement.style.setProperty("--scroll", `${p}`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground dark cursor-glow ambient-gradient relative z-[1]">
      {/* Scroll progress bar */}
      <div className="scroll-progress fixed top-0 left-0 h-[3px] w-[calc(var(--scroll,0)*1%)] bg-gradient-to-r from-main to-[var(--chart-2)] z-50"></div>

      {/* Background starfield */}
      <Starfield density={140} speed={0.06} />

      <Header />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-500 p-4 rounded mb-6">
            {error}
          </div>
        )}

        {/* Aurora background behind hero/profile */}
        <div className="aurora rounded-xl">
          <Reveal>
            <ProfileCard lanyardData={data} loading={loading} />
          </Reveal>
        </div>

        <Reveal delayMs={80}>
          <AboutSection />
        </Reveal>

        <Reveal delayMs={120}>
          <ProjectsSection />
        </Reveal>

        <Reveal delayMs={160}>
          <DiscordActivity lanyardData={data} loading={loading} />
        </Reveal>

        <Reveal delayMs={200}>
          <SkillsSection />
        </Reveal>

        <Reveal delayMs={240}>
          <CommissionSection />
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}

export default App;