import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Novus',
    description: 'Bookmark your favourite books.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
            >
                <body className={inter.className}>{children}</body>
            </ThemeProvider>
        </html>
    )
}
