import { Member, MemberRole, Task } from '@prisma/client'

export type MemberandProfile = ({
    profile: {
        id: string;
        userId: string;
        firstname: string;
        lastname: string;
        imageUrl: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: string;
    role: MemberRole;
    profileId: string;
    createdAt: Date;
    updatedAt: Date;
    projectId: string;
})[]


