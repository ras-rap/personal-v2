import { Badge } from "@/components/ui/badge";

const skills = [
  {
    category: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Shadcn"],
  },
  { category: "Backend", items: ["Bun", "Express", "Appwrite", "Sqlite"] },
  { category: "Tools", items: ["Bun", "Docker", "Pterodactyl", "Maven"] },
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "Java", "C#"],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">My Skills</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-secondary-background p-6 rounded-lg border border-border"
          >
            <h3 className="text-xl font-bold mb-4">{skill.category}</h3>
            <div className="flex flex-wrap gap-2">
              {skill.items.map((item, itemIndex) => (
                <Badge
                  key={itemIndex}
                  variant="secondary"
                  className="bg-main/10 text-main hover:bg-main/20 relative overflow-hidden"
                >
                  <span className="relative z-10">{item}</span>
                  {/* Shine sweep on hover */}
                  <span
                    className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent
                    transform -skew-x-12 translate-x-[-150%] hover:translate-x-[350%] transition-transform duration-700 ease-out"
                    aria-hidden
                  />
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;