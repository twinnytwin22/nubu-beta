import { PortalPageTitle } from '@/lib/hooks/PortalPageTitle';
import { supaServerSession } from '@/lib/providers/supabase/supabaseClient';
import { headers, cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';

async function ProfilePage() {
    const supabase = supaServerSession(cookies)
    const { data: session } = await supabase.auth.getSession();
    if (session && session.session?.user.id) {
        try {
            const host = headers().get('host');
            const protocol = process?.env.NODE_ENV === 'development' ? 'http' : 'https';
            const res = await fetch(`${protocol}://${host}/api/v1/getUsersOrgs?userId=${session.session?.user.id}`, {
                method: 'GET',
                cache: 'no-store',
            });

            if (!res.ok) {
                throw new Error('Failed to fetch user organizations');
            }

            const userOrgs = await res.json();
            if (userOrgs) {
                return (
                    <section className='w-full h-full mx-auto relative'>
                        <PortalPageTitle title='Business Profile' toolTip='Get ya mind right' />
                        <div className='absolute right-0 z-10'>
                            <Link href='/portal/entity/create'>
                                <button
                                    className="dark:text-black flex items-center space-x-2 text-white bg-teal-900 relative top-16 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-white dark:hover:bg-zinc-200 dark:focus:ring-zinc-800 ease-in-out duration-300"
                                > <p>Create Entity</p>
                                    <FaPlus />
                                </button>
                            </Link>
                        </div>
                        <div className='relative flex place-items-center min-h-full mx-auto w-full'>
                            {userOrgs.length > 0 ? (
                                <div className='text-black dark:text-white min-h-full w-full justify-center mx-auto '>
                                    <p className='text-center'>You dont have any business profiles.</p>
                                    <button className='mx-auto justify-center'>Create Entity</button>
                                    <p>{JSON.stringify(userOrgs)}</p>
                                </div>
                            ) : (
                                <div className='text-black w-full dark:text-white min-h-full justify-center mx-auto'>
                                    <p className='text-center'>You don't have any business profiles.</p>
                                    <p className='mx-auto justify-center text-center'>Create Entity</p>
                                </div>
                            )}
                        </div>
                    </section>
                )
            };
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
