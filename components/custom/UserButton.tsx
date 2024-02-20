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
import { cn, truncateText } from "@/lib/utils";
import { useModal } from "@/hooks/useModalStore";

interface UserButtonProps {
    Triggerclass?: string
}

export function UserButton({ Triggerclass }: UserButtonProps) {
    const { onOpen } = useModal()
    const [profile, setProfile] = useState<Profile | null>(null);

    // if (!profile) {
    //     return null
    // }

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

    const ProfileOnClick = () => {
        router.push(`/profile/${profile?.id}`)
    }

    const CreateProject = () => {
        onOpen("createProject")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="cursor-pointer rounded-full w-7 h-7 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${profile?.imageUrl})` }}></div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <div className="w-full h-32 flex flex-col items-center justify-center">
                    <div className="cursor-pointer rounded-full w-9 h-9 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${profile?.imageUrl})` }}></div>
                    <p className="font-normal text-sm">My Account</p>
                    <p className="font-light text-xs"> {truncateText(profile?.email!, 22)}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={ProfileOnClick}>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>Project</DropdownMenuItem>
                    <DropdownMenuItem onClick={CreateProject}>
                        Create new Project
                    </DropdownMenuItem>

                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>Email</DropdownMenuItem>
                                <DropdownMenuItem>Invite code</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onSignOut} className="cursor-pointer hover:bg-red-300 dark:hover:bg-red-300 dark:hover:text-zinc-900">
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

