const AboutSection = () => {
  return (
    <section id="about" className="py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-secondary-background p-6 rounded-lg border border-border">
          <h3 className="text-xl font-bold mb-4">Who I Am</h3>
          <p className="mb-4">
            I'm a developer who loves creating anything and everything. From web
            applications to Minecraft plugins, I enjoy building projects that
            challenge my skills and creativity.
          </p>
          <p></p>
          <p>
            If I'm not coding or working on a project, you can find me playing
            games, sewing, or just living life. I believe in continuous learning
            and always strive to improve my skills.
          </p>
        </div>
        <div className="bg-secondary-background p-6 rounded-lg border border-border">
          <h3 className="text-xl font-bold mb-4">What I Do</h3>
          <p className="mb-4">
            I create many different types of projects, including websites,
            discord bots, and Minecraft plugins or servers. My goal is to create
            beautiful and functional experiences that users will love.
          </p>
          <p>Some of my skills include:</p>
          <ul className="list-disc list-inside">
            <li>Web Development (React, Next.js, Vite, Tailwind CSS)</li>
            <li>Backend Development (Bun, Python)</li>
            <li>
              Game Modding (Minecraft plugins and servers, Unity mods)
            </li>
            <li>Discord Bot Development (Typescript, Python)</li>
            <li>General Software Development (Java, C#, Python)</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;