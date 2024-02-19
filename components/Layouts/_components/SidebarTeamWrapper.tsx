"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect, useState } from "react";
import { Project } from "@prisma/client";
import axios from "axios";
import SidebarProjectItem from "./SidebarProjectItem";
import useSidebarStore from "@/store/SideBarStore";

export default function SidebarProjectWrapper() {

    const [projects, setProjects] = useState<Project[] | null>(null)

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get("/api/projects")
                setProjects(response.data)
            } catch (error) {
                setProjects(null)
            }
        }
        fetch()
    }, [])

    const { isCollapsed } = useSidebarStore()
    return (
        <div className='max-h-1/3 flex-1 w-full '>
            {
                isCollapsed ? (null) : (
                    <p className="font-semibold text-zinc-600 dark:text-zinc-300 mb-1.5 tracking-tight">Projects</p>
                )
            }
            <ScrollArea className="">
                {projects?.map((project) => (
                    <SidebarProjectItem classname="mb-1" project={project} key={project.id} />
                ))}
            </ScrollArea>
        </div>
    )
}
