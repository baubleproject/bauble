"use client"

import { ReactNode } from "react"
import { ThemeProvider } from "./theme-provider"
import { ModalProvider } from "./ModalProvider"
import { Toaster } from "@/components/ui/sonner"

interface ProviderProps {
    children: ReactNode
}

export default function Provider({ children }: ProviderProps) {
    return (<>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >

            <ModalProvider />
            {children}
            <Toaster />
        </ThemeProvider>
    </>
    )
}
