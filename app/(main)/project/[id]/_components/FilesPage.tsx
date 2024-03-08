"use client"
import { cn } from '@/lib/utils'
import { Project } from '@prisma/client'
import React, { HTMLAttributes } from 'react'
import { Button } from '@/components/ui/button'
import { useModal } from "@/hooks/useModalStore";
interface FileBoardProps extends HTMLAttributes<HTMLDivElement> {
    project: Project
}

export const FilePage = ({ project, className, ...props }: FileBoardProps) => {

    const { onOpen } = useModal()
    return (
        <section {...props} className={cn("", className)}>
            <p className='text-lg font-semibold -tracking-wider'>Project Files</p>
            <Button className="text-sm" onClick={() => onOpen("addFile", { projectId: project?.id })}>Add a file</Button>
        </section>
    )
}
