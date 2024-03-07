import { $Enums, Member, MemberRole, Task } from '@prisma/client'

export type TasksandAssignedTo = {
    assignedTo: {
        id: string;
        role: $Enums.MemberRole;
        profileId: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
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

    } | null;
} & Task 
