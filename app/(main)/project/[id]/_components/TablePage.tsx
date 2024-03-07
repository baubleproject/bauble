"use client"
import { columns } from '@/components/tables/TaskTables/columns'
import { DataTable } from '@/components/tables/TaskTables/data-table'
import { cn } from '@/lib/utils'
import { MemberandProfile } from '@/type/MemberandProfile'
import { TasksandAssignedTo } from '@/type/TaskandAssignedTo'
import { Task } from '@prisma/client'
import React, { HTMLAttributes } from 'react'

interface TableBoardProps extends HTMLAttributes<HTMLDivElement> {
    tasks: TasksandAssignedTo[]
    members: MemberandProfile
}

export const TablePage = ({ members, tasks, className, ...props }: TableBoardProps) => {
    return (
        <section {...props} className={cn("", className)}>
            <DataTable data={tasks} columns={columns} />
        </section>
    )
}
