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
        <div className={`w-full h-full dark:bg-zinc-950 dark:text-black ${className}`} {...props}>
            <p className={`border-b-[0.05px] border-zinc-600 p-3 text-xl font-light dark:text-white -tracking-wide ${dmsans.className}`}>Tasks</p>
            <div className='w-full h-full flex flex-wrap gap-2 p-3 '>
                <div onClick={createTaskModalOpen} className='md:w-1/6 h-1/4 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors duration-300 cursor-pointer flex justify-center items-center gap-2 px-2 rounded-xl border-2 border-zinc-600 border-dashed'>
                    <GrAddCircle className='font-light text-xl' />
                </div>
            </div>
        </div>

    )
}
