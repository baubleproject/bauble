"use client"
//import { Logo } from "@/components/logo";
import { initialProfile } from "@/actions/InitialProfile";
import { DropdownMenuDemo } from "@/components/custom/Demo";
import Logo from "@/components/custom/Logo";
import { UserButton } from "@/components/custom/UserButton";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";
import React from "react";

export const Navbar = async () => {
    const profile = await initialProfile()
    return (
        <div className="fixed top-0 w-full h-14 px-4 border-b border-transparent shadow-sm dark:bg-black bg-white flex items-center">
            <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between ">
                <div className="flex-1">Hello</div>
                <div className="flex-1 space-x-4  flex flex-row items-center justify-end w-full ">
                    <Button
                        className=" bg-myPrimary hover:bg-green-900 transition"
                        size="sm"
                        asChild
                    >
                        <Link href="/signup">
                            {profile ? ("Go to Dashboard") : ("Get Bauble for free")}
                        </Link>
                    </Button>
                    {
                        !profile ? (null) : (
                                <UserButton />
                        )
                    }
                    <DropdownMenuDemo />
                    {profile ? (null) : (
                        <Button size="sm" variant="outline" asChild>
                            <Link href="/signin">Login</Link>
                        </Button>
                    )
                    }

                </div>
            </div>
        </div>
    );
};
