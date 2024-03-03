import { currentProfile } from '@/actions/currentProfile';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
export async function GET(
    req: Request,
    { params }: { params: { projectid: string } }
) {
    try {
        const server = await db.member.findMany({
            where: {
                projectId: params.projectid
            },
            include: {
                profile: true
            }
        })
        return NextResponse.json(server);
    } catch (error) {
        console.error('[SERVER ERROR]', error);
        return new NextResponse('Internal Server Error', {
            status: 500,
        });
    }
}
