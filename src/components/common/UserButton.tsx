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
    DropdownMenuShortcut,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Profile } from "@prisma/client"
import { initialUserCreation } from "@/lib/ClerkAuthTools"
import { useClerk } from "@clerk/clerk-react"
import { useRouter } from 'next/navigation'

export function UserButtonDropDown() {

    const router = useRouter()
    const {signOut}  = useClerk()
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
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                onClick={() => signOut(() => router.push("/"))}
                className="bg-red-200 dark:bg-red-500 hover:bg-red-800  font-bold">
                    Log Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

