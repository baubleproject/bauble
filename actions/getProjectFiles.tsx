"use server"
import { type Project } from '@prisma/client';
import { db } from '@/lib/db';
import { currentProfile } from './currentProfile';

interface TaskProps {
    projectId: string
    take?: number
}

export async function getProjectFiles({ projectId, take }: TaskProps) {
    try {
        const files = await db.file.findMany({
            where: {
                projectID: projectId
            },
            take: take ? take : undefined
        })
        return files
    } catch (err) {
        console.log("SERVER ACTION GET PROJECT FILES", err)
        return null
    }
}
