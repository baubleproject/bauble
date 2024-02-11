import { currentUser, redirectToSignIn, redirectToSignUp } from '@clerk/nextjs';
import { type Profile } from '@prisma/client';
import { db } from '@/lib/db';

export async function initialProfile(): Promise<Profile | null> {
    const user = await currentUser(); // get the current user
    if (!user) {
        //INFO: then redirect the user to signin
        return null;
    }
    const profile = await db.profile.findUnique({
        where: {
            userId: user.id,
        },
    });
    if (profile) {
        //INFO: if the user has a profile
        return profile;
    }
    //INFO: else create a new profile
    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            firstname: user?.firstName!,
            lastname: user?.lastName!,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,
        },
    });
    return newProfile; // done
}

export type ProfileType = Awaited<ReturnType<typeof initialProfile>>;
