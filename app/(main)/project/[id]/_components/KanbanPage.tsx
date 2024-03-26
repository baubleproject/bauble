import { getPlentyTasksById } from "@/actions/getTaskById";
import KanbanColumns from "@/components/sections/KanbanColumns";
import useTaskStore from "@/store/TaskState";
import { Project, TaskStatus } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TaskType as SingleTaskType } from "@/components/Cards/KanbanTaskCard";
import axios from "axios";

interface KanbanProps {
    project: Project
}
export type TaskType = Awaited<ReturnType<typeof getPlentyTasksById>>

export default function KanbanPage({ project }: KanbanProps) {

    const [loading, setLoading] = useState<boolean>(false)

    const tasks = useTaskStore(state => state.tasks);
    const setTasks = useTaskStore(state => state.setTasks);

    // status array stuff
    type StatusValuesProto = keyof typeof TaskStatus
    type StatusValues = Exclude<StatusValuesProto, "CANCELED">
    const statusArray: StatusValues[] = Object.values(TaskStatus) as StatusValues[];

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true)
                const tasks = await getPlentyTasksById({ id: project?.id })
                setTasks(tasks ? tasks : [])
            } catch (error) {
                toast.error(error as string)
            } finally {
                setLoading(false)
            }
        }

        fetchTasks()
    }, [tasks])

   
    return (
        <main className="w-full h-full flex gap-2">
            {
                statusArray.map(status => (
                    <KanbanColumns key={status} status={status} />
                ))
            }
        </main>
    )
}
