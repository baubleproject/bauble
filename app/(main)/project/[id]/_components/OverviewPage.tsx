"use client"
import { cn } from '@/lib/utils'
import { MemberandProfile } from '@/type/MemberandProfile'
import {  Task } from '@prisma/client'
import React, { HTMLAttributes } from 'react'

interface OverviewBoardProps extends HTMLAttributes<HTMLDivElement> {
    tasks: Task[]
    members: MemberandProfile
}

export const OverviewPage = ({ members, tasks, className, ...props }: OverviewBoardProps) => {
    return (
        <section {...props} className={cn("", className)}>
            Overview page
            {/*
                tasks?.map((t) => (
                    <p key={t.id}>{t.name}:{t.priority}</p>
                ))
            */}
            <p className='text-lg font-semibold -tracking-wider'>Project Roles</p>
            <div className='w-full min-h-48 bg-red-600 flex items-center justify-start'>
                {
                    members?.map((t) => (
                        <div key={t.id} className='px-3 py-1 flex items-center bg-zinc-300 rounded-xl'>
                            <div className="cursor-pointer rounded-full w-7 h-7 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${t.profile?.imageUrl})` }}></div>
                            <div>
                                <p>{t.profile.firstname}{" "}{t.profile.lastname})</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}
