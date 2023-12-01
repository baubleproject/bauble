import { currentUser, redirectToSignIn, redirectToSignUp } from '@clerk/nextjs';
//import { type Profile } from '@prisma/client';
//import { db } from './db';

export async function isSignedIn(): Promise<boolean> {
    const user = await currentUser(); // get the current user
    if (!user) {
        return false;
    }

    return true
}

// export async function initialProfile(): Promise<Profile> {
//     const user = await currentUser(); // get the current user
//     if (!user) {
//         //INFO: then redirect the user to signin
//         return redirectToSignUp();
//     }
//     const profile = await db.profile.findUnique({
//         where: {
//             userId: user.id,
//         },
//     });
//     if (profile) {
//         //INFO: if the user has a profile
//         return profile;
//     }
//     //INFO: else create a new profile
//     const newProfile = await db.profile.create({
//         data: {
//             userId: user.id,
//             name: `${user.firstName} ${user.lastName}`,
//             imageUrl: user.imageUrl,
//             email: user.emailAddresses[0].emailAddress,
//         },
//     });
//     return newProfile; // done
// }
