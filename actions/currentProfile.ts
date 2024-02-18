import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';

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
        return null
    }

    return profile;
};
