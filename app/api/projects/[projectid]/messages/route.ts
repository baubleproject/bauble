import { currentProfile } from "@/actions/currentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
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
        const messages = await db.message.findMany({
            where: {
                projectID: params.projectid
            },
        });
        return NextResponse.json({ messages });
    } catch (error) {
        console.error('[SERVER GET MESSAGE ERROR]', error);
        return new NextResponse('Internal Server Error', {
            status: 500,
        });
    }
}

export async function POST(
    req: Request,
    { params }: { params: { projectid: string } }
) {
    try {
        const { message } = await req.json()
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
        await db.message.create({
            data: {
                content: message,
                projectID: params.projectid,
                authorId: profile.id
            }
        });
        const messages = await db.message.findMany({
            where: {
                projectID: params.projectid
            },
        });
        return NextResponse.json({ messages });
    } catch (error) {
        console.error('[SERVER GET MESSAGE ERROR]', error);
        return new NextResponse('Internal Server Error', {
            status: 500,
        });
    }
}


