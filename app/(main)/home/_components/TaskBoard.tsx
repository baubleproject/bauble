"use client";
import { HTMLAttributes, useEffect, useState } from "react";
import { useModal } from "@/hooks/useModalStore";
import { dmsans } from "@/lib/font";
import React from "react";
import { GrAddCircle } from "react-icons/gr";
import { getUserTasks } from "@/actions/tasks/GetUserTasks";
import Loader from "@/components/Loaders/Loader";
import { formatDate, truncateText } from "@/lib/utils";
import { priorityMap } from "@/components/tables/TaskTables/columns";
import { Priority } from "@prisma/client";

interface TaskBoardProps extends HTMLAttributes<HTMLDivElement> {}

export default function TaskBoard({ className, ...props }: TaskBoardProps) {
  const { onOpen } = useModal();
  const [tasks, setTasks] =
    useState<Awaited<ReturnType<typeof getUserTasks>>>(null);

  useEffect(() => {
    const fetch = async () => {
      const tasks = await getUserTasks();
      setTasks(tasks);
    };
    fetch();
  }, []);

  const createTaskModalOpen = () => {
    onOpen("createTask");
  };

  if (!tasks) {
    return <Loader className="dark:bg-zinc-950" loaderClassName="text-3xl" />;
  }

  return (
    <div
      className={`w-full flex flex-col h-full bg-zinc-100 dark:bg-zinc-950 dark:text-black ${className}`}
      {...props}
    >
      <div className="w-full flex items-center justify-between border-b-[0.05px] border-zinc-300 dark:border-zinc-700 p-3 ">
        <p
          className={`text-xl font-light dark:text-white -tracking-wide ${dmsans.className}`}
        >
          Tasks
        </p>
        <div className="hidden cursor-pointer" onClick={createTaskModalOpen}>
          <GrAddCircle className="font-light text-xl text-zinc-500" />
        </div>
      </div>
      {tasks.length == 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          <p className="-tracking-wider">You have no task pending</p>
        </div>
      ) : (
        <div className="w-full h-full p-2 px-1 dark:text-white flex items-center gap-2 flex-wrap justify-start content-start">
          {tasks?.map((task) => (
            <div
              key={task.id}
              className="w-fit p-1 px-2 space-y-1.5 rounded-lg cursor-pointer border-[0.1px] border-zinc-300 dark:border-zinc-800"
              onClick={() => onOpen("taskDetails", { taskId: task.id })}
            >
              <div className="flex items-center justify-start gap-3">
                <p className="text-sm font-semibold">{task.project.name}</p>
                <p className="text-sm font-extralight">
                  {formatDate(task.end)}
                </p>
              </div>
              <div className="flex items-center justify-start gap-1">
                <div
                  className={`p-1 rounded-lg ${
                    priorityMap[task.priority as Priority].color
                  } w-fit text-white font-semibold flex items-center justify-center gap-1`}
                />

                <p className="text-sm">{truncateText(task.name, 25)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
