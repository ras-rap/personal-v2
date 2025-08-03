const Footer = () => {
  return (
    <footer className="border-t border-border py-8 mt-16">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-4">
          © {new Date().getFullYear()} Ras_rap.
        </p>
        <div className="flex justify-center space-x-6">
         <a href="https://krakenhosting.net" target="_blank" rel="noopener noreferrer" className="text-main hover:text-main-foreground transition-colors">
            <img src="/yOPSc1J.png" alt="Kraken Hosting" className="h-8" />
        </a>
          <a
            href="https://github.com/ras-rap"
            target="_blank"
            rel="noopener noreferrer"
            className="text-main hover:text-main-foreground transition-colors"
          >
            <img src="/Github.svg" alt="GitHub" className="h-8" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;