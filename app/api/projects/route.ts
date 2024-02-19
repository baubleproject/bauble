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

        console.log(name, description)

        const project = await db.project.create({
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
        console.log("Created", project)
        return NextResponse.json(project)
    } catch (err) {
        console.log("[TEAMS POST ENDPOINT:]", err)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(_req: Request) {
    try {
        const profile = await currentProfile()
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        const projects = await db.project.findMany({
            where: {
                members: {
                    some: {
                        profileId: profile?.id,


                    }
                }
            },
        })
        return NextResponse.json(projects)
    } catch (err) {
        console.log("[TEAMS POST ENDPOINT:]", err)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
