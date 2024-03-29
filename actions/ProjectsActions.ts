"use server"
import { type Project } from '@prisma/client';
import { db } from '@/lib/db';
import { currentProfile } from './currentProfile';

interface ProjectsProps {
    limit?: number
}

export async function getProjects({ limit }: ProjectsProps){
    const profile = await currentProfile()
    if (!profile) {
        return null
    }
    const projects = await db.project.findMany({
        where: {
            members: {
                some: {
                    profileId: profile?.id,


                }
            },
        },
        include: {
            tasks: true
        },
        take: limit ? limit : 6,
        orderBy: {
            createdAt: "desc"
        }
    })
    return projects
}

