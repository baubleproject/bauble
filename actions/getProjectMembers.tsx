"use server"
import { type Project } from '@prisma/client';
import { db } from '@/lib/db';
import { currentProfile } from './currentProfile';

interface ProjectMembers {
    id: string
    task?: boolean
}

export async function getProjectMembers({ id, task = false }: ProjectMembers) {
    try {

        const projects = await db.project.findMany({
            where: {
                id
            },
            include: {
                members: true
            }
        })

        return projects

    } catch (error) {

    }

}
