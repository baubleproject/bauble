
import React from 'react'
import SideBar from './SideBar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className='w-full h-full flex'>
            <SideBar />
            <section className='flex-grow px-4'>
                {children}
            </section>
        </main>
    )
}
