import { db } from '@/lib/db';
import { currentProfile } from '@/actions/currentProfile';
import { NextResponse } from 'next/server';
import { MemberRole } from '@prisma/client';

export async function POST(req: Request) {
    try {
        const response = await req.json()
        const { name, description, projectId, priority, to, from, assignedTo } = response

        const profile = await currentProfile()

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const project = await db?.project.findUnique({
            where: {
                id: projectId
            }
        })

        if (!project) {
            return new NextResponse("Project is not available", { status: 401 })
        }

        // if (project.createdBy != profile.id) {
        //     return new NextResponse("A task can only be created by an admin in the team", { status: 401 })
        // }

        const member = await db.member.findFirst({
            where:{
                profileId:profile.id,
                projectId:project.id
            }
        })

        if (member?.role != MemberRole.ADMIN){
            return new NextResponse("Only admins can create tasks", { status: 401 })
        }

        await db.task.create({
            data: {
                name,
                description,
                priority,
                start: from,
                end: to,
                //memberId: assignedTo,
                assignedTo: {
                    connect: {
                        id: assignedTo
                    }
                },
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
        return new NextResponse(`Internal Error ${err}`, { status: 500 })
    }
}
