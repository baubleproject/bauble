"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from 'next/navigation'

import { } from "@clerk/nextjs"
import { initialProfile } from "@/actions/InitialProfile";
import { useEffect, useState } from "react";
import { Profile } from "@prisma/client";
import { cn } from "@/lib/utils";

interface UserButtonProps {
    Triggerclass: string
}

export function UserButton({ Triggerclass }: UserButtonProps) {

    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userProfile = await initialProfile();
                setProfile(userProfile);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, []);


    const router = useRouter()
    const { signOut } = useClerk();
    const onSignOut = () => {
        signOut(() => {
            router.push("/signout")
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="cursor-pointer rounded-full w-7 h-7 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${profile?.imageUrl})` }}></div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Billing
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>Email</DropdownMenuItem>
                                <DropdownMenuItem>Message</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>More...</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                        New Team
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>GitHub</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuItem disabled>API</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onSignOut}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

