import { currentProfile } from "@/actions/currentProfile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server"

export async function DELETE(req: Request, { params }: { params: { fileId: string } }
) {
    try {

        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse('Unauthorized', {
                status: 401,
            });
        }

        const file = await db.file.findFirst({
            where: {
                id: params.fileId,
            },
        });
        if (!file) {
            return new NextResponse('File not found', {
                status: 404,
            });
        }

        //TODO: check if the user that wants to delete the file is an admin

        const member = await db.member.findFirst({
            where: {
                profileId: profile.id,
                projectId: file.projectID
            }
        })

        if (member?.role != MemberRole.ADMIN) {
            return new NextResponse("Only admins can create tasks", { status: 401 })
        }

        //TODO:----------------------------------------------------------------
        const utapi = new UTApi();
        const newUrl = file.fileUrl.substring(file.fileUrl.lastIndexOf("/") + 1);
        await utapi.deleteFiles(newUrl)

        await db.file.delete({
            where: {
                id: params.fileId
            }
        })

        return NextResponse.json(file);

    } catch (error) {

        console.log('[FILE ID DELETE]', error);
        return new NextResponse('Internal Server Error', {
            status: 500,
        });

    }
}
