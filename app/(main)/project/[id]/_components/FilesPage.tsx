"use client"
import { cn } from '@/lib/utils'
import { Project } from '@prisma/client'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useModal } from "@/hooks/useModalStore";
import { getProjectFiles } from '@/actions/getProjectFiles'
import FileCard from '@/components/custom/FileCard'
import { AddCustomButton } from '@/components/custom/AddButton'
interface FileBoardProps extends HTMLAttributes<HTMLDivElement> {
    project: Project
}

export const FilePage = ({ project, className, ...props }: FileBoardProps) => {

    const { onOpen } = useModal()
    const [files, setFIles] = useState<Awaited<ReturnType<typeof getProjectFiles>>>(null)

    useEffect(() => {
        const fetch = async () => {
            const files = await getProjectFiles({ projectId: project.id })
            setFIles(files)
        }
        fetch()
    }, [])

    /*  <Button className="text-sm" onClick={() => onOpen("addFile", { projectId: project?.id })}>Add a file</Button> */
    return (
        <section {...props} className={cn("", className)}>
            <p className='text-lg font-semibold -tracking-wider'>Project Files</p>

            <div className='my-4 flex items-center gap-3'>
                <AddCustomButton onClick={() => onOpen("addFile", { projectId: project.id })} className='' />
                {
                    files?.map(file => (
                        <FileCard key={file.id} file={file} />
                    ))
                }

            </div>
        </section>
    )
}
