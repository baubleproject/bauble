'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';


import { useModal } from "@/hooks/useModalStore";
import { Button } from '../ui/button';

export default function CreateTask() {
    const { isOpen, onClose, type, data } = useModal(); // hook to handle modal management with zustand
    const isModalOpen = isOpen && type === 'createTask'; // is it open ? is to create a project ?

    const project = data?.project

    const handleClose = () => {
        onClose();
    };


    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className='min-h-60 md:min-h-[40rem]'>
                <DialogHeader>
                    <DialogTitle>Create a task</DialogTitle>
                    <DialogDescription>
                        create a new task for your project.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
