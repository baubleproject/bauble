//NOTE: sii this is fake code, to remove the vercel error and to stop the file issue in filetree, you grab
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
        return NextResponse.json({ status: 200 });

    } catch (error) {
        console.error('[SERVER CHANGE STATUS ERROR]', error);
        return new NextResponse('Internal Server Error', {
            status: 500,
        });
    }
}

