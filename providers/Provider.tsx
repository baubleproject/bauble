"use client"

import { ReactNode } from "react"
import { ThemeProvider } from "./theme-provider"
import { ModalProvider } from "./ModalProvider"

interface ProviderProps {
    children: ReactNode
}

export default function Provider({ children }: ProviderProps) {
    return (<>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <ModalProvider />
            {children}
        </ThemeProvider>
    </>
    )
}
