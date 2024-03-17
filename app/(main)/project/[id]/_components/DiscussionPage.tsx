
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Textarea } from '@/components/ui/textarea';
import { Button } from "@/components/ui/button";
import { zodResolver } from '@hookform/resolvers/zod'
import { Project } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from "axios";



interface DiscussionProps {
    project: Project
}

const FormSchema = z.object({
    comment: z
        .string()
        .min(3, {
            message: "comment must be at least 3 characters.",
        })
        .max(100, {
            message: "comment must not be longer than 100 characters.",
        }),
})


export default function DiscussionPage({ project }: DiscussionProps) {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const [messages, setMessages] = useState([])

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`/api/projects/${project.id}/messages`);
                setMessages(response.data.messages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages(); // Fetch initial messages
    }, [project]);

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        console.log(onSubmit)
        const response = await axios.post(`/api/projects/${project.id}/messages`)
        const newMessages = response.data.messages;
        //@ts-ignore //i dont have enrgy for this right now
        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        form.reset()
    }

    return (
        <div className='w-full h-[90%] md:h-[70%] flex flex-col'>
            <p className='text-lg -tracking-wide'>Discussions for the {project.name} project</p>
            <div className='flex-1 '></div>
            <div className="py-3">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full gap-3 flex flex-col md:flex-row items-center">
                        <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                                <FormItem className="w-full md:w-[90%]">
                                    <FormControl>
                                        <Textarea
                                            placeholder="Type a message"
                                            className="resize-none w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="flex-1 h-full self-end" type="submit">Submit</Button>
                    </form>
                </Form>

            </div>
        </div>
    )
}
