'use client'
import React from 'react';
import { create } from 'zustand';
import { useStore } from 'zustand';
import DarkModeSwitch from '../Buttons/DarkModeSwitch';
import Link from 'next/link';
import Image from 'next/image';
import { imageBuilder } from '@/lib/providers/sanity/sanity';
//import { imageLoader } from '@/lib/providers/sanity/imageLoader';
import { usePathname } from 'next/navigation';
import SignInModal from '../Buttons/SignIn';
const useMobileMenuStore = create((set: any) => ({
    isMobileMenuOpen: false,
    toggleMobileMenu: () => set((state: { isMobileMenuOpen: any; }) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
}));


function NavBar({ settings }: { settings: any }) {
    const image = imageBuilder(settings?.logo)
    const darkImage = imageBuilder(settings?.altLogo)

    const { isMobileMenuOpen, toggleMobileMenu } = useStore(useMobileMenuStore);
    const pathname = usePathname()
    const isHidden = pathname.startsWith('/') //|| pathname.startsWith('/login')

    return (
        <nav className="bg-white dark:bg-teal-950 fixed w-full z-20 top-0 left-0 border-b border-zinc-200 dark:border-zinc-700">
            <div className="max-w-screen flex flex-wrap items-center justify-between mx-auto px-8 p-4">
                <Link href="/" className="flex items-center">
                <Image
                                src={image!}
                                className="h-10 mr-3 w-auto dark:hidden block"
                                alt="Crib Logo"
                                width={145}
                                height={100}
                            />
                              <Image
                                src={darkImage!}
                                className="h-10 mr-3 w-auto hidden dark:block "
                                alt="Crib Logo"
                                width={145}
                                height={100}
                            />
                </Link>
                <div className="flex md:order-2 gap-4 items-center">
                    <DarkModeSwitch/>
                    <SignInModal />                   
                     <button
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        className="inline-flex items-center p-2 text-sm text-zinc-500 rounded-sm md:hidden hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:text-zinc-400  dark:focus:ring-zinc-600"
                        aria-controls="navbar-sticky"
                        aria-expanded={isMobileMenuOpen}
                        onClick={toggleMobileMenu}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div
                    className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMobileMenuOpen ? '' : 'hidden'
                        }`}
                    id="navbar-sticky"
                >                      {!isHidden &&

                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-sm md:flex-row md:space-x-12 md:mt-0 md:border-0">
                        <li>
                            <Link
                                href="/about"
                                className="block py-2 pl-3 pr-4 text-zinc-900 rounded hover:bg-zinc-100 md:hover:bg-transparent md:hover:text-zinc-700 md:p-0 md:dark:hover:text-zinc-500 dark:text-white  dark:hover:text-white md:dark:hover:bg-transparent dark:border-zinc-700 ease-in-out duration-300"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <a
                                href="#services"
                                className="block py-2 pl-3 pr-4 text-zinc-900 rounded hover:bg-zinc-100 md:hover:bg-transparent md:hover:text-zinc-700 md:p-0 md:dark:hover:text-zinc-500 dark:text-white  dark:hover:text-white md:dark:hover:bg-transparent dark:border-zinc-700 ease-in-out duration-300"
                            >
                                Services
                            </a>
                        </li>
                        <li>
                            <a
                                href="#tech"
                                className="block py-2 pl-3 pr-4 text-zinc-900 rounded hover:bg-zinc-100 md:hover:bg-transparent md:hover:text-zinc-700 md:p-0 md:dark:hover:text-zinc-500 dark:text-white  dark:hover:text-white md:dark:hover:bg-transparent dark:border-zinc-700 ease-in-out duration-300"
                            >
                                Technology
                            </a>
                        </li>
                        <li className="hidden">
                            <a
                                href="#"
                                className="block py-2 pl-3 pr-4 text-zinc-900 rounded hover:bg-zinc-100 md:hover:bg-transparent md:hover:text-zinc-700 md:p-0 md:dark:hover:text-zinc-500 dark:text-white  dark:hover:text-white md:dark:hover:bg-transparent dark:border-zinc-700 ease-in-out duration-300"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
