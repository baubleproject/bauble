import { db } from '@/lib/db';
import { currentProfile } from '@/actions/currentProfile';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from "uuid"
import { MemberRole } from '@prisma/client';

export async function POST(req: Request) {
    try {
        const { name, description } = await req.json()
        const profile = await currentProfile()

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const team = await db.team.create({
            data: {
                createdBy: profile.id,
                name,
                description,
                inviteCode: uuidv4(),
                members: {
                    create: [
                        { profileId: profile.id, role: MemberRole.ADMIN }
                    ]
                }
            }
        })
        return NextResponse.json(team)
    } catch (err) {
        console.log("[SERVER POST ENDPOINT:]", err)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
