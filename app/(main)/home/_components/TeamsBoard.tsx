
import { getProjects } from '@/actions/ProjectsActions'
import { dmsans } from '@/lib/font';
import { Project } from '@prisma/client';
import React from 'react'
import { GrAddCircle } from "react-icons/gr";
import { HTMLAttributes } from 'react';

interface TeamsBoardProps extends HTMLAttributes<HTMLDivElement> {
    // Define any additional props specific to TeamsBoard component
}

export default async function TeamsBoard({ className, ...props }: TeamsBoardProps) {
    const projects = await getProjects({ limit: 4 })
    return (
        <div className={`w-full h-full bg-zinc-950 ${className}`} {...props}>
            <p className={`p-3 text-xl font-light -tracking-wide ${dmsans.className}`}>Projects</p>
            <div className='p-3 bg-red-400 w-full h-full gap-4 items-center justify-center flex flex-col md:grid grid-cols-2 md:grid-cols-3 grid-rows-2 md:grid-rows-3'>
                <div className='w-full h-full bg-zinc-800 transition-colors duration-300 hover:bg-zinc-600 border-zinc-500 border-dashed border-2 flex items-center justify-center'>
                    <GrAddCircle className='text-5xl' />
                </div>
                <div className='bg-green-400 h-40 md:h-full w-full'></div>
                <div className='bg-green-400 h-40 md:h-full w-full'></div>
                <div className='bg-green-400 h-40 md:h-full w-full'></div>
                {/*
                    projects?.map((project) => (
                        <ProjectsCard project={project} key={project.id} />
                    ))
                */}
            </div>
        </div>
    )
}


interface ProjectsCardProps {
    project: Project
}

function ProjectsCard({ project }: ProjectsCardProps) {
    return (
        <div style={{ backgroundImage: `url(${project?.imageUrl})` }} className="bg-cover bg-center h-full w-full ">
            <p className='font-semibold text-black'>
                {project.name}
            </p>
        </div>
    )
}
