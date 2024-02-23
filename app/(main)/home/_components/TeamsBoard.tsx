
import { getProjects } from '@/actions/ProjectsActions'
import { dmsans } from '@/lib/font';
import { Project } from '@prisma/client';
import React from 'react'
import { GrAddCircle } from "react-icons/gr";
import { HTMLAttributes } from 'react';
import { formatDate, truncateText } from '@/lib/utils';

interface TeamsBoardProps extends HTMLAttributes<HTMLDivElement> { }

export default async function TeamsBoard({ className, ...props }: TeamsBoardProps) {
    const projects = await getProjects({ limit: 4 })
    return (
        <div className={`w-full h-full bg-zinc-950 ${className}`} {...props}>
            <p className={`p-3 text-xl font-light -tracking-wide ${dmsans.className}`}>Projects</p>
            <div className='w-full h-full flex flex-wrap items-start gap-2 justify-start p-3'>
                <div className='md:w-1/3 h-1/4 bg-zinc-900 hover:bg-zinc-800 transition-colors duration-300 cursor-pointer flex justify-center items-center gap-2 px-2 rounded-xl border-2 border-zinc-600 border-dashed'>
                    <GrAddCircle className='font-light text-xl' />
                    <p>Create project</p>
                </div>
                {
                    projects?.map((project) => (
                        <ProjectsCard key={project.id} project={project} />
                    ))
                }
            </div>
        </div>
    )
}


interface ProjectsCardProps {
    project: Project
}

function ProjectsCard({ project }: ProjectsCardProps) {
    return (
        <div className='flex items-center justify-center h-1/4 min-w-48 bg-zinc-900 hover:bg-zinc-800 transition-colors duration-300 px-3 rounded-xl gap-2 cursor-pointer'>
            <div style={{ backgroundImage: `url(${project?.imageUrl})` }} className="bg-cover bg-center h-10 w-10 rounded-full ">
            </div>
            <div className='flex-1 h-full flex flex-col items-center justify-center'>
                <div className='flex flex-col items-center justify-center'>
                    <p className='font-light text-sm -tracking-wide text-white truncate'>
                        {
                            truncateText(project?.name, 16)
                        }
                    </p>
                    <p className='flex-1 font-light text-xs -tracking-wide text-white truncate'>
                        {
                            truncateText(formatDate(project?.createdAt), 20)
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}
