"use client"
import { cn } from '@/lib/utils'
import React, {HTMLAttributes} from 'react'

interface OverviewBoardProps extends HTMLAttributes<HTMLDivElement> { }

export const OverviewPage = ({className, ...props}:OverviewBoardProps) => {
    return (
        <section {...props} className={cn("", className)}>
            Overview page
        </section>
    )
}
