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
import { getProject } from "@/actions/getProject";

const FormSchema = z.object({
    projectId: z.string({}).optional(),
    name: z.string({
        required_error: "The task name is required"
    }),
    description: z.string().optional(),
    priority: z.string({
        required_error: "The task priority is required"
    }),
    memberId: z.string()
})


//type ProjectAndMembersResponse = Project[] | null & Member[] | null

export default function UpdateTask() {
    //INFO: state
    //const [members, setMembers] = useState<Member[] | null>(null)
    const [members, setMembers] = useState<Awaited<ReturnType<typeof getProjectMembers>>>(null)
    const [memberIsReady, setMemberIsReady] = useState(false)
    type PriorityValues = keyof typeof Priority;
    const priorityArray: PriorityValues[] = Object.values(Priority) as PriorityValues[];

    //INFO: modal stuff
    const { isOpen, onClose, type, data } = useModal(); // hook to handle modal management with zustand
    const isModalOpen = isOpen && type === 'updateTask'; // is it open ? is to create a project ?

    //INFO: we need the project and task passed in, probably an expensive operation, but i dont care.
    const taskPassedIn = data?.task

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: taskPassedIn?.start,
        to: taskPassedIn?.end,
    })


    //INFO: useeffect stuff
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setMemberIsReady(true)
                const projects = await getProjectMembers({ id: taskPassedIn?.projectId! })
                setMembers(projects)
                setMemberIsReady(true)
            } catch (error) {
                setMembers(null)
                setMemberIsReady(false)
            }
        }
        fetchProjects()
    }, [isModalOpen])



    //INFO: form stuff
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: taskPassedIn?.name,
            description: taskPassedIn?.description ? taskPassedIn.description : undefined,
            priority: taskPassedIn?.priority,
            memberId: taskPassedIn?.memberId ? taskPassedIn.memberId : undefined
        }
    })

    const loadingState = form.formState.isSubmitting

    const router = useRouter(); // initialize router

    //INFO: events, submit, close, etc
    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
            data.projectId = taskPassedIn?.projectId
            const values = { end: date?.to, start: date?.from, ...data }
            await axios.put(`/api/tasks/${taskPassedIn?.id}/edit`, values);
            toast.success("Project task has been updated")
            form.reset();
            router.refresh();
            window.location.reload()
            onClose();

        } catch (error) {
            console.log(error);
            toast("failed to update task")
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
                    <DialogTitle>Update task details</DialogTitle>
                    <DialogDescription>
                        update task {taskPassedIn?.name}
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

                        {/*
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
                        */}

                        {
                            memberIsReady ? (

                                <FormField
                                    control={form.control}
                                    name="memberId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Choose assignee</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select who you want to work on the task" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent defaultValue={taskPassedIn?.memberId!}>
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

                            ) : (null)
                        }

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
                            <Button disabled={loadingState} type="submit">Update Task</Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}
