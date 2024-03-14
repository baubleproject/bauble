"use client"
import React, { useEffect, useState } from 'react'
import { VerticalTabs, VerticalTabsContent, VerticalTabsList, VerticalTabsTrigger } from "@/components/ui/verticalTabs"
import { Member, Project } from '@prisma/client'
import SettingsAccountSection from '@/components/sections/SettingsAccountSection'

import { MemberandProfile } from '@/type/MemberandProfile'
interface SettingsProps {
    members?: MemberandProfile | null
    project:Project
}

export default function SettingsPage({project}:SettingsProps) {
    const [userMember, setUserMember] = useState(null)

    useEffect(() => { }, [])

    return (
        <main className='space-y-4 h-full'>
            <VerticalTabs defaultValue="members" className="md:flex gap-6 md:w-[80%] h-full p-3">
                <VerticalTabsList className='w-fit h-fit p-2'>
                    <VerticalTabsTrigger value="members">Members</VerticalTabsTrigger>
                    <VerticalTabsTrigger value="project">Project Settings</VerticalTabsTrigger>
                </VerticalTabsList>
                <div className='w-full h-full'>
                    <VerticalTabsContent value="members" className='w-full h-full'>
                        <SettingsAccountSection projectId={project.id} />
                    </VerticalTabsContent>
                    <VerticalTabsContent value="project">Change your password here.</VerticalTabsContent>
                </div>
            </VerticalTabs>

        </main>
    )
}
