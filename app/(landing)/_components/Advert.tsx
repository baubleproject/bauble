"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { TfiClose } from "react-icons/tfi";

export const Advert = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => setIsVisible(true), 1000); // Show advert after 10s

        return () => clearTimeout(timeoutId); // Cleanup on unmount
    }, []);

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        isVisible && (
            <div className="fixed top-14 w-full h-12 px-4 border-b dark:border-transparent shadow-sm hidden md:flex bg-green-100 dark:bg-myPrimary dark:text-white items-center">
                <div className="w-auto mx-auto flex items-center justify-between">
                    Get Premium Bauble and get access to flagship features like our AI
                    future teller!{" "}
                    <span className="underline dark:text-white text-myPrimary mx-2">
                        {" "}
                        coming soon.
                    </span>
                </div>
                <Button variant={"link"} size={"sm"} onClick={handleClose} className="dark:text-neutral-100">
                    <TfiClose className="dark:text-neutral-100 font-bold" />
                </Button>
            </div>
        )
    );
};
