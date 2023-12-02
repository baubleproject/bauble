
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    //<div className='hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0'>
    return (
        <div className='h-full flex'>
            <div className='hidden md:flex h-full z-30'>
            </div>
            <main className=' h-full flex-1'>
                {children}
            </main>
        </div>
    )
}
