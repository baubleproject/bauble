"use server"
import { type Project } from '@prisma/client';
import { db } from '@/lib/db';
import { currentProfile } from './currentProfile';

interface ProjectMembers {
    id: string
    task?: boolean
}

export async function getProject({ id, task = false }: ProjectMembers) {
    try {
        const project = await db.project.findUnique({
            where: {
                id
            }
        })
        return project
    } catch (err) {
        console.log(err)
        return null
    }
}
