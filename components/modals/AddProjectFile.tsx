
'use client';
import React, { useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Check, Copy, RefreshCcw } from 'lucide-react';
import { toast } from "sonner"
import { useModal } from '@/hooks/useModalStore';
import { Label } from '../ui/label';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { FileUpload } from '../custom/fileUpload';
import useReloadState from '@/hooks/useReload';

const formSchema = z.object({
    name: z.string().min(3, {
        message: 'file name is required',
    }),
    fileUrl: z.string().min(1, {
        message: 'file url is required',
    }),
});


export default function AddProjectFile() {
    const { isOpen, onClose, data, type, onOpen } = useModal();
    const isModalOpen = isOpen && type === 'addFile';
    const { projectId } = data
    const {ReloadPage} = useReloadState()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: "",
            name: ""
        },
    });

    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(true);
    const [fileType, setFileType] = useState("");

    const handleClose = () => {
        onClose();
    };

    useEffect(() => {
        const checkiffileuploadedandopeninput = () => {
            const file = form.getValues("fileUrl")
            if (file.length > 5 ) {
                setSubmitLoading(false)
            }
        }
        checkiffileuploadedandopeninput()
    }, [form.getValues("fileUrl")])


    const onSubmit = async (
        values: z.infer<typeof formSchema>
    ) => {
        try {
            const data = { projectId, fileType, ...values }
            await axios.post('/api/files', data);
            onClose()
            //@eslint-disable-next-line
            ReloadPage()
        } catch (err) {
            console.log(err)
        }
    };

    const loadingState = form.formState.isSubmitting

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="overflow-hidden">
                <DialogHeader>
                    <DialogTitle>Add a file</DialogTitle>
                    <DialogDescription className='text-sm'>
                        add a file to the project.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="space-y-5">
                            <FormField
                                control={form.control}
                                name="fileUrl"
                                render={({ field }) => (
                                    <FormItem className="flex justify-center">
                                        <FormControl className=" ">
                                            <FileUpload
                                                endpoint="projectFile"
                                                value={field.value}
                                                onChange={field.onChange}
                                                setFileType={setFileType}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            File name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading || submitLoading}
                                                placeholder=""
                                                //className="bg-zinc-300/10 border-0 focus-visible:ring-0 text-black dark:text-slate-200 font-semibold focus-visible:ring-offset-0"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormDescription>
                                            what is the file name
                                        </FormDescription>
                                        <FormMessage className="font-semibold text-red-500" />
                                    </FormItem>
                                )}
                            ></FormField>

                        </div>
                        <DialogFooter>
                            <Button
                                className="font-bold disabled:bg-slate-300"
                                variant="default"
                                disabled={loading || submitLoading || loadingState}
                            >
                                Add File
                            </Button>
                        </DialogFooter>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}
