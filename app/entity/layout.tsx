'use client'
import DashboardSidebar from '@/ui/Navigation/DashboardSidebar';
import React, { Suspense, useState } from 'react';

function EntityLayout({ children }: { children: React.ReactNode }) {


    return (
        <div className='relative flex h-full min-h-[70vh] overflow-hidden bg-zinc-100 dark:bg-zinc-950'>
            <div className='relative w-full h-full top-24 left-0 right-0 mb-24 '>
                <Suspense>
                    {children}
                        </Suspense>
            </div>
        </div>
    );
}

export default EntityLayout;
