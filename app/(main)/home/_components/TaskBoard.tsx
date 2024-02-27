"use client"
import { HTMLAttributes } from 'react';
import { useModal } from '@/hooks/useModalStore';
import { dmsans } from '@/lib/font';
import React, { } from 'react'
import { GrAddCircle } from "react-icons/gr";
// import { Project } from '@prisma/client';
// import { formatDate, truncateText } from '@/lib/utils';
// import Loader from '@/components/Loaders/Loader';
// import { useRouter } from 'next/navigation';


interface TaskBoardProps extends HTMLAttributes<HTMLDivElement> { }

export default function TaskBoard({ className, ...props }: TaskBoardProps) {

    const { onOpen } = useModal()

    const createTaskModalOpen = () => {
        onOpen("createTask")
    }
    return (
        <div className={`w-full h-full bg-zinc-100 dark:bg-zinc-950 dark:text-black ${className}`} {...props}>
            <div className='w-full flex items-center justify-between border-b-[0.05px] border-zinc-300 dark:border-zinc-700 p-3 '>
                <p className={`text-xl font-light dark:text-white -tracking-wide ${dmsans.className}`}>Tasks</p>
                <div className='cursor-pointer' onClick={createTaskModalOpen}>
                    <GrAddCircle className='font-light text-xl text-zinc-500' />
                </div>
            </div>
            <div className='w-full h-full flex flex-wrap gap-2 p-3 '>
            </div>
        </div>

    )
}
