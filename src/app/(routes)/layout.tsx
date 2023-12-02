import { NavBar } from "@/components/common/NavBar"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    //<div className='hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0'>
    // <div className='hidden md:flex h-full z-30'>
    // </div>
    //<div className='h-full flex'>
    //</div>
    return (
        <main className=' h-full flex-1'>
            <NavBar transparent={true} fixed={true} />
            {children}
        </main>
    )
}
