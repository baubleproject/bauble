"use client"
import { useModal } from '@/hooks/useModalStore'
import { Task } from '@prisma/client';
import React, { useEffect, useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '@/components/ui/dialog';
import { getTasksById } from '@/actions/getTaskById';


export default function TaskDetailsModal() {
    const { data, onClose, type, isOpen } = useModal()
    const isModalOpen = isOpen && type === 'taskDetails'; // is it open ? is to create a project ?
    type TaskType = Awaited<ReturnType<typeof getTasksById>>
    const [task, setTask] = useState<TaskType>(null)
    const { taskId } = data

    useEffect(() => {
        const fetchData = async () => {
            const task = await getTasksById({ id: taskId! })
            setTask(task)
        }
        fetchData()
    }, [taskId])

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className='min-h-52 md:min-h-[25rem]'>
                <DialogHeader>
                    <DialogTitle>Task Details</DialogTitle>
                    <DialogDescription>
                        Details for the task "{task?.name}"
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
