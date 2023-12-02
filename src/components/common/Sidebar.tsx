"use client"
import React, { useState } from 'react';
import { FaHome, FaBook, FaUser } from 'react-icons/fa';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`bg-gray-800 h-screen text-white ${isOpen ? 'w-64' : 'w-16'} transition-all duration-300`}>
        </div>
    );
};

export default Sidebar;

