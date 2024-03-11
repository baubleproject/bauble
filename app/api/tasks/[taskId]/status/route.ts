import { currentProfile } from '@/actions/currentProfile';
import { db } from '@/lib/db';
import { MemberRole } from '@prisma/client';
import { NextResponse } from 'next/server';
export async function PUT(
    req: Request,
    { params }: { params: { taskId: string } }
) {
    try {
        const { status } = await req.json()


        //get the profile of the person
        const profile = await currentProfile()
        //get the task
        const task = await db.task.findFirst({
            where: {
                id: params.taskId
            },
            include: {
                project: true
            }
        })
        //get the member profile of the person with the project
        const member = await db.member.findFirst({
            where: {
                profileId: profile?.id,
                projectId: task?.project.id
            }
        })
        //check if the user is an admin or the person assigned to the task

        if (member?.role != MemberRole.ADMIN || task?.memberId != member.id) {
            return new NextResponse("Only admins can create tasks", { status: 401 })
        }
        //change the task status
        await db.task.update({
            where: {
                id: task?.id
            },
            data: {
                status: status
            }
        })

        return NextResponse.json({ status: 200 })
    } catch (error) {
        console.error('[SERVER CHANGE STATUS ERROR]', error);
        return new NextResponse('Internal Server Error', {
            status: 500,
        });
    }
}
