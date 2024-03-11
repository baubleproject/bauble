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

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Task, TaskStatus } from '@prisma/client';
import { useModal } from "@/hooks/useModalStore";
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getTasksByIdSimple } from "@/actions/getTaskById";
import Loader from "../Loaders/Loader";

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

    const [loadingTask, setLoadingTask] = useState(false)

    //INFO: useeffect stuff
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoadingTask(true)
                const task = await getTasksByIdSimple({ id: taskId! })
                setTask(task)
            } catch (error) {

            } finally {
                setLoadingTask(false)
            }
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

    // if (!task || loadingTask) {
    //     return <Loader />
    // }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className='min-h-44 md:min-h-[15rem]'>
                <DialogHeader>
                    <DialogTitle>Change task status</DialogTitle>
                    <DialogDescription>
                        {
                            !loadingTask && task ? (
                                <p>
                                    change the status of specified task ${task?.name ? task.name : ""}
                                </p>
                            ) : (null)
                        }
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    {
                        !loadingTask && task ? (

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
                                                <SelectContent defaultValue={task.status}>
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
                        ) : (
                            <div className="flex items-center justify-center w-full ">
                                <Loader />
                            </div>
                        )
                    }
                </Form>

            </DialogContent>
        </Dialog >
    )
}
