
import { cn } from "@/lib/utils"
import bg from "/public/logo/png/logo-no-background.png"
import React, { HTMLAttributes } from 'react'

interface LogoProps extends HTMLAttributes<HTMLDivElement> {}

export default function Logo({ className, ...props }: LogoProps) {
    return (
        <div {...props} className={cn(`w-12 h-6 flex items-center justify-center`, className)}>
            <div className={`w-full h-full bg-contain bg-center bg-no-repeat`} style={{
                backgroundImage: `url(${bg.src})`,
            }} >
            </div>
        </div>
    )
}
