"use client"
import { dmsans } from "@/lib/font";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewPage } from "./_components/OverviewPage";
import { useEffect, useState } from "react";
import { GanttPage } from "./_components/GantPage";
import { getProject } from "@/actions/getProject";
import { getProjectTasks } from "@/actions/getProfileTasks";
import { Project, Task } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/Loaders/Loader";
import { formatDate } from "@/lib/utils";

interface Props {
    params: {
        id: string;
    };
}

export default function Page({ params }: Props) {
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState<Task[] | null>(null);
    const [project, setProject] = useState<Project | null>(null);

    const id = params.id;

    const fetchData1 = async () => {
        try {
            const response = await getProject({ id });
            setProject(response);
        } catch (error) {
            console.error("Error fetching project:", error);
        }
    };

    const fetchData2 = async () => {
        try {
            const tasks = await getProjectTasks({ id });
            if (tasks?.length! > 0) {
                setTasks(tasks!);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const requests = [];

                requests.push(fetchData1());
                requests.push(fetchData2());

                await Promise.all(requests);

                console.log(project);
                console.log(tasks);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <Loader />
    }

    return (
        <div className={`${dmsans.className} w-full space-y-5`}>
            <div>
                <p className="text-xl font-semibold">{project?.name}</p>
                <p className="font-extralight text-sm">{project?.description}</p>
                <p className="font-extralight text-sm">Project: {id}</p>
                <p className="font-extralight text-sm">created at: {formatDate(project?.createdAt!)}</p>
            </div>
            <div className="w-full h-full">
                <Tabs defaultValue="overview" className="w-full h-full">
                    <TabsList className="space-x-2 p-3">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="gantt">Gantt</TabsTrigger>
                        <TabsTrigger value="calendar">Calendar</TabsTrigger>
                        <TabsTrigger value="kanban">Kanban</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <Separator className="text-transparent dark:text-zinc-500 w-full my-3" />
                    <TabsContent value="overview" className="h-full w-full">
                        <OverviewPage tasks={tasks!} className="h-full w-full" />
                    </TabsContent>
                    <TabsContent value="gantt" className="h-full w-full">
                        <GanttPage tasks={tasks!} className="h-full w-full" />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

