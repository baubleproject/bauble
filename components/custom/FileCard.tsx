import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useReloadState from "@/hooks/useReload"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { cn, formatDate, truncateText } from '@/lib/utils'
import { File } from '@prisma/client'
import axios from "axios"
import { FileIcon } from 'lucide-react'
import { useRouter } from "next/navigation"
import React, { HTMLAttributes } from 'react'
import { RiMore2Fill } from "react-icons/ri";
import { toast } from "sonner"

interface FileCardProps extends HTMLAttributes<HTMLDivElement> {
    file: File

}

export default function FileCard({ file, className }: FileCardProps) {

    const router = useRouter()
    const { ReloadPage } = useReloadState()

    const deleteFile = async () => {
        try {
            axios.delete(`/api/files/${file.id}`)
            toast.success("File has been deleted")
            //@eslint-disable-next-line
            ReloadPage()
        } catch (error) {
            toast.error("Error deleting file")
            console.log(error)
        }
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <a href={file.fileUrl} target='_blank'>
                        <div className={cn("flex items-center gap-3 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-900 hover:dark:bg-zinc-800 transition-colors duration-300 rounded-lg justify-center w-fit px-3 py-1.5", className)}>
                            <FileIcon className="h-7 w-7 fill-green-300 stroke-myPrimary " />
                            <div>
                                <p className='text-sm'>{truncateText(file.name, 21)}</p>
                                <p className='text-xs font-light'>{formatDate(file.createdAt)}</p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <div className="px-1.5 py-1.5 hover:bg-zinc-400 rounded-lg">
                                        <RiMore2Fill />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>File Options</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem about="delete the selected file" onClick={deleteFile} >Delete file</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </a>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{file.name}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
