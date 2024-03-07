"use client"
import { columns } from '@/components/tables/TaskTables/columns'
import { DataTable } from '@/components/tables/TaskTables/data-table'
import { cn } from '@/lib/utils'
import { MemberandProfile } from '@/type/MemberandProfile'
import { Task } from '@prisma/client'
import React, { HTMLAttributes } from 'react'

interface OverviewBoardProps extends HTMLAttributes<HTMLDivElement> {
    tasks: Task[]
    members: MemberandProfile
}

export const OverviewPage = ({ members, tasks, className, ...props }: OverviewBoardProps) => {
    return (
        <section {...props} className={cn("", className)}>
            {/*Overview page*/}
            {/*
                tasks?.map((t) => (
                    <p key={t.id}>{t.name}:{t.priority}</p>
                ))
            */}
            <p className='text-lg font-semibold -tracking-wider'>Project Roles</p>
            <div className='w-full min-h-14 flex items-start justify-start py-2 gap-3'>
                {
                    members?.map((t) => (
                        <div key={t.id} className='px-2 py-3 flex gap-2 items-center bg-zinc-300 dark:bg-zinc-800 rounded-lg'>
                            <div className="cursor-pointer rounded-full w-7 h-7 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${t.profile?.imageUrl})` }}></div>
                            <div>
                                <p className='text-sm'>{t.profile.firstname}{" "}{t.profile.lastname}</p>
                                <p className='text-xs font-light'>{t.profile.email}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}
