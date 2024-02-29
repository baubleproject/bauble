"use server"
import { type Project } from '@prisma/client';
import { db } from '@/lib/db';
import { currentProfile } from './currentProfile';

interface ProjectMembers {
    id: string
    task?: boolean
}

export async function getProjectTasks({ id, task = false }: ProjectMembers) {
    try {
        const tasks = await prisma?.task.findMany({
            where: {
                projectId: id
            }
        })
        return tasks
    } catch (err) {
        console.log(err)
        return null
    }
}
