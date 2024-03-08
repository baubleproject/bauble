"use server"
import { type Project } from '@prisma/client';
import { db } from '@/lib/db';
import { currentProfile } from './currentProfile';

interface TaskProps {
    id: string
}

export async function getTasksById({ id }: TaskProps) {
    try {
        console.log(id)
        const tasks = await db?.task.findFirst({
            where: {
                id
            },
            include: {
                assignedTo: {
                    include: {
                        profile: true
                    }
                },
                // comments: {
                //     include: {
                //         author: true
                //     }
                // }
            }
        })
        return tasks
    } catch (err) {
        console.log("SERVER ACTION GETTASKBYID",err)
        return null
    }
}
