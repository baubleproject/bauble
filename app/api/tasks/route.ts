import { db } from '@/lib/db';
import { currentProfile } from '@/actions/currentProfile';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const response = await req.json()
        console.log(response)
        const { name, description, projectId, priority, to, from, memberId } = response

        const profile = await currentProfile()

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const project = await prisma?.project.findUnique({
            where: {
                id: projectId
            }
        })

        if (!project) {
            return new NextResponse("Project is not available", { status: 401 })
        }

        if (project.createdBy != profile.id) {
            return new NextResponse("A task can only be created by an admin in the team", { status: 401 })
        }

        await db.task.create({
            data: {
                name,
                description,
                priority,
                start: to,
                end: from,
                // assignedTo: {
                //     connect: {
                //         id: memberId ? memberId.toString : null
                //     }
                // },
                project: {
                    connect: {
                        id: projectId
                    }
                }
            }
        })

        return NextResponse.json({ status: 200 })
    } catch (err) {
        console.log("[ROUTE POST ENDPOINT:]", err)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
