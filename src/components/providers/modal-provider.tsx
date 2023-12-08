"use client"
import { useState, useEffect } from "react"
import { EditProfile } from "../custom/modals/EditProfile";
export function ModalProvider() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <EditProfile />
        </>
    )
}
