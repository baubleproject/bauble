import { db } from '@/lib/db';
import { currentProfile } from '@/actions/currentProfile';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { comment, taskId } = await req.json()
        console.log("THIS RIGHT HERE", comment, taskId)
        const profile = await currentProfile()

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const task = await db?.task.findUnique({
            where: {
                id: taskId
            }
        })

        console.log("THE TASK:", task)

        if (!task) {
            return new NextResponse("Task is not available", { status: 401 })
        }

        await db?.comment.create({
            data: {
                content: comment,
                task: {
                    connect: {
                        id: task.id
                    }
                },
                author: {
                    connect: {
                        id: profile.id
                    }
                }
            }
        })
        return NextResponse.json({ status: 200 })
    } catch (err) {
        console.log("[ROUTE COMMENT POST ENDPOINT:]", err)
        return new NextResponse(`Internal Error ${err}`, { status: 500 })
    }
}
