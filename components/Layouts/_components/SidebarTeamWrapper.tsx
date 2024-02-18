"use client"
import React, { useEffect, useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Team } from '@prisma/client';
import { fetchTeams } from '@/actions/getAllTeams';

export default function SidebarTeamWrapper() {

    const [teams, setTeams] = useState<Team[] | null>(null)

    useEffect(() => {
        const fetchAllTeams = async () => {
            const teams = await fetchTeams()
            setTeams(teams)
        }
        fetchAllTeams()
    }, [])

    if (!teams) {
        return null
    }

    return (
        <div className='h-1/3 flex-1 w-full bg-red-300'>{
            teams.map((team) => (
                <p className='bg-black text-white'>{team.name}</p>
            ))
        }</div>
    )
}
