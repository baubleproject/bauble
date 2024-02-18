"use server"
import { db } from '@/lib/db';
import { initialProfile } from './InitialProfile';

export const fetchTeams = async () => {
    const profile = await initialProfile()
    const teams = await db.team.findMany({
        where: {
            members: {
                some: {
                    profileId: profile?.id,

                    
                }
            }
        },
    });
    return teams
}


