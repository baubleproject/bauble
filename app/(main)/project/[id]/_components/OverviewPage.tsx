"use client"
import { cn } from '@/lib/utils'
import { Task } from '@prisma/client'
import React, {HTMLAttributes} from 'react'

interface OverviewBoardProps extends HTMLAttributes<HTMLDivElement> { 
    tasks : Task[]
}

export const OverviewPage = ({tasks, className, ...props}:OverviewBoardProps) => {
    return (
        <section {...props} className={cn("", className)}>
            Overview page
            {
                tasks?.map((t) => (
                    <p key={t.id}>{t.name}:{t.priority}</p>
                ))
            }
        </section>
    )
}
