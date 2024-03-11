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
import { Member, Project, Task, TaskStatus } from '@prisma/client';
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
import { getTasksByIdSimple } from "@/actions/getTaskById";

const FormSchema = z.object({
    status: z.string({
        required_error: "The task status is required"
    }),
})



export default function ChangeTaskStatus() {
    //INFO: state
    const [task, setTask] = useState<Task | null>(null)
    type TaskStatusValues = keyof typeof TaskStatus;
    const TaskStatusArray: TaskStatusValues[] = Object.values(TaskStatus) as TaskStatusValues[];

    //INFO: modal stuff
    const { isOpen, onClose, type, data } = useModal(); // hook to handle modal management with zustand
    const isModalOpen = isOpen && type === 'taskStatus'; // is it open ? is to create a project ?

    //INFO: was the projectId passed, if it was then we dont need to show the select input to choose the project.
    const taskId = data?.taskId


    //INFO: useeffect stuff
    useEffect(() => {
        const fetchProjects = async () => {
            const task = await getTasksByIdSimple({ id: taskId! })
            setTask(task)
        }
        fetchProjects()
    }, [isModalOpen])



    //INFO: form stuff
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })


    const loadingState = form.formState.isSubmitting

    const router = useRouter(); // initialize router

    //INFO: events, submit, close, etc
    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
            await axios.put(`/api/tasks/${taskId}/status`, data);
            toast.success("task status has been updated")
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
        onClose();
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className='min-h-52 md:min-h-[25rem]'>
                <DialogHeader>
                    <DialogTitle>Change task status</DialogTitle>
                    <DialogDescription>
                        change the status of specified task
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel></FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={task?.status.toLowerCase()} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                TaskStatusArray?.map((priority, idx) => (
                                                    <SelectItem key={idx} value={priority}>{priority.toLowerCase()}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        change the task status
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button disabled={loadingState} type="submit">Update status</Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog >
    )
}
