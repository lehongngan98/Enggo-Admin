"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'


import { navLinks } from '@/lib/constants'
import { usePathname } from 'next/navigation'



const LeftSideBar = () => {
    const pathname = usePathname();

    return (
        <div className='h-screen left-0 top-0 flex sticky p-10 flex-col gap-16 bg-blue-2 shadow-xl max-lg:hidden'>
            <div className='justify-center items-center flex' >
                <Image src="/logo.png" width={120} height={120} alt='logo' />
            </div>

            <div className='flex flex-col gap-12 overflow-y-auto flex-1 scrollbar-none'>
                {
                    navLinks.map((link) => (
                        <Link
                            className={`flex gap-4 text-body-medium ${pathname === link.url ? 'text-blue-1' : 'text-grey-1'}`}
                            href={link.url}
                            key={link.label}
                        >
                            {link.icon} <p>{link.label}</p>
                        </Link>
                    ))
                }
            </div>

            <div className='flex gap-4 text-body-medium items-center'>
                <UserButton />
                <p>Edit Profile</p>
            </div>
        </div>
    )
}

export default LeftSideBar