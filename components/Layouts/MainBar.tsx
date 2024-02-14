
import React from 'react'
import { cn } from '@/lib/utils'

export default function MainDashBoardLayout({ children, classname }: { children: React.ReactNode, classname?: string }) {
    return (
        <main className={cn('p-3 w-full h-full flex bg-white dark:bg-black', classname)}>
            {children}
        </main>
    )
}
