import { currentProfile } from '@/actions/currentProfile';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function PATCH(
    req: Request,
    { params }: { params: { projectid: string } }
) {
    try {
        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse('Unauthorized', {
                status: 401,
            });
        }
        if (!params.projectid) {
            return new NextResponse(
                'Server ID is missing',
                { status: 400 }
            );
        }
        const server = await db.project.update({ // WARN: only project owners or admin can reset the invite id
            where: {
                id: params.projectid,
                createdBy: profile.id,
            },
            data: {
                inviteCode: uuidv4(),
            },
        });
        return NextResponse.json(server);
    } catch (error) {
        console.error('[SERVER ERROR]', error);
        return new NextResponse('Internal Server Error', {
            status: 500,
        });
    }
}
