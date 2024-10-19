"use client";

import { navLinks } from "@/lib/constants";
import { UserButton } from "@clerk/nextjs";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const TopBar = () => {
    const [dropdownMenu, setDropdownMenu] = useState(false);
    const pathname = usePathname();

    return (
        <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-blue-2 shadow-xl lg:hidden">
            <div className="justify-center items-center flex">
                <Image src="/logo.png" width={120} height={120} alt="logo" />
            </div>

            <div className="flex gap-8 max-md:hidden">
                {navLinks.map((link) => (
                    <Link
                        className={`flex gap-4 text-body-medium ${pathname === link.url ? "text-blue-1" : "text-grey-1"}`}
                        href={link.url}
                        key={link.label}
                    >
                        <p>{link.label}</p>
                    </Link>
                ))}
            </div>

            <div className="relative flex gap-4  items-center">
                <MenuIcon
                    size={24}
                    className="cursor-pointer md:hidden"
                    onClick={() => setDropdownMenu(!dropdownMenu)}
                />
                {dropdownMenu && (
                    <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white  rounded-lg">
                        {navLinks.map((link) => (
                            <Link
                                className="flex gap-4 text-body-medium"
                                href={link.url}
                                key={link.label}
                            >
                                {link.icon} <p>{link.label}</p>
                            </Link>
                        ))}
                    </div>
                )}
                <UserButton />
            </div>
        </div>
    );
};

export default TopBar;
