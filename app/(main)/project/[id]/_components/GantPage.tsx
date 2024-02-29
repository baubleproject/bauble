"use client"
import { cn } from '@/lib/utils'
import { Task } from '@prisma/client'
import { useEffect, useRef } from 'react'
import Gantt from 'frappe-gantt'
import React, { HTMLAttributes } from 'react'
import 'frappe-gantt/dist/frappe-gantt.css'

interface GanttBoardProps extends HTMLAttributes<HTMLDivElement> {
    tasks: Task[]
}

export const GanttPage = ({ tasks, className, ...props }: GanttBoardProps) => {
    const ganttContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mappedTasks = tasks?.map(task => ({
            id: task.id,
            name: task.name,
            start: task.start.toISOString().split('T')[0], // Convert Date object to ISO string
            end: task.end.toISOString().split('T')[0], // Convert Date object to ISO string
            progress: 50,
            dependencies: '', // If dependencies are null or undefined, set an empty string
        }));

        if (ganttContainerRef.current) {
            const gantt = new Gantt(ganttContainerRef.current, mappedTasks ? mappedTasks : [], {
                view_mode: "Week",
                date_format: "MM/DD/YYYY",
            });

            return () => {
                gantt
            };
        }
    }, [tasks]);

    return (
        <section {...props} className={cn(" overflow-x-auto", className)}>
            <div className='max-w-full' ref={ganttContainerRef} />
        </section>
    );
}



