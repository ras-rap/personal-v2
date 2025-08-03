import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ProjectModal from "@/components/ProjectModal";
import useScrollTilt from "@/hooks/useScrollTilt";
import addRipple from "@/components/useRipple";

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  demo?: string;
  longDescription: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Kraken Hosting",
    description:
      "A hosting company for Minecraft and other stuff using the best hardware",
    technologies: ["React", "PHP", "Pterodactyl", "Stripe"],
    image: "/yOPSc1J.png",
    demo: "https://krakenhosting.net",
    longDescription:
      "Kraken Hosting is a hosting company that provides high-performance servers for Minecraft and other applications. We use the latest hardware and technologies to ensure fast and reliable service. Our platform allows users to easily manage their servers, install plugins, and customize their gaming experience.",
  },
  {
    id: 2,
    title: "OpenPlace",
    description: "An open source version of R/Place from Reddit",
    technologies: ["TypeScript", "React", "SQLite", "Tailwind CSS"],
    image: "/op.png",
    demo: "https://openplace.ras-rap.click",
    github: "https://github.com/ras-rap/openplace",
    longDescription:
      "OpenPlace is an open-source recreation of Reddit's R/Place, allowing users to collaboratively create pixel art on a shared canvas. The project uses TypeScript and React for the frontend, with SQLite for data storage. It features real-time updates, user authentication, and a simple yet effective UI for placing pixels.",
  },
  {
    id: 3,
    title: "DM-Screen",
    description: "A website for Dungeons & Dragons Dungeon Masters",
    technologies: ["React", "Next.js", "Tailwind CSS", "Shadcn"],
    image: "/dms.png",
    github: "https://github.com/ras-rap/dm-screen",
    longDescription:
      "DM-Screen is a web application designed to assist Dungeon Masters in managing their Dungeons & Dragons games. It provides tools for tracking player stats, managing encounters, and organizing campaign notes. The responsive design ensures a seamless experience on both desktop and mobile devices. It is no longer online, but the code is available on GitHub.",
  },
];

type ImgMeta = {
  naturalW: number;
  naturalH: number;
  error: boolean;
};

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [imgMeta, setImgMeta] = useState<Record<number, ImgMeta>>({});

  const MIN_ASPECT = 0.8;
  const MAX_ASPECT = 8.0;
  const USE_BLURRED_BACKDROP = true;

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleImageError = (projectId: number) => {
    setImgMeta((prev) => ({
      ...prev,
      [projectId]: { naturalW: 0, naturalH: 0, error: true },
    }));
  };

  const handleImageLoad = (projectId: number, img: HTMLImageElement) => {
    setImgMeta((prev) => ({
      ...prev,
      [projectId]: {
        naturalW: img.naturalWidth || 0,
        naturalH: img.naturalHeight || 0,
        error: false,
      },
    }));
  };

  const getFitMode = (projectId: number) => {
    const meta = imgMeta[projectId];
    if (!meta || meta.error || meta.naturalW === 0 || meta.naturalH === 0) {
      return "contain" as const;
    }
    const aspect = meta.naturalW / meta.naturalH;
    if (aspect < MIN_ASPECT || aspect > MAX_ASPECT) {
      return "cover" as const;
    }
    return "contain" as const;
  };

  return (
    <section id="projects" className="py-16">
      <h2 className="mb-8 text-center text-3xl font-bold">My Projects</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const meta = imgMeta[project.id];
          const showFallback = !project.image || meta?.error === true;
          const fitMode = getFitMode(project.id);
          const isContain = fitMode === "contain";

          // Scroll tilt ref per card
          const tiltRef = useScrollTilt(4);

          return (
            <div key={project.id} ref={tiltRef}>
              <Card
                className="group flex cursor-pointer flex-col border-border transition-all hover:shadow-xl ring-0 hover:ring-2 hover:ring-main/30 will-change-transform"
                onClick={() => openProjectModal(project)}
              >
                <div className="w-full overflow-hidden rounded-t-lg bg-secondary-background relative noise">
                  <div className="relative aspect-[16/9] w-full">
                    <div className="absolute inset-0 overflow-hidden">
                      {USE_BLURRED_BACKDROP && !showFallback && isContain && (
                        <div className="absolute inset-0">
                          <img
                            src={project.image}
                            alt=""
                            aria-hidden
                            className="h-full w-full scale-110 object-cover opacity-30 blur-lg"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      )}

                      <div className="relative flex h-full w-full items-center justify-center overflow-hidden group">
                        {!showFallback ? (
                          <>
                            <img
                              src={project.image}
                              alt={project.title}
                              className={
                                isContain
                                  ? "max-h-full max-w-full object-contain"
                                  : "h-full w-full object-cover"
                              }
                              width={1600}
                              height={900}
                              onError={() => handleImageError(project.id)}
                              onLoad={(e) =>
                                handleImageLoad(
                                  project.id,
                                  e.currentTarget as HTMLImageElement
                                )
                              }
                              loading="lazy"
                              decoding="async"
                            />
                            {/* Shine sweep */}
                            <span
                              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent
                              transform -skew-x-12 translate-x-[-150%] group-hover:translate-x-[350%] transition-transform duration-700 ease-out"
                              aria-hidden
                            />
                          </>
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <div className="h-16 w-16 rounded-xl border-2 border-dashed bg-gray-200" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="rounded bg-main/10 px-2 py-1 text-xs text-main"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="btn-ripple transition-transform hover:-translate-y-0.5 active:translate-y-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      addRipple(e);
                      openProjectModal(project);
                    }}
                  >
                    View Details
                  </Button>
                  {project.github && (
                    <Button
                      variant="link"
                      size="sm"
                      className="text-main hover:text-main-foreground"
                      asChild
                    >
                      <a
                        href={project.github}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          );
        })}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-[72rem] max-w-[90vw] max-h-[90vh] overflow-y-auto">
          {selectedProject && <ProjectModal project={selectedProject} />}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;