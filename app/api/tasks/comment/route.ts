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

        const member = await db.member.findFirst({
            where: {
                profileId: profile.id
            }
        })

        if (!member) {
            return new NextResponse("Unauthorized", { status: 401 })
        }


        const task = await db?.task.findUnique({
            where: {
                id: taskId
            }
        })


        if (!task) {
            return new NextResponse("Task is not available", { status: 401 })
        }

        console.log("THE TASK POSITION CHANGED:", task)
        //@ts-ignore
        await db.comment.create({
            data: {
                content: comment,
                taskID: task.id,
                authorId: member.id
            }
        })
        return NextResponse.json({ status: 200 })
    } catch (err) {
        console.log("[ROUTE COMMENT POST ENDPOINT:]", err)
        return new NextResponse(`Internal Error ${err}`, { status: 500 })
    }
}
