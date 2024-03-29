'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '@/components/ui/dialog';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from '@/components/ui/form';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Calendar } from "@/components/ui/calendar"

//import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Member, Project } from '@prisma/client';
import { useModal } from "@/hooks/useModalStore";
import React, { useEffect, useState } from 'react'
import { getProjects } from '@/actions/ProjectsActions'
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Button } from '../ui/button';
import { Priority } from "@prisma/client";
//import { toast } from 'sonner';
//import Loader from "../Loaders/Loader";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getProjectMembers } from "@/actions/getProjectMembers";
import useTaskStore from "@/store/TaskState";
import { TaskType } from "@/actions/getTaskById";

const FormSchema = z.object({
    projectId: z.string({}).optional(),
    name: z.string({
        required_error: "The task name is required"
    }),
    description: z.string().optional(),
    priority: z.string({
        required_error: "The task priority is required"
    }),
    assignedTo: z.string()
})


//type ProjectAndMembersResponse = Project[] | null & Member[] | null

export default function CreateTask() {
    //INFO: state
    const [projects, setProjects] = useState<Project[] | null>(null)
    //const [members, setMembers] = useState<Member[] | null>(null)
    const [members, setMembers] = useState<Awaited<ReturnType<typeof getProjectMembers>>>(null)
    const [memberIsReady, setMemberIsReady] = useState(false)
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 20),
    })

    type PriorityValues = keyof typeof Priority;
    const priorityArray: PriorityValues[] = Object.values(Priority) as PriorityValues[];

    //INFO: modal stuff
    const { isOpen, onClose, type, data } = useModal(); // hook to handle modal management with zustand
    const isModalOpen = isOpen && type === 'createTask'; // is it open ? is to create a project ?

    //INFO: was the projectId passed, if it was then we dont need to show the select input to choose the project.
    const projectPassedIn = data?.projectId


    //INFO: useeffect stuff
    useEffect(() => {
        const fetchProjects = async () => {
            if (projectPassedIn || form.getValues("projectId")) {
                setMemberIsReady(true)
            }
            const projects = await getProjects({})
            //const response = await axios.get("/api/projects")
            setProjects(projects)
        }
        fetchProjects()
    }, [isModalOpen])



    //INFO: form stuff
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const { setTasks, tasks } = useTaskStore()

    useEffect(() => {
        const fetchMembers = async () => {
            if (projectPassedIn || form.getValues("projectId")) {
                setMemberIsReady(true)
            }
            const members = await getProjectMembers({ id: form?.getValues("projectId") ? form?.getValues("projectId")! : projectPassedIn! })
            setMembers(members)
        }
        fetchMembers()
    }, [form.getValues().projectId, projectPassedIn])

    const loadingState = form.formState.isSubmitting

    const router = useRouter(); // initialize router

    //INFO: events, submit, close, etc
    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
            let updatedTasks = [...tasks]; // Copy current tasks array

            if (projectPassedIn) {
                data.projectId = projectPassedIn;
            }

            const values = { to: date?.to, from: date?.from, ...data };
            const response = await axios.post('/api/tasks', values);
            const taskData: TaskType = response.data;

            updatedTasks.push(taskData); // Add the new task to the copied array

            // Update tasks state with the new array
            //setTasks(updatedTasks);
            router.refresh()

            toast.success("Project task has been created");
            form.reset();
            onClose();
        } catch (error) {
            console.log(error);
            toast("failed to create task")
        }
    }

    const handleClose = () => {
        form.reset()
        onClose();
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className='min-h-52 md:min-h-[25rem]'>
                <DialogHeader>
                    <DialogTitle>Create a task</DialogTitle>
                    <DialogDescription>
                        Create a new task for your project.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Task Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            //disabled={loading}
                                            placeholder=""
                                            //className="bg-zinc-300/10 border-0 focus-visible:ring-0 text-black dark:text-slate-200 font-semibold focus-visible:ring-offset-0"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Name of the task please
                                    </FormDescription>
                                    <FormMessage className="font-semibold text-red-500" />
                                </FormItem>
                            )}
                        ></FormField>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Task Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormDescription>
                                        Tell us a little bit about the task
                                    </FormDescription>
                                    <FormMessage className="font-semibold text-red-500" />
                                </FormItem>
                            )}
                        ></FormField>

                        {
                            //INFO: the fucking select component
                            !projectPassedIn ? (
                                <FormField
                                    control={form.control}
                                    name="projectId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Task Project</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a verified email to display" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {
                                                        projects?.map((project) => (
                                                            <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>
                                                Which of these projects do you want to create a project for
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ) : (null)
                        }

                        {
                            memberIsReady ? (

                                <FormField
                                    control={form.control}
                                    name="assignedTo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Choose assignee</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select who you want to work on the task" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {
                                                        members?.map((member, idx) => (
                                                            <SelectItem key={idx} value={member?.id}>{member?.profile.firstname + " " + member?.profile.lastname}</SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>
                                                Pick someone to work on the task.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            ) : (null)}

                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Task Priority</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an intensity degree" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                priorityArray?.map((priority, idx) => (
                                                    <SelectItem key={idx} value={priority}>{priority}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        How urgent should this task be completed
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className={cn("grid gap-2")}>
                            <FormLabel>Task Start and End date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="date"
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-center text-center font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date?.from ? (
                                            date.to ? (
                                                <>
                                                    {format(date.from, "LLL dd, y")} -{" "}
                                                    {format(date.to, "LLL dd, y")}
                                                </>
                                            ) : (
                                                format(date.from, "LLL dd, y")
                                            )
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="range"
                                        defaultMonth={date?.from}
                                        selected={date}
                                        onSelect={setDate}
                                        numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <DialogFooter>
                            <Button disabled={loadingState} type="submit">Create a new Task</Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}
