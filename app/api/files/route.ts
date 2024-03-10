import { db } from '@/lib/db';
import { currentProfile } from '@/actions/currentProfile';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const data = await req.json()

        const {
            name,
            fileUrl,
            projectId,
            fileType,
        } = data

        const profile = await currentProfile()

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const file = await db.file.create({
            data: {
                name,
                fileUrl,
                projectID: projectId,
                //type: fileType
            }
        })



        return NextResponse.json(file)
    } catch (err) {
        console.log("[TEAMS POST ENDPOINT:]", err)
        return new NextResponse("Internal Error", { status: 500 })
    }
}


