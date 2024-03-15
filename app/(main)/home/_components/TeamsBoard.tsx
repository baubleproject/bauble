"use client";
import { getProjects } from "@/actions/ProjectsActions";
import { dmsans } from "@/lib/font";
import { Project, Task } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import { HTMLAttributes } from "react";
import { formatDate, truncateText } from "@/lib/utils";
import { useModal } from "@/hooks/useModalStore";
import Loader from "@/components/Loaders/Loader";
import { useRouter } from "next/navigation";
import { ArrayElementType } from "@/type/main";

interface TeamsBoardProps extends HTMLAttributes<HTMLDivElement> {}

export default function TeamsBoard({ className, ...props }: TeamsBoardProps) {
  const [projects, setProjects] =
    useState<Awaited<ReturnType<typeof getProjects>>>(null);
  const { onOpen } = useModal();

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await getProjects({ limit: 4 });
      setProjects(projects);
    };
    fetchProjects();
  }, []);

  const createProjectModalOpen = () => {
    onOpen("createProject");
  };

  if (!projects) {
    return <Loader className="dark:bg-zinc-950" loaderClassName="text-3xl" />;
  }

  return (
    <div
      className={`w-full flex flex-col h-full bg-zinc-100 dark:bg-zinc-950 ${className}`}
      {...props}
    >
      <p
        className={`border-b-[0.05px] border-zinc-300 dark:border-zinc-700 p-3 text-xl font-light -tracking-wide ${dmsans.className}`}
      >
        Projects
      </p>
      <div className="w-full h-full p-3 px-1 flex items-start justify-start gap-1.5 flex-wrap content-start">
        <div
          onClick={createProjectModalOpen}
          className="md:w-1/12 h-1/5 sm:hidden dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors duration-300 cursor-pointer flex justify-center items-center gap-2 px-2 rounded-xl border-2 border-zinc-400 dark:border-zinc-600 border-dashed"
        >
          <GrAddCircle className="font-light text-lg text-zinc-500 dark:text-zinc-300" />
        </div>

        {projects?.map((project) => (
          <ProjectsCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: Project & { tasks: Task[] };
}
function ProjectsCard({ project }: ProjectCardProps) {
  const router = useRouter();

  const onClick = () => {
    router.push(`/project/${project.id}`);
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center h-fit w-fit border border-zinc-300 dark:border-zinc-800 dark:hover:bg-zinc-800 transition-colors duration-300 px-3 py-1.5 rounded-xl gap-2 cursor-pointer ${dmsans.className} `}
    >
      <div
        style={{ backgroundImage: `url(${project?.imageUrl})` }}
        className="bg-cover bg-center border border-zinc-400 dark:border-zinc-800 h-6 w-6 rounded-full "
      ></div>
      <div className="flex-1 h-full flex flex-col items-center justify-center">
        <div className="flex flex-col gap-1 items-start justify-center">
          <p className="font-semibold text-sm -tracking-wide dark:text-white truncate">
            {truncateText(project?.name, 16)}
          </p>
          <p className="flex-1 font-light text-sm -tracking-wide dark:text-white truncate">
            {project.tasks.length} tasks
          </p>
        </div>
      </div>
    </div>
  );
}
