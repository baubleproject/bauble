import { currentProfile } from "@/actions/currentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { fileId: string } }
) {
    try {

        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse('Unauthorized', {
                status: 401,
            });
        }
        const task = await db.task.delete({
            where: {
                id: params.fileId,
            },
        });
        console.log(task)
        if (!task) {
            return new NextResponse('Internal Server Error', {
                status: 500,
            });
        }
        return NextResponse.json(task);

    } catch (error) {

    }
}
