"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Task } from "@prisma/client"
import { formatDate } from "@/lib/utils"

export const columns: ColumnDef<Task>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "status",
        header: "Task Status",
    },
    {
        accessorKey: "start",
        header: "Creation Time",
        cell: ({ row }) => {
            const time = row.getValue("start")
            const formatted = formatDate(time as Date)
            return <div className="">{formatted}</div>
        }
    },
   {
        accessorKey: "end",
        header: "Deadline",
        cell: ({ row }) => {
            const time = row.getValue("end")
            const formatted = formatDate(time as Date)
            return <div className="">{formatted}</div>
        }
    },

]

