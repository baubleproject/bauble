"use client"
import { isSignedIn } from "@/lib/ClerkAuthTools";
import { NavBarButton } from "./NavBarButton";
import { ModeToggle } from '@/components/custom/themeToggle'
import { useEffect, useState } from "react";
import { UserButtonDropDown } from "./UserButton";

type buttonClick = "signin" | "home"

interface NavBarType {
    transparent?:boolean
    fixed?: boolean;
    light?: boolean
}

export function NavBar({
    transparent = false,
    fixed = false ,
    light = false
    }:NavBarType) {

    const [isSigned, setIsSigned] = useState(false)

    useEffect(() => {
        const checkiIfSigned = async () => {
            const isSigned = await isSignedIn()
            if (isSigned) {
                setIsSigned(true)
            }
        }
        checkiIfSigned()
    }, [])

    return (
        <nav className={`hidden md:flex h-16 w-full ${transparent ? "bg-transparent":"bg-slate-300 dark:bg-slate-700"} ${fixed ? "fixed":""} justify-between items-center px-6 z-30 ${light ? "text-white":"" }`}>
            <div className="font-extrabold text-3xl -tracking-[0.13em]">Novus</div>
            <div className="w-2/3">
                <ul className="flex justify-center gap-3 font-light [&>*]:cursor-pointer [&>*]:-tracking-widest">
                    <li className="hover:underline transition">Explore</li>
                    <li className="hover:underline transition">Search</li>
                    {isSigned ? <li className="hover:underline transition">Library</li> : null}
                </ul>
            </div>
            <div className="flex gap-2 items-center">
                <UserButtonDropDown />
                <ModeToggle />
                <NavBarButton />
            </div>
        </nav>
    )
}
