'use client'
import React from 'react'
import { useAuthProvider } from '../context/auth'
import { PortalPageTitle } from '@/lib/hooks/PortalPageTitle'
function Portal() {
    const { user, profile } = useAuthProvider()
    return (

        <section className='w-full h-full mx-auto relative'>
            {profile && <PortalPageTitle
                title={`Hello, ${profile.full_name}`}
                subtitle={`${user.email} | ${profile.username}`}
                toolTip={false}
            />}
            <div className='relative flex place-items-center min-h-full mx-auto w-full'>
            </div>
        </section>
    )
}

export default Portal