"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuShortcut
} from "@/components/ui/dropdown-menu"
import { Profile } from "@prisma/client"
import { initialUserCreation } from "@/lib/ClerkAuthTools"

export function UserButtonDropDown() {

    const [profile, setProfile] = React.useState<Profile | null>(null)
    React.useEffect(() => {
        const getProfile = async () => {
            const profile = await initialUserCreation();
            if (profile) {
                setProfile(profile)
            }
        }
        getProfile()
    }, [])

    if (!profile) {
        return null
    }

    //<img src={profile.profileImageUrl} className="w-full h-full" />
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="h-9 w-9 bg-black rounded-lg bg-center bg-contain"
                    style={{
                        backgroundImage: `url(${profile.profileImageUrl})`
                    }}
                >

                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    Profile
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

