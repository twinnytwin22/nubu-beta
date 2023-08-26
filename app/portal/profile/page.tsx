import { PortalPageTitle } from '@/lib/hooks/PortalPageTitle';
import { supaServerSession } from '@/lib/providers/supabase/supabaseClient';
import BusinessProfileCard from '@/ui/Cards/BusinessProfileCard';
import { headers, cookies } from 'next/headers';
import Link from 'next/link';
import React, { Suspense } from 'react';
import { FaPlus } from 'react-icons/fa';

export const dynamic = 'force-dynamic'

async function ProfilePage() {
    const supabase = supaServerSession(cookies)
    const { data: session } = await supabase.auth.getSession();
    
    if (session && session.session?.user.id) {
        try {
            const host = headers().get('host');
            const protocol = process?.env.NODE_ENV === 'development' ? 'http' : 'https';
            const res = await fetch(`${protocol}://${host}/api/v1/getUsersOrgs?userId=${session.session?.user?.id}`, {
                method: 'GET',
                cache: 'no-store',
            });

            if (!res.ok) {
                throw new Error('Failed to fetch user organizations');
            }

            const userOrgs = await res.json();
            
            return session.session && userOrgs && (
                <section className='w-full h-full mx-auto relative'>
                    <div className='flex px-4 justify-between items-center h-fit w-full mb-3'>
                        <PortalPageTitle title='Business Profile' toolTip='Get ya mind right'/>
                        <Link href='/portal/entity/create'>
                            <button className="dark:text-black w-36 flex items-center space-x-2 text-white bg-teal-900 relative  hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-4 py-2 text-center md:mr-0 dark:bg-white dark:hover:bg-zinc-200 dark:focus:ring-zinc-800 ease-in-out duration-300">
                                <p>Create Entity</p>
                                <FaPlus />
                            </button>
                        </Link>
                    </div>
                    <div className='relative flex top-1/3 h-fit mx-auto w-full'>
                    <Suspense>

                        {userOrgs.length > 0 ? (
                            <div className='text-black dark:text-white min-h-full w-full mx-auto space-y-4 '>
                                {userOrgs.map((profile: any ) => (
                                <BusinessProfileCard profile={profile}/>))}
                            </div>
                        ) : (
                            <div className='text-black w-full dark:text-white min-h-full justify-center mx-auto'>
                                <p className='text-center'>You dont have any business profiles.</p>
                                <Link href={'/portal/entity/create'} className=''>
                                    <p className='mx-auto justify-center text-center underline text-teal-800 dark:text-teal-600'>Create Entity</p>
                                </Link>
                                <p>{JSON.stringify(userOrgs?.orgs)}</p>

                            </div>
                        )}
                         </Suspense>
                    </div>
                </section>
            );
        } catch (error) {
            console.error('An error occurred:', error);
            // You can render an error message or component here if needed
            return <div>An error occurred. Please try again later.</div>;
        }
    } else {
        return <p className='text-black'>{JSON.stringify(session)}</p>
    }
}

export default ProfilePage;
