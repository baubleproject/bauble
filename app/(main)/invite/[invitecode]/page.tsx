import { currentProfile } from '@/actions/currentProfile';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { db } from '@/lib/db';

interface InviteCodePageProps {
    params: {
        invitecode: string;
    };
}

async function page({ params }: InviteCodePageProps) {
    const profile = await currentProfile();
    if (!profile) {
        toast.error(
            'You are unauthorized',
        );
        return redirectToSignIn();
    }
    if (!params.invitecode) {
        toast.error(
            'Invite code not available',
        );
        return redirect('/');
    }
    const existingproject = await db.project.findFirst({
        where: {
            inviteCode: params.invitecode,
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    });

    if (existingproject) {
        return redirect(`/project/${existingproject.id}`);
    }

    const project = await db.project.update({
        //@ts-ignore
        where: {
            inviteCode: params.invitecode,
        },
        data: {
            members: {
                create: [
                    {
                        profileId: profile.id,
                    },
                ],
            },
        },
    });

    toast.success(`welcome to ${project.name}`)

    if (project) {
        return redirect(`/project/${project.id}`);
    }


    return null;
}

export default page;
