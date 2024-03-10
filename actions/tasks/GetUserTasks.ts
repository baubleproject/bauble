"use server"
import { db } from '@/lib/db';
import { currentProfile } from '../currentProfile';
import { NextResponse } from 'next/server';

export async function getUserTasks() {
    try {
        const profile = await currentProfile()

        const members = await db.member.findMany({
            where: {
                profileId: profile?.id
            }
        })

        const allTasks = []

        for (const member of members) {
            const tasks = await db.task.findMany({
                where: {
                    memberId: member?.id
                },
                include: {
                    project: true
                }
            })
            allTasks.push(...tasks)
        }
        return allTasks
    } catch (err) {
        console.log("SERVER ACTION GET USER TASKS", err)
        return null
    }
}
