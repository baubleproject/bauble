'use client'

import { useEffect, useState } from "react";
import MobileSideBar from "@/components/Layouts/MobileSidebar";
import CreateProjectModal from "@/components/modals/CreateProject";

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
            <MobileSideBar />
            <CreateProjectModal />
        </>
    )

}
