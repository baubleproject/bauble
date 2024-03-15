import { currentProfile } from '@/actions/currentProfile';
import { db } from '@/lib/db';
import { MemberRole } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function DELETE(
    req: Request,
    { params }: { params: { memberId: string } }
) {
    try {
        // Get the profile of the person
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse('Profile not found', { status: 404 });
        }

        // Get the task
        const kickee = await db.member.findFirst({
            where: {
                id: params.memberId
            },
            include: {
                project: true
            }
        });

        if (!kickee) {
            return new NextResponse('Member not found', { status: 404 });
        }

        const kickTfOut = async () => {
            try {
                await db.member.delete({
                    where: {
                        id: kickee.id,
                        projectId: kickee.project.id
                    }
                })
            } catch (error) {

            }
        }

        //get the kicker profile 
        const kicker = await db.member.findFirst({
            where: {
                profileId: profile.id,
                projectId: kickee.project.id
            }
        })

        //is the kicker an administrator
        if (kicker?.role != MemberRole.ADMIN) {
            return new NextResponse("Only admins can kick out", { status: 401 })
        }

        //is the kickee the project leader
        if (kickee.project.createdBy == kickee.id) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        //is the kickee an administrator
        if (kicker?.role == MemberRole.ADMIN && kickee?.role != MemberRole.ADMIN) {
            kickTfOut()
        }
        return NextResponse.json({ status: 200 });

    } catch (error) {
        console.error('[SERVER CHANGE STATUS ERROR]', error);
        return new NextResponse('Internal Server Error', {
            status: 500,
        });
    }
}

