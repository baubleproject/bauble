import { CardWithForm } from "@/components/custom/SomeCard";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
    return (
        <main className="flex min-h-screen space-y-2 flex-col items-center p-24">
            Hello world
            <Button className="font-bold">Hello fucking world</Button>
            <CardWithForm />
            <ModeToggle />
        </main>
    );
}
