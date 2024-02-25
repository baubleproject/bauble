'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
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
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from "sonner"
import { useModal } from '@/hooks/useModalStore';


const formSchema = z.object({
    name: z.string().min(3, {
        message: 'Server name is required',
    }),
    description: z.string().optional()
});

export default function CreateProjectModal() {
    const { isOpen, onClose, type } = useModal(); // hook to handle modal management with zustand
    const isModalOpen = isOpen && type === 'createProject'; // is it open ? is to create a project ?

    const router = useRouter(); // initialize router

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: ""
        },
    });

    const onSubmit = async (
        // what happens when we submit our create project form
        values: z.infer<typeof formSchema>
    ) => {
        //console.log(values);
        try {
            await axios.post('/api/projects', values);
            form.reset();
            toast.success("Project has been created")
            router.refresh();
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    const loading = form.formState.isSubmitting; // while the form is submitting

    const handleClose = () => {
        // what happens when the modal closes
        form.reset();
        onClose();
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-zinc-950 dark:bg-zinc-950 dark:text-slate-50 overflow-hidden">
                <DialogHeader>
                    <DialogTitle>Create a Project!</DialogTitle>
                    <DialogDescription>
                        Add a project name and description.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5 w-full "
                    >
                        <div className="space-y-5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-slate-700 dark:text-slate-100">
                                            Project name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder=""
                                                className="bg-zinc-300/10 border-0 focus-visible:ring-0 text-black dark:text-slate-200 font-semibold focus-visible:ring-offset-0"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="font-semibold text-red-500" />
                                    </FormItem>
                                )}
                            ></FormField>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-slate-700 dark:text-slate-100">
                                            Description
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder=""
                                                className="bg-zinc-300/10 border-0 focus-visible:ring-0 text-black dark:text-slate-200 font-semibold focus-visible:ring-offset-0"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="font-semibold text-red-500" />
                                    </FormItem>
                                )}
                            ></FormField>

                        </div>
                        <DialogFooter>
                            <Button
                                className="font-bold disabled:bg-slate-300"
                                variant="default"
                                disabled={loading}
                            >
                                Create Project
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
