import React from "react";

export const Advert = () => {
    return (
        <div className="fixed top-14 w-full h-12 px-4 border-b dark:border-transparent shadow-sm hidden md:flex bg-green-100 dark:bg-myPrimary dark:text-white items-center">
            <div className="w-auto mx-auto flex items-center justify-between">
                Get Premium Bauble and get access to flagship features like our AI future teller!{" "}
                <span className="underline dark:text-white text-myPrimary mx-2"> coming soon.</span>
            </div>
        </div>
    );
};
