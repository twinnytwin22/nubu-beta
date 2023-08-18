'use client'
import { useAuthProvider } from '@/app/context/auth'
import Link from 'next/link'
import React from 'react'

function DashboardSidebar({ isOpen }) {
    const { user, signOut } = useAuthProvider()
    ///   console.log(user)
    return (
        <aside
            className="fixed  left-0 z-0 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-zinc-200 md:translate-x-0 dark:bg-black dark:border-zinc-800"
            aria-label="SideNav"
            id="drawer-navigation"
        >
            <div className="overflow-y-auto py-5 px-3 h-full ">

                <ul className="space-y-2 mt-8">
                    <li>
                        <Link
                            href="/portal"
                            className="flex items-center p-2 text-base font-medium text-zinc-900 rounded-lg dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 group"
                        >

                            <span className="ml-3">Overview</span>
                        </Link>
                    </li>
                    <li className=''>
                        <Link
                            href="/portal/profile"
                            className="flex items-center p-2 text-base font-medium text-zinc-900 rounded-lg dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 group"
                        >
                            <span className="ml-3">Business Profile</span>

                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/portal/account"
                            className="flex items-center p-2 text-base font-medium text-zinc-900 rounded-lg dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 group"
                        >
                            <span className="ml-3">Account</span>

                        </Link>
                    </li>
                  
                    <li className='hidden'>
                        <Link
                            href="/portal/invoicing"
                            className="flex items-center p-2 text-base font-medium text-zinc-900 rounded-lg dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 group"
                        >
                            <span className="ml-3">Invoicing</span>

                        </Link>
                    </li>

                    {/* ... (rest of the list items) ... */}
                </ul>
                <ul className="pt-5 mt-5 space-y-2 border-t border-zinc-200 dark:border-zinc-700 cursor-pointer">
                    {/* ... (additional list items) ... */}
                    <li>
                        <div onClick={signOut} className="flex items-center p-2 text-base font-medium text-zinc-900 rounded-lg dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 group"

                        >
                            <span className="ml-3">Sign Out</span>

                        </div>
                    </li>
                </ul>
            </div>
            <div
                className="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-zinc-800 z-20"
            >
                {/* ... (social links and dropdowns) ... */}
            </div>
        </aside>
    )
}

export default DashboardSidebar