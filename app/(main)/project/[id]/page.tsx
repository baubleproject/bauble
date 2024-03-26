"use client";
import { dmsans } from "@/lib/font";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewPage } from "./_components/OverviewPage";
import { useEffect, useState } from "react";
import { GanttPage } from "./_components/GantPage";
import { getProject } from "@/actions/getProject";
import { getProjectTasks } from "@/actions/getProfileTasks";
import { Member, Project, Task } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/Loaders/Loader";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import { toast } from "sonner";
import axios from "axios";
import { MemberandProfile } from "@/type/MemberandProfile";
import { TablePage } from "./_components/TablePage";
import { TasksandAssignedTo } from "@/type/TaskandAssignedTo";
import { FilePage } from "./_components/FilesPage";
import CalenderPage from "./_components/CalenderPage";
import useReloadState from "@/hooks/useReload";
import SettingsPage from "./_components/SettingsPage";
import KanbanPage from "./_components/KanbanPage";
import { TaskType, getPlentyTasksById } from "@/actions/getTaskById";
import useTaskStore from "@/store/TaskState";

interface Props {
    params: {
        id: string;
    };
}

export default function Page({ params }: Props) {
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState<Project | null>(null);
    const [members, setMembers] = useState<MemberandProfile | null>(null);
    const { onOpen } = useModal();
    const { reloadFlag } = useReloadState();


    const tasks = useTaskStore(state => state.tasks);
    const setTasks = useTaskStore(state => state.setTasks);

    const id = params.id;

    const fetchData1 = async () => {
        try {
            const response = await getProject({ id });
            setProject(response);
        } catch (error) {
            console.error("Error fetching project:", error);
        }
    };

    const fetchData2 = async () => { // this function is for getting the tasks of the preset project
        try {
            const tasks = await getPlentyTasksById({ id });
            if (tasks?.length! > 0) {
                setTasks(tasks!);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const fetchData3 = async () => {
        try {
            const response = await axios.get(`/api/projects/${id}/member`);
            setMembers(response.data);
        } catch (error) {
            toast.error("Failure to load data");
            console.error("Error fetching tasks:", error);
        }
    };

    const fetchData = async () => {
        try {
            setLoading(true);

            const requests = [];

            requests.push(fetchData1());
            requests.push(fetchData2());
            requests.push(fetchData3());

            await Promise.all(requests);

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [reloadFlag]);

    if (loading || !project || !members) {
        return <Loader />;
    }

    return (
        <div className={`${dmsans.className} w-full space-y-5`}>
            <div>
                <p className="text-xl font-semibold">{project?.name}</p>
                <p className="font-extralight text-sm">{project?.description}</p>
                <p className="font-extralight text-sm">Project: {id}</p>
                <p className="font-extralight text-sm">
                    created at: {formatDate(project?.createdAt!)}
                </p>
            </div>
            <div className="w-full h-full">
                <Tabs defaultValue="overview" className="w-full h-full">
                    <TabsList className="space-x-2 p-3">

                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="table">Table</TabsTrigger>
                        <TabsTrigger value="kanban">Kanban</TabsTrigger>
                        <TabsTrigger value="gantt">Gantt</TabsTrigger>
                        <TabsTrigger value="file">Files</TabsTrigger>
                        <TabsTrigger value="calendar">Calendar</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>

                    </TabsList>
                    <Button
                        className="mx-2 text-sm"
                        onClick={() => onOpen("inviteMembers", { project: project! })}
                    >
                        Invite a Collaborator
                    </Button>
                    <Button
                        className="mx-2 text-sm"
                        onClick={() => onOpen("createTask", { projectId: project?.id })}
                    >
                        Create a task
                    </Button>
                    <Separator className="text-transparent dark:text-zinc-500 w-full my-3" />
                    <TabsContent value="overview" className="h-full w-full">
                        <OverviewPage
                            project={project}
                            members={members!}
                            tasks={tasks!}
                            className="h-full w-full"
                        />
                    </TabsContent>

                    <TabsContent value="kanban" className="h-full w-full">
                        <KanbanPage
                            project={project}
                        />
                    </TabsContent>

                    <TabsContent value="table" className="h-full w-full">
                        <TablePage
                            members={members!}
                            className="h-full w-full"
                        />
                    </TabsContent>
                    <TabsContent value="settings" className="h-full w-full">
                        <SettingsPage project={project} />
                    </TabsContent>


                    <TabsContent value="file" className="h-full w-full">
                        <FilePage project={project!} />
                    </TabsContent>
                    <TabsContent value="calendar" className="h-full w-full">
                        <CalenderPage tasks={tasks!} />
                    </TabsContent>

                    <TabsContent value="gantt" className="h-full w-full">
                        <GanttPage tasks={tasks!} className="h-full w-full" />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
