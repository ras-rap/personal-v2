import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/components/ProjectsSection";
import { DialogHeader, DialogTitle } from "./ui/dialog";
import addRipple from "@/components/useRipple";

interface ProjectModalProps {
  project: Project;
}

type ImgMeta = {
  naturalW: number;
  naturalH: number;
  error: boolean;
};

const MIN_ASPECT = 0.8;
const MAX_ASPECT = 8.0;
const USE_BLURRED_BACKDROP = true;

const ProjectModal = ({ project }: ProjectModalProps) => {
  const [meta, setMeta] = useState<ImgMeta>({
    naturalW: 0,
    naturalH: 0,
    error: false,
  });

  const fitMode = useMemo(() => {
    if (
      !project.image ||
      meta.error ||
      meta.naturalW === 0 ||
      meta.naturalH === 0
    ) {
      return "contain" as const;
    }
    const aspect = meta.naturalW / meta.naturalH;
    if (aspect < MIN_ASPECT || aspect > MAX_ASPECT) return "cover" as const;
    return "contain" as const;
  }, [meta, project.image]);

  const isContain = fitMode === "contain";
  const showFallback = !project.image || meta.error;

  return (
    <div>
      <DialogHeader>
        <DialogTitle className="text-2xl">{project.title}</DialogTitle>
      </DialogHeader>

      <div className="mt-4">
        <div className="relative mb-6 overflow-hidden rounded-lg bg-secondary-background noise">
          <div className="relative aspect-[16/9] w-full">
            <div className="absolute inset-0 overflow-hidden">
              {USE_BLURRED_BACKDROP && !showFallback && isContain && (
                <div className="absolute inset-0">
                  <img
                    src={project.image}
                    alt=""
                    aria-hidden
                    className="h-full w-full scale-110 object-cover opacity-30 blur-lg"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              )}

              <div className="relative flex h-full w-full items-center justify-center group overflow-hidden">
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
                      onError={() =>
                        setMeta({ naturalW: 0, naturalH: 0, error: true })
                      }
                      onLoad={(e) => {
                        const img = e.currentTarget as HTMLImageElement;
                        setMeta({
                          naturalW: img.naturalWidth || 0,
                          naturalH: img.naturalHeight || 0,
                          error: false,
                        });
                      }}
                    />
                    <span
                      className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent
                      transform -skew-x-12 translate-x-[-150%] group-hover:translate-x-[350%] transition-transform duration-700 ease-out"
                      aria-hidden
                    />
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="h-20 w-20 rounded-xl border-2 border-dashed bg-gray-200" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="mb-6">{project.longDescription}</p>

        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="rounded-full bg-main/10 px-3 py-1 text-sm text-main"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {project.github && (
            <Button
              asChild
              variant="outline"
              className="btn-ripple transition-transform hover:-translate-y-0.5 active:translate-y-0"
              onClick={(e) => addRipple(e as any)}
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </Button>
          )}
          {project.demo && (
            <Button
              asChild
              className="btn-ripple transition-transform hover:-translate-y-0.5 active:translate-y-0"
              onClick={(e) => addRipple(e as any)}
            >
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;