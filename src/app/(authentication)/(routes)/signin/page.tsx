import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <section className="h-full flex items-center justify-center">
            <SignIn />
        </section>
    )
}
