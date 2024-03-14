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
import { MemberRole, Task, TaskStatus } from '@prisma/client';
import { useModal } from "@/hooks/useModalStore";
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getTasksByIdSimple } from "@/actions/getTaskById";
import Loader from "../Loaders/Loader";
import { MemberwithProfile, getMember } from "@/actions/getProjectMembers";

const FormSchema = z.object({
    role: z.string({
        required_error: "The task status is required"
    }),
})



export default function ChangeMemberRole() {
    //INFO: state
    const [member, setMember] = useState<MemberwithProfile | null>(null)
    type MemberRoleValues = keyof typeof MemberRole;
    const MemberRoleArray: MemberRoleValues[] = Object.values(MemberRole) as MemberRoleValues[];

    //INFO: modal stuff
    const { isOpen, onClose, type, data } = useModal(); // hook to handle modal management with zustand
    const isModalOpen = isOpen && type === 'memberStatus'; // is it open ? is to create a project ?

    //INFO: was the projectId passed, if it was then we dont need to show the select input to choose the project.
    const memberId = data?.memberId

    const [loadingTask, setLoadingTask] = useState(false)

    //INFO: useeffect stuff
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoadingTask(true)
                const member = await getMember({ id: memberId! })
                setMember(member)
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
            await axios.put(`/api/members/${memberId}/status`, data);
            toast.success("member status has been updated")
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
                    <DialogTitle>Change member Role</DialogTitle>
                    <DialogDescription>
                        {
                            !loadingTask && member ? (
                                <p>
                                    change the role of member @{member.profile.email}
                                </p>
                            ) : (null)
                        }
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    {
                        !loadingTask && member ? (

                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel></FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={member?.role.toLowerCase()} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent defaultValue={member.role}>
                                                    {
                                                        MemberRoleArray?.map((role, idx) => (
                                                            <SelectItem key={idx} value={role}>{role.toLowerCase()}</SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>
                                                change the member role 
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <DialogFooter>
                                    <Button disabled={loadingState} type="submit">Update role</Button>
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
