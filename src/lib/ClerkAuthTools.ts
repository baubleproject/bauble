import { currentUser, redirectToSignIn, redirectToSignUp, auth } from '@clerk/nextjs';
import { Profile } from '@prisma/client';
//import { type Profile } from '@prisma/client';
import { db } from './db';

const currentStockHeader = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3WBnhBqWlX6sjz13AuPkLrK76fgqw7JwpFkjyWljIuw&s"

export async function isSignedIn(): Promise<boolean> {
    const user = await currentUser(); // get the current user
    if (!user) {
        return false;
    }
    return true
}

export async function initialUserCreation(): Promise<Profile> {
    const user = await currentUser(); // get the current user
    if (!user) {
        return redirectToSignIn()
    }
    const profile = await db.profile.findUnique({
        where: {
            userId: user.id
        }
    })
    if (profile) {
        return profile;
    }
    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            profileImageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,
            headerImageUrl: currentStockHeader
        }
    })
    return newProfile
}

export const currentProfile = async () => {
    const { userId } = auth();
    if (!userId) {
        return null;
    }
    let profile;
    try {
        profile = await db.profile.findUnique({
            where: {
                userId,
            },
        });
    } catch (error) {
        console.error(error, ': Error in Current Profile Function!');
    }

    if (!profile) {
        //     toast({
        //         description: 'No current profile found',
        //     });
    }

    return profile;
};
