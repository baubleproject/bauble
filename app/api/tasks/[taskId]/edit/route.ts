import { currentProfile } from '@/actions/currentProfile';
import { db } from '@/lib/db';
import { MemberRole } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function PUT(
    req: Request,
    { params }: { params: { taskId: string } }
) {
    try {
        const { status, name } = await req.json();

        // Get the profile of the person
        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse('Profile not found', { status: 404 });
        }

        // Get the task
        const task = await db.task.findFirst({
            where: {
                id: params.taskId
            },
            include: {
                project: true
            }
        });
        if (!task) {
            return new NextResponse('Task not found', { status: 404 });
        }

        // Get the member profile of the person with the project
        const member = await db.member.findFirst({
            where: {
                profileId: profile.id,
                projectId: task.project?.id
            },
            include: {
                profile: true
            }
        });
        console.log(member)
        console.log("THE TASK:", task)
        if (!member) {
            return new NextResponse('Member not found', { status: 404 });
        }

        // Check if the user is an admin or the person assigned to the task
        if (member.role == MemberRole.ADMIN || task.memberId == member.id) {
            // Change the task status
            await db.task.update({
                where: {
                    id: task.id
                },
                data: {
                    status: status,
                    name: name
                }
            });
            return NextResponse.json({ status: 200 });
        } else {
            return new NextResponse('Only admins or the assigned member can change task status', { status: 401 });
        }

    } catch (error) {
        console.error('[SERVER CHANGE STATUS ERROR]', error);
        return new NextResponse('Internal Server Error', {
            status: 500,
        });
    }
}

