"use client";
import { initialProfile } from "@/actions/InitialProfile";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Profile } from "@prisma/client";
import Support from "./_components/Suppport";
import { Land } from "./_components/Land";

export default function Home() {
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userProfile = await initialProfile();
                setProfile(userProfile);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, []);

    // if(profile){
    //     return redirect("/dashboard")
    // }

    return (
        <main className="flex items-center flex-col justify-center space-y-16 md:space-y-3">
            <Land profile={profile} />
            <Support />
        </main>
    );
}
