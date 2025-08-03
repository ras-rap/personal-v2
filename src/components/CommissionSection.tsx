import { Button } from "@/components/ui/button";
import addRipple from "@/components/useRipple";

const CommissionSection = () => {
  return (
    <section className="py-16 text-center">
      <div className="bg-gradient-to-r from-main to-main/80 rounded-lg p-8 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Available for Commissions</h2>
        <p className="mb-6 text-main-foreground/90">
          I'm currently accepting new projects! Whether you need a website,
          Discord bot, Minecraft plugin or event, or anything else, I can help
          bring your ideas to life.
        </p>
        <Button
          size="lg"
          className="btn-ripple bg-main-foreground text-main hover:bg-main-foreground/90 transition-transform hover:-translate-y-0.5 active:translate-y-0"
          onClick={(e) => {
            addRipple(e as any);
            window.location.href =
              "https://discord.com/users/867970591267881000";
          }}
        >
          Get in Touch
        </Button>
      </div>
    </section>
  );
};

export default CommissionSection;