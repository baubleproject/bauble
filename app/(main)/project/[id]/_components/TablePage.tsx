"use client"
import { columns } from '@/components/tables/TaskTables/columns'
import { DataTable } from '@/components/tables/TaskTables/data-table'
import { cn } from '@/lib/utils'
import useTaskStore from '@/store/TaskState'
import { MemberandProfile } from '@/type/MemberandProfile'
import { TasksandAssignedTo } from '@/type/TaskandAssignedTo'
import { Task } from '@prisma/client'
import React, { HTMLAttributes, useEffect } from 'react'

interface TableBoardProps extends HTMLAttributes<HTMLDivElement> {
    members: MemberandProfile
}

export const TablePage = ({ members, className, ...props }: TableBoardProps) => {

    const {tasks} = useTaskStore()

    return (
        <section {...props} className={cn("", className)}>
            <DataTable data={tasks} columns={columns} />
        </section>
    )
}
