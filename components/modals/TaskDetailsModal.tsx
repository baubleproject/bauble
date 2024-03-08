"use client"
import { useModal } from '@/hooks/useModalStore'
import { TaskStatus } from '@prisma/client';
import React, { useEffect, useState } from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { getTasksById } from '@/actions/getTaskById';
import { Separator } from '@radix-ui/react-separator';
import { dmsans } from '@/lib/font';
import { formatDate } from '@/lib/utils';
import { statusMap, priorityMap } from '../tables/TaskTables/columns';
import Loader from '../Loaders/Loader';
import { Calendar, MoreHorizontal } from 'lucide-react';
import { truncateText } from '@/lib/utils';
import { MdMoreVert } from "react-icons/md";
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { z } from 'zod';
import axios from 'axios';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import moment from 'moment';

const FormSchema = z.object({
    comment: z
        .string()
        .min(10, {
            message: "Bio must be at least 10 characters.",
        })
        .max(160, {
            message: "Bio must not be longer than 30 characters.",
        }),
})

export default function TaskDetailsModal() {

    const router = useRouter();
    const { onOpen, data, onClose, type, isOpen } = useModal()
    const isModalOpen = isOpen && type === 'taskDetails'; // is it open ? is to create a project ?
    type TaskType = Awaited<ReturnType<typeof getTasksById>>
    const [task, setTask] = useState<TaskType>(null)
    const [loadingState, setLoadingState] = useState<boolean>(false)
    const { taskId } = data

    const fetchData = async () => {
        try {
            setLoadingState(true)
            const task = await getTasksById({ id: taskId! })
            task?.comments.reverse()
            setTask(task)
        } catch (e) {
            console.log(e)
        } finally {
            setLoadingState(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [taskId])

    const handleClose = () => {
        onClose();
    };

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
            const values = { taskId: task?.id, ...data }
            await axios.post('/api/tasks/comment', values);
            form.reset();
            onClose()
            fetchData()
            router.refresh();
            onOpen("taskDetails", { taskId: task?.id })
        } catch (error) {
            console.log(error);
            toast("failed to create task")
        }
    }


    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className={`${dmsans.className} min-h-52 md:min-h-[25rem] flex flex-col`}>
                {!task || loadingState ? (
                    <Loader className='h-full w-full' />
                ) : (
                    <>
                        <DialogHeader className='h-fit'>
                            <DialogTitle>Task Overview</DialogTitle>
                            <DialogDescription>
                                Details for the task "{task?.name}"
                            </DialogDescription>
                        </DialogHeader>
                        <div className='flex-1 h-auto space-y-1.5'>
                            <div className='flex items-center gap-2'>
                                <p className='text-zinc-600 font-light text-sm'>Task name:</p>
                                <p className='font-semibold'>{task?.name}</p>
                            </div>

                            <div className='flex items-center gap-3'>
                                <p className='text-zinc-600 font-light text-sm'>Task Description:</p>
                                <p className='font-semibold'>{task?.description}</p>
                            </div>
                            <div className='text-sm font-light flex items-center gap-2'>
                                <Calendar className='inline w-4 h-4 self-center text-zinc-600 ' /> {" "} {formatDate(task?.start!)} {" - "}  {formatDate(task?.end!)}
                            </div>
                            <div className='flex gap-1.5'>
                                <div className={`py-1 my-1 px-3 text-xs rounded-lg ${statusMap[task?.status].color} w-fit text-white font-semibold flex items-center justify-center gap-1`}>
                                    <p>
                                        {String(task?.status).toLowerCase()}
                                    </p>
                                    {statusMap[task?.status].icon}
                                </div>
                                <div className={`py-1 my-1 px-3 text-xs rounded-lg ${priorityMap[task?.priority].color} w-fit text-white font-semibold flex items-center justify-center gap-1`}>
                                    <p>
                                        {String(task?.priority).toLowerCase()}
                                    </p>
                                </div>
                            </div>

                            <div className='flex items-center w-full gap-3'>
                                <p>Assigned to</p>
                                {
                                    task?.memberId ? (
                                        <div className='flex items-center gap-2 bg-zinc-300 dark:bg-zinc-700 rounded-md px-2 py-1'>
                                            <div className="cursor-pointer rounded-full w-4 h-4 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${task?.assignedTo?.profile?.imageUrl})` }}></div>
                                            <p>{truncateText(task?.assignedTo?.profile?.firstname! + task?.assignedTo?.profile?.lastname!, 30)}</p>
                                        </div>
                                    ) : (
                                        <div className="font-semibold bg-green-200 dark:bg-green-900 text-sm rounded-md w-fit p-2">Not assigned to anyone</div>
                                    )
                                }
                            </div>


                        </div>
                        <div className='flex w-full flex-col border-t-[0.1px] py-3 border-zinc-300 dark:border-zinc-800'>
                            <p className='font-semibold'>Comments</p>
                            <div className='max-h-80 overflow-auto'>
                                {
                                    task?.comments?.length! > 0 ? (
                                        task.comments.map(comment => (
                                            <div className='p-2 bg-zinc-200 dark:bg-zinc-900 rounded-lg w-fit flex h-full space-x-3 my-2'>
                                                <div className=' h-full w-7'>
                                                    <div className="cursor-pointer rounded-full w-7 h-7 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${comment.author?.profile.imageUrl})` }}></div>
                                                    {/*
                                                    */}
                                                </div>
                                                <div className=''>
                                                    <div className='flex gap-2 items-center'>
                                                        <p className='text-zinc-700 dark:text-zinc-100 text-xs font-xs'>{truncateText(comment.author?.profile?.firstname! + " " + comment.author?.profile?.lastname!, 30)}</p>
                                                        <p>•</p>
                                                        <p className='text-zinc-600 dark:text-zinc-100 text-xs font-xs'>{moment(comment.createdAt).startOf('day').fromNow()}</p>

                                                    </div>
                                                    <p className='text-sm' >{comment.content}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className='font-light text-sm'>
                                            There are no comments for this tasks.
                                        </div>
                                    )
                                }
                            </div>
                            <div className='flex flex-col mt-2 w-full items-end justify-end'>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-1.5">
                                        <FormField
                                            control={form.control}
                                            name="comment"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="do you have anything to say about this task?"
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit">Submit</Button>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
