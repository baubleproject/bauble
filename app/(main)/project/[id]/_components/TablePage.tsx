"use client"
import { columns } from '@/components/tables/TaskTables/columns'
import { DataTable } from '@/components/tables/TaskTables/data-table'
import { cn } from '@/lib/utils'
import useTaskStore from '@/store/TaskState'
import React, { HTMLAttributes} from 'react'

interface TableBoardProps extends HTMLAttributes<HTMLDivElement> {}

export const TablePage = ({ className, ...props }: TableBoardProps) => {

    const {tasks} = useTaskStore()

    return (
        <section {...props} className={cn("", className)}>
            <DataTable data={tasks} columns={columns} />
        </section>
    )
}
