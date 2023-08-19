"use client"
import { useHandleOutsideClick } from '@/lib/hooks/handleOutsideClick';
import React, { useState } from 'react';

export const HeaderSearch = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    };
    useHandleOutsideClick(isDropdownOpen, setDropdownOpen, 'dropdown')
    const menuItems = [
        "Mockups",
        "Templates",
        "Design",
        "Logos"
    ];

    return (
        <form>
            <div className="flex relative">
                <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-zinc-900 sr-only dark:text-white">
                    Your Email
                </label>
                <button
                    id="dropdown-button"
                    className={`flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-zinc-900 bg-zinc-100 border border-zinc-300 rounded-l-lg hover:bg-zinc-200 focus:ring-4 focus:outline-none focus:ring-zinc-100 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:focus:ring-zinc-700 dark:text-white dark:border-zinc-600 ${isDropdownOpen ? 'rounded-bl-lg' : ''}`}
                    type="button"
                    onClick={toggleDropdown}
                >
                    All categories
                    <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>
                {isDropdownOpen && (
                    <div id="dropdown" className=" dropdown z-20 absolute top-10 bg-white divide-y divide-zinc-100 rounded-lg shadow w-44 dark:bg-zinc-700">
                        <ul className="py-2 text-sm text-zinc-700 dark:text-zinc-200" aria-labelledby="dropdown-button">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-600 dark:hover:text-white">
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="relative w-full">
                    <input
                        type="search"
                        id="search-dropdown"
                        className="block p-2.5 w-full z-20  text-sm text-zinc-900 bg-zinc-50 rounded-r-lg border-l-zinc-50 border-l-2 border border-zinc-300 focus:ring-teal-600 focus:border-teal-600 dark:bg-zinc-700 dark:border-l-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:border-teal-600"
                        placeholder="Search businesses, keywords.."
                        required
                    />
                    <button
                        type="submit"
                        className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-teal-800 rounded-r-lg border border-teal-800 hover:bg-teal-900 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-800 dark:focus:ring-teal-900"
                    >
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </form>
    );
};
