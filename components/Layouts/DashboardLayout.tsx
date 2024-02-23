
import React from 'react'
import SideBar from './SideBar'
import { cn } from '@/lib/utils'
import TopBar from './TopBar'
import MainDashBoardLayout from './MainBar'

export default function DashboardLayout({ children, classname }: { children: React.ReactNode, classname?: string }) {
    return (
        <main className={cn('overflow-hidden w-full h-full flex', classname)}>
            <SideBar />
            <section className='flex-grow'>
                <TopBar />
                <MainDashBoardLayout>
                    {children}
                </MainDashBoardLayout>
            </section>
        </main>
    )
}
