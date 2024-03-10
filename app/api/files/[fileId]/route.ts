import { currentProfile } from "@/actions/currentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

import { UTApi } from "uploadthing/server"

export const utapi = new UTApi();
export async function DELETE(req: Request, { params }: { params: { fileId: string } }
) {
    try {

        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse('Unauthorized', {
                status: 401,
            });
        }
        console.log(params.fileId)
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
