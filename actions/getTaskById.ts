"use server"
import { type Project } from '@prisma/client';
import { db } from '@/lib/db';
import { currentProfile } from './currentProfile';

interface TaskProps {
    id: string
}

export async function getTasksByIdSimple({ id }: TaskProps) {
    try {
        const tasks = await db?.task.findFirst({
            where: {
                id
            },
        })
        return tasks
    } catch (err) {
        console.log("SERVER ACTION GETTASKBYID", err)
        return null
    }
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
                comments: {
                    include: {
                        author: {
                            include: {
                                profile: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return tasks
    } catch (err) {
        console.log("SERVER ACTION GETTASKBYID", err)
        return null
    }
}


export type TaskType = Awaited<ReturnType<typeof getTasksById>>

export async function getPlentyTasksById({ id }: TaskProps) {
    try {
        console.log(id)
        const tasks = await db?.task.findMany({
            where: {
                projectId:id
            },
            include: {
                assignedTo: {
                    include: {
                        profile: true
                    }
                },
                comments: {
                    include: {
                        author: {
                            include: {
                                profile: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return tasks
    } catch (err) {
        console.log("SERVER ACTION GETTASKBYID", err)
        return null
    }
}
