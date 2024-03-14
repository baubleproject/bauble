import { currentProfile } from '@/actions/currentProfile';
import { db } from '@/lib/db';
import { MemberRole } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function PUT(
    req: Request,
    { params }: { params: { memberId: string } }
) {
    try {
        const { role } = await req.json();

        // Get the profile of the person
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse('Profile not found', { status: 404 });
        }

        // Get the task
        const member = await db.member.findFirst({
            where: {
                id: params.memberId
            },
            include: {
                project: true
            }
        });
        if (!member) {
            return new NextResponse('Member not found', { status: 404 });
        }

        // Get the member profile of the person with the project
        const ourMember = await db.member.findFirst({
            where: {
                profileId: profile.id,
                projectId: member?.project?.id
            },
            include: {
                profile: true
            }
        });
        console.log(ourMember)
        console.log("THE  MEMBER:", member)
        if (!member) {
            return new NextResponse('Member not found', { status: 404 });
        }

        // Check if the user is an admin or the person assigned to the task
        if (ourMember?.role == MemberRole.ADMIN) {
            // Change the task status
            await db.member.update({
                where: {
                    id: member.id
                },
                data: {
                    role
                }
            });
            return NextResponse.json({ status: 200 });
        } else {
            return new NextResponse('Only admins or the assigned member can change member role', { status: 401 });
        }

    } catch (error) {
        console.error('[SERVER CHANGE STATUS ERROR]', error);
        return new NextResponse('Internal Server Error', {
            status: 500,
        });
    }
}

