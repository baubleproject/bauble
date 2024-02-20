"use client";
import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import Link from "next/link";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { poppins as textFont } from "@/lib/font";
import { Profile } from "@prisma/client";

//svgs
// import avatar1 from "../../public/images/avatar1.svg";
// import avatar2 from "../../public/images/avatar2.svg";
// import avatar3 from "../../public/images/avatar3.svg";
// import Svg from "@/components/custom/Svg";

const headingFont = localFont({
    src: "../../../public/fonts/font.woff2",
});

interface Props {
    profile: Profile | null
}

export function Land({ profile }: Props) {
    return (
        <div
            className={cn(
                "flex items-center justify-center flex-col mb-4",
                headingFont.className
            )}
        >
            <div className="mb-4 flex flex-row items-center shadow-sm p-4 rounded-full dark:bg-amber-700 dark:text-amber-100 bg-amber-100 text-amber-700 uppercase font-semibold">
                <Medal className="h-6 w-6 mr-2" />
                No 1 task management
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl dark:text-neutral-400  text-neutral-800 mb-6 text-center">
                Bauble helps team move.
            </h1>
            <div className="text-2xl relative text-center md:text-6xl bg-gradient-to-r from-myPrimary to-mySecondary text-white px-3 p-2 rounded-md pb-1 w-fit">
                Work forward.
            </div>
            <div
                className={cn(
                    "text-sm md:text-xl text-neutral-400 mt-4 max-w-md md:max-w-3xl text-center mx-auto",
                    textFont.className
                )}
            >
                Collaborate, manage projects, and reach new productivity peaks. From
                high rises to the home office, the way your team works is unique -
                accomplish it all with Bauble.
            </div>
            <Button
                className="mt-6 p-5 shadow-md hover:bg-green-900 transition"
                size="sm"
                asChild
            >
                <Link href={profile ? "/home" : "/signin"}>
                    {profile ? "Welcome to Bauble" : "Get Bauble for free"}
                </Link>
            </Button>
        </div>
    );
}
