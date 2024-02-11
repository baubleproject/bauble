


export default function ClerkLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center bg-green-950">
            <div className="hidden md:block md:col-span-1 lg:col-span-2 w-full h-full"></div>
            <div className="h-full w-full col-span-1 md:col-span-1 lg:col-span-1 ">
                {children}
            </div>
        </section>
    );
}

