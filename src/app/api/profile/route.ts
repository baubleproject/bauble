import { currentProfile, isSignedIn } from "@/lib/ClerkAuthTools";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export default async function POST(req: Request) {
    try {
        const profile = await currentProfile()
        const isUserSignedIn = await isSignedIn()
        const { name, bio } = await req.json()

        if (!isUserSignedIn || !profile) {
            return new NextResponse("Unauthorised", { status: 401 })
        }

        const newProfile = await db.profile.update({
            where: {
                userId: profile.userId
            },
            data: {
                name: name,
                bio: bio
            }
        })

        return NextResponse.json(newProfile)

    } catch (e) {
        console.error("POST PROFILE ERRROR", e)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
