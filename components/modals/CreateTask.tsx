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
import { Project } from '@prisma/client';
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

const FormSchema = z.object({
    projectId: z.string({}).optional(),
    name: z.string({
        required_error: "The task name is required"
    }),
    description: z.string().optional(),
    priority: z.string({
        required_error: "The task priority is required"
    })
})

/*
*/
export default function CreateTask() {
    //INFO: state
    const [projects, setProjects] = useState<Project[] | null>(null)
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(2022, 0, 20), 20),
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
            const projects = await getProjects({ limit: 4 })
            setProjects(projects)
        }
        fetchProjects()
    }, [])


    //INFO: form stuff
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })


    //INFO: events, submit, close, etc
    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        // console.log("SUMBIT EVENT WORKS FOR FUCK SAKE")
        if (projectPassedIn) {
            data.projectId = projectPassedIn
        }
        console.log("SUMBIT EVENT WORKS FOR FUCK SAKE")
        console.log(data, date)
    }

    const handleClose = () => {
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
                            <Button type="submit">Create a new Task</Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}
/*


 
    */
