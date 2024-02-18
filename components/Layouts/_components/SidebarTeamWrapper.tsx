"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect, useState } from "react";
import { Team } from "@prisma/client";
import axios from "axios";
import SidebarTeamItem from "./SidebarTeamItem";
import useSidebarStore from "@/store/SideBarStore";

export default function SidebarTeamWrapper() {

    const [teams, setTeams] = useState<Team[] | null>(null)

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get("/api/teams")
                setTeams(response.data)
            } catch (error) {
                setTeams(null)
            }
        }
        fetch()
    }, [])

    const { isCollapsed } = useSidebarStore()
    return (
        <div className='h-1/3 flex-1 w-full '>
            {
                isCollapsed || true ? (null) : (
                    <p className="font-semibold text-zinc-600 dark:text-zinc-300 mb-1.5 tracking-tight">Teams</p>
                )
            }
            <ScrollArea className="">
                {teams?.map((team) => (
                    <SidebarTeamItem classname="mb-1" team={team} key={team.id} />
                ))}
            </ScrollArea>
        </div>
    )
}
