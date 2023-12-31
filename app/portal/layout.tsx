'use client'
import DashboardSidebar from '@/ui/Navigation/DashboardSidebar';
import React, { Suspense, useState } from 'react';

function PortalLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <div className='relative flex h-screen overflow-hidden bg-zinc-100 dark:bg-zinc-950'>
            <DashboardSidebar isOpen={isSidebarOpen} />
            <div className='flex-1 overflow-x-hidden overflow-y-auto'>
                <button
                    onClick={toggleSidebar}
                    className='absolute top-4 left-4 lg:hidden z-50'
                >
                    &#9776; {/* Hamburger icon */}
                </button>
                <div className='md:ml-64  mx-auto max-h-[70vh] h-full  transition-transform'>
                    <div className='relative w-full h-full top-24 left-0 right-0 '>
                        <Suspense>
                        {children}
                        </Suspense>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default PortalLayout;
