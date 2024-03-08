
import { cn, formatDate } from '@/lib/utils'
import { File } from '@prisma/client'
import { FileIcon } from 'lucide-react'
import React, { HTMLAttributes } from 'react'

interface FileCardProps extends HTMLAttributes<HTMLDivElement> {
    file: File

}

export default function FileCard({ file, className }: FileCardProps) {
    return (
        <a href={file.fileUrl} target='_blank'>
            <div className={cn("flex items-center gap-3 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-900 hover:dark:bg-zinc-800 transition-colors duration-300 rounded-lg justify-center w-fit px-3 py-1.5", className)}>
                <FileIcon className="h-7 w-7 fill-green-300 stroke-myPrimary " />
                <div>
                    <p className='text-sm'>{file.name}</p>
                    <p className='text-xs font-light'>{formatDate(file.createdAt)}</p>
                </div>
            </div>
        </a>
    )
}
