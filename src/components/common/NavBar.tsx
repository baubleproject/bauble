"use client"
import { NavBarButton } from "./NavBarButton";
import { ModeToggle } from '@/components/custom/themeToggle'

type buttonClick = "signin" | "home"

export function NavBar() {
    return (
        <nav className="hidden md:flex h-16 bg-slate-300 dark:bg-slate-700 justify-between items-center px-6">
            <div className="font-extrabold text-3xl -tracking-[0.13em]">Novus</div>
            <div className="w-2/3">
                <ul className="flex justify-center gap-3 font-light [&>*]:cursor-pointer [&>*]:-tracking-widest">
                    <li className="hover:underline transition">Explore</li>
                    <li className="hover:underline transition">Search</li>
                </ul>
            </div>
            <div className="flex gap-2">
                <ModeToggle />
                <NavBarButton />
            </div>

        </nav>
    )
}
