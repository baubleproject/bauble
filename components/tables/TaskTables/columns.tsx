"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Member, MemberRole, Priority, Task, TaskStatus } from "@prisma/client"
import { formatDate } from "@/lib/utils"
import { Hash } from "lucide-react";
import { TasksandAssignedTo } from "@/type/TaskandAssignedTo";

import {
    ShieldAlert,
    ShieldCheck,
} from 'lucide-react';
import { MemberandProfile } from "@/type/MemberandProfile";
import { useModal } from "@/hooks/useModalStore"

const roleIconMap = {
    GUEST: null,
    ADMIN: <ShieldCheck className="h-5 w-5 ml-2 text-indigo-700" />,
};

export const priorityMap = {
    [Priority.URGENT]: {
        color: "bg-red-900",
        icon: <Hash className=" h-3 w-3" />,
    },
    [Priority.LOW]: {
        color: "bg-blue-900",
        icon: <Hash className=" h-3 w-3" />,
    },

    [Priority.HIGH]: {
        color: "bg-red-900",
        icon: <Hash className=" h-3 w-3" />,
    },

    [Priority.MEDIUM]: {
        color: "bg-yellow-900",
        icon: <Hash className=" h-3 w-3" />,
    },
};


export const statusMap = {
    [TaskStatus.OPEN]: {
        color: "bg-blue-900",
        icon: <Hash className=" h-3 w-3" />,
    },
    [TaskStatus.CANCELED]: {
        color: "bg-red-900",
        icon: <Hash className=" h-3 w-3" />,
    },

    [TaskStatus.COMPLETED]: {
        color: "bg-green-900",
        icon: <Hash className=" h-3 w-3" />,
    },

    [TaskStatus.IN_PROGRESS]: {
        color: "bg-yellow-900",
        icon: <Hash className=" h-3 w-3" />,
    },
};

export const columns: ColumnDef<TasksandAssignedTo>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const name: string = row.getValue("name")
            return <div className="font-semibold">{name}</div>
        }

    },
    {
        accessorKey: "assignedTo",
        header: "Assigned to",
        cell: ({ row }) => {
            const person = row.getValue("assignedTo");
            let formatted: string | MemberandProfile;

            if (person !== null) {
                formatted = person as MemberandProfile;
                const role = (formatted as any).role

                formatted = (formatted as any).profile?.firstname! + " " + (formatted as any).profile?.lastname!
                return <div className="w-fit flex">
                    <p>
                        {formatted as string}
                    </p>
                    {roleIconMap[(role as MemberRole)]}
                </div>;
            } else {
                formatted = "Not assigned to anyone";
                return <div className="font-semibold bg-green-200 dark:bg-green-900 rounded-md w-fit p-2">{formatted.toLowerCase()}</div>;
            }

        }
    },

    {
        accessorKey: "priority",
        header: "Task Priority",
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
    {
        accessorKey: "status",
        header: "Task Status",
        cell: ({ row }) => {
            const status = row.getValue("status")
            return (
                <div className={`py-1 px-3 rounded-lg ${statusMap[status as TaskStatus].color} w-fit text-white font-semibold flex items-center justify-center gap-1`}>
                    <p>
                        {String(status).toLowerCase()}
                    </p>
                    {statusMap[status as TaskStatus].icon}
                </div>
            )
        }
    },

    {
        id: "actions",
        cell: ({ row }) => {
            const task = row.original
            //@eslint-disable-next-line
            const { onOpen } = useModal()
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4 font-semibold md:h-6 md:w-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(task.id)}
                        >
                            Copy task ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => onOpen("taskDetails", { taskId: task.id })}
                        >View task details</DropdownMenuItem>
                        <DropdownMenuItem>...</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

