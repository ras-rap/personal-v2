import { Button } from "@/components/ui/button";
import NavLink from "@/components/NavLink";
import addRipple from "@/components/useRipple";

const Header = () => {
  return (
    <header className="border-b border-border py-4 sticky top-0 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ras_rap</h1>
        <nav className="hidden md:flex space-x-6 group">
          <NavLink href="#about">About</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#skills">Skills</NavLink>
        </nav>
        <Button
          variant="outline"
          className="btn-ripple border-main text-main hover:bg-main hover:text-main-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0"
          onClick={(e) => {
            addRipple(e as any);
            window.location.href =
              "https://discord.com/users/867970591267881000";
          }}
        >
          Contact Me
        </Button>
      </div>
    </header>
  );
};

export default Header;