'use client'
import DashboardSidebar from '@/ui/Navigation/DashboardSidebar';
import React, { useState } from 'react';

function PortalLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <div className='relative flex h-screen overflow-hidden'>
            <DashboardSidebar isOpen={isSidebarOpen} />
            <div className='flex-1 overflow-x-hidden overflow-y-auto'>
                <button
                    onClick={toggleSidebar}
                    className='absolute top-4 left-4 lg:hidden z-50'
                >
                    &#9776; {/* Hamburger icon */}
                </button>
                <div className='md:ml-64 mx-auto min-h-screen h-full bg-zinc-100 dark:bg-zinc-950 transition-transform flex items-center'>

                    {children}
                </div>
            </div>
        </div>
    );
}

export default PortalLayout;
