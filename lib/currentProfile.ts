// import { auth } from '@clerk/nextjs';
//
// import { db } from './db';
// import { toast } from '@/components/ui/use-toast';
//
// export const currentProfile = async () => {
//     const { userId } = auth();
//     if (!userId) {
//         return null;
//     }
//     let profile;
//     try {
//         profile = await db.profile.findUnique({
//             where: {
//                 userId,
//             },
//         });
//     } catch (error) {
//         console.error(error, ': Error in Current Profile Function!');
//     }
//
//     if (!profile) {
//         //     toast({
//         //         description: 'No current profile found',
//         //     });
//     }
//
//     return profile;
// };
