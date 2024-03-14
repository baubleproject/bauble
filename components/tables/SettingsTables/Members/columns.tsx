"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { MemberwithProfile } from "@/actions/getProjectMembers"
import { formatDate, truncateText } from "@/lib/utils"
import { MemberandProfile } from "@/type/MemberandProfile"
import { MemberRole, Profile } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ShieldCheck } from "lucide-react"
import { useModal as ModalState } from "@/hooks/useModalStore"
import { useRouter as RouterUse } from "next/navigation";
import * as Reloader from "@/hooks/useReload";
import { Button } from "@/components/ui/button"

export const roleIconMap = {
    GUEST: null,
    ADMIN: <ShieldCheck className="h-5 w-5 text-indigo-700" />,
};

export const SettingMemberColumns: ColumnDef<MemberwithProfile>[] = [
    {
        accessorKey: "profile",
        // accessorFn: (row) => {
        //     return `${row?.profile.lastname ," ", row?.profile.firstname}`
        // },
        header: "Name",
        cell: ({ row }) => {
            const amount: Profile = row.getValue("profile")
            return <div className="font-medium flex items-center justify-start gap-2">
                <div className="cursor-pointer rounded-full w-6 h-6 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${amount?.imageUrl})` }} />
                {truncateText(`${amount.firstname + " " + amount.lastname}`, 30)}
            </div>
        },
    },

    {
        accessorKey: "email",
        accessorFn: (row) => {
            return row?.profile.email
        },
        header: "Email Address",
        cell: ({ row }) => {
            const amount = row.original?.profile
            return <div className="font-medium">{amount?.email}</div>
        },
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const amount: MemberRole = row.getValue("role")
            return <div className="font-medium bg-green-200 dark:bg-green-900 rounded-md w-fit p-2 flex gap-1 items-center">
                {roleIconMap[(amount as MemberRole)]}
                {amount.toLowerCase()}
            </div>
            return <div className="font-medium bg-green-200 dark:bg-green-900 rounded-md w-fit p-2">
                {roleIconMap[(amount as MemberRole)]}
                {amount}
            </div>
        },

    },
    {
        accessorKey: "createdAt",
        header: "Joined",
        cell: ({ row }) => {
            const dateJoined: Date = row.getValue("createdAt")
            return <p>{formatDate(dateJoined)}</p>
        }
    },
    {
        /* eslint-disable */
        id: "actions",
        cell: ({ row }) => {
            const task = row.original
            //@eslint-disable-next-line
            const { onOpen } = ModalState()
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4 font-semibold md:h-6 md:w-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => onOpen("memberStatus", { memberId: task?.id })}
                        >Update Member Role</DropdownMenuItem>
                        <DropdownMenuItem>...</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu >
            )
        },
    },

]

