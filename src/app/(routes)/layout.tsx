import { NavBar } from "@/components/common/NavBar"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
   return (
        <main className=' h-full flex-1'>
            <NavBar transparent={true} fixed={true} light={true} />
            {children}
        </main>
    )
}
