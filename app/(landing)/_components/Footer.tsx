//import { Logo } from "@/components/logo";
import Logo from "@/components/custom/Logo";
import { Button } from "@/components/ui/button";
import React from "react";

export const Footer = () => {
    return (
        <div className="fixed bottom-0 w-full p-4 dark:border-t border-neutral-900  dark:bg-black dark:text-white font-semibold">
            <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                <Logo />
                <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                    <Button size="sm" variant="ghost">
                        Privacy Policy
                    </Button>
                    <Button size="sm" variant="ghost">
                        Terms of Service
                    </Button>
                </div>
            </div>
        </div>
    );
};
