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


import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Project } from '@prisma/client';
import { useModal } from "@/hooks/useModalStore";
import React, { useEffect, useState } from 'react'
import { getProjects } from '@/actions/ProjectsActions'
import { Button } from '../ui/button';
import { toast } from 'sonner';
import Loader from "../Loaders/Loader";

const FormSchema = z.object({
    projectId: z.string({}).email().optional(),
})

export default function CreateTask() {
    //INFO: state
    const [projects, setProjects] = useState<Project[] | null>(null)


    //INFO: modal stuff
    const { isOpen, onClose, type, data } = useModal(); // hook to handle modal management with zustand
    const isModalOpen = isOpen && type === 'createTask'; // is it open ? is to create a project ?

    //INFO: was the projectId passed, if it was then we dont need to show the select input to choose the project.
    const projectPassedIn = data?.projectId
    console.log(projectPassedIn)

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
    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (projectPassedIn) {
            data.projectId = projectPassedIn
        }
        console.log(data)
    }

    const handleClose = () => {
        onClose();
    };

    // if (!projects) {
    //     return <Loader />
    // }
    //

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className='min-h-60 md:min-h-[40rem]'>
                <DialogHeader>
                    <DialogTitle>Create a task</DialogTitle>
                    <DialogDescription>
                        Create a new task for your project.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        {
                            //INFO: the fucking select component
                            !projectPassedIn ? (
                                <FormField
                                    control={form.control}
                                    name="projectId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Project</FormLabel>
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
                                                You can manage email addresses in your{" "}
                                                <Link href="/examples/forms">email settings</Link>.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ) : (null)
                        }

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
