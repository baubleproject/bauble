
import React, { HTMLAttributes, useMemo, useEffect, useState } from 'react'
import KanbanTaskCard, { TaskType } from '../Cards/KanbanTaskCard'
import { Separator } from '../ui/separator'
import useKanbanStore from '@/store/KanbanState';
import axios from "axios";
import { TaskStatus } from '@prisma/client';

interface KanbanColumns extends HTMLAttributes<HTMLDivElement> {
    status: string
}
export default function KanbanColumns({ status, ...props }: KanbanColumns) {

    const { draggedTask, tasks, setTasks } = useKanbanStore();
    const [filteredTasks, setFilteredTasks] = useState<typeof tasks>([])

    const handleTaskDrop = async (taskId: string, newStatus: string) => {
        console.log("HIT THE SECOND HANDLE DROP FUNCTION")
        const notUpdatedTasks = tasks
        //const updatedTask = { ...task, status: newStatus };

        //INFO: Update local state
        const updatedTasks = tasks.map(t => {
            if (t && taskId && t.id === taskId) {
                return { ...t, status: newStatus as TaskStatus };
            } else {
                return t;
            }
        });
        setTasks(updatedTasks);

        try {
            await axios.put(`/api/tasks/${taskId}/edit`, { status: newStatus });
        } catch (error) {
            setTasks(notUpdatedTasks)
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (draggedTask) {
            console.log("HIT THE HANDLE DROP FUNCTION")
            handleTaskDrop(draggedTask, status);
        }
    };


    useMemo(() => {
        const ts = tasks.filter(task => task?.status.toLowerCase() === status.toLowerCase());
        setFilteredTasks(ts)
    }, [tasks, status])

    return (
        <div className='w-fit md:min-w-72 px-2 h-fit bg-zinc-50 border rounded-lg' onDragEnter={(e) => e.preventDefault()} onDrop={handleDrop} onDragOver={(event) => { event.preventDefault(); }
        }>
            <div className='mb-2 p-3'>
                <p className='text-md font-semibold'>{status.toLowerCase()}</p>
            </div>
            <Separator className='font-semibold text-red-300 text-lg' />
            <div className='w-full flex flex-col p-3' >
                {
                    filteredTasks?.map(task => (
                        <KanbanTaskCard key={task?.id} task={task} />
                    ))
                }
            </div>
        </div>
    )
}
