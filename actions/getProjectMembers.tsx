"use server"
import { type Project } from '@prisma/client';
import { db } from '@/lib/db';
import { currentProfile } from './currentProfile';

interface TaskProps {
    id: string
}

export async function getProjectMembers({ id }: TaskProps) {
    try {
        const members = await db.member.findMany({
            where: {
                projectId: id
            },
            include: {
                profile: true
            }
        })
        return members
    } catch (err) {
        console.log("SERVER ACTION GET PROJECT MEMBERS", err)
        return null
    }
}

export async function getMember({ id }: TaskProps) {
    try {
        //const profile = await currentProfile()
        const members = await db.member.findFirst({
            where: {
                id: id,
            },
            include: {
                profile: true
            }
        })
        return members
    } catch (err) {
        console.log("SERVER ACTION GET PROJECT MEMBERS", err)
        return null
    }
}

export type MemberwithProfile = Awaited<ReturnType<typeof getMember>>
