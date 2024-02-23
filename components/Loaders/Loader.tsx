
import { cn } from '@/lib/utils'
import React from 'react'
import { LuLoader2 } from "react-icons/lu";
import { HTMLAttributes } from 'react';

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
    loaderClassName?: string
}

export default function Loader({ loaderClassName,className, ...props }: LoaderProps) {
    return (
        <div {...props} className={cn("w-full h-full flex items-center justify-center", className)}>
            <LuLoader2 className={cn("animate-spin text-xl" , loaderClassName )} />
        </div>
    )
}
