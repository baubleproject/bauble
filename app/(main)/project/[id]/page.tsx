"use client"
import { dmsans } from "@/lib/font";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OverviewPage } from "./_components/OverviewPage";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/Loaders/Loader";
import { useState } from "react";


export default function page(props: any) {
    const [loading, setLoading] = useState(false)
    const id = props.params.id;
    // const project = await prisma?.project.findFirst({
    //     where: {
    //         id
    //     }
    // })


    if (loading) return (
        <Loader className="w-full h-full" />
    )
    return (
        <div className={`${dmsans.className} w-full space-y-5`}>
            <div>
                <p className="text-lg font-semibold">{id}</p>
                <p className="font-extralight text-sm"></p>
                <p className="font-extralight text-sm"></p>
                <p className="font-extralight text-sm"></p>
            </div>
            <div className="w-full h-full">
                <Tabs defaultValue="overview" className="w-full h-full">
                    <TabsList className="space-x-2 p-3">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="calendar">Calendar</TabsTrigger>
                        <TabsTrigger value="kanban">Kanban</TabsTrigger>
                        <TabsTrigger value="gantt">Gantt</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <Separator className="text-transparent dark:text-zinc-500 w-full my-3" />
                    <TabsContent value="overview" className="h-full w-full">
                        <OverviewPage className="h-full w-full" />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
