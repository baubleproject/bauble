"use client";
import useSidebarStore from "@/store/SideBarStore";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    TbLayoutSidebarRightCollapse,
    TbLayoutSidebarLeftCollapse,
} from "react-icons/tb";
import Logo from "@/components/custom/Logo";

export default function SideBarControl() {
    const { isCollapsed, toggleSidebarCollapse } = useSidebarStore();
    return (
        <div
            className={`items-center hidden md:flex ${isCollapsed ? "justify-center" : "justify-between"
                } w-full`}
        >
            <div className={`${isCollapsed ? "hidden" : "flex-1 flex items-center justify-start"}`}>
                <Logo className="w-20 h-9" />
            </div>
            <div
                onClick={toggleSidebarCollapse}
                className="p-2 px-3 rounded-md text-myPrimary dark:text-white cursor-pointer"
            >
                <div className="">
                    {isCollapsed ? (
                        <TbLayoutSidebarRightCollapse className="w-6 h-6" />
                    ) : (
                        <TbLayoutSidebarLeftCollapse className="w-6 h-6" />
                    )}
                </div>
            </div>
        </div>
    );
}
