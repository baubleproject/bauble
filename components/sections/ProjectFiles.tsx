"use client"
import { cn } from '@/lib/utils'
import { Project } from '@prisma/client'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import { getProjectFiles } from '@/actions/getProjectFiles'
import FileCard from '@/components/custom/FileCard'

interface FileBoardProps extends HTMLAttributes<HTMLDivElement> {
    project: Project
    take:number
}

export const ProjectFilesSection = ({ take,project, className, ...props }: FileBoardProps) => {

    const [files, setFIles] = useState<Awaited<ReturnType<typeof getProjectFiles>>>(null)

    useEffect(() => {
        const fetch = async () => {
            const files = await getProjectFiles({ projectId: project.id, take })
            setFIles(files)
        }
        fetch()
    }, [])

    return (
        <section {...props} className={cn("", className)}>
            <p className='text-lg font-semibold -tracking-wider'>Files</p>

            <div className='my-4 flex items-center gap-3'>
                {
                    files?.map(file => (
                        <FileCard key={file.id} file={file} />
                    ))
                }

            </div>
        </section>
    )
}
