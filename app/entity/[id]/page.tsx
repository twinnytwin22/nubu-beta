import React from 'react'
import { headers } from 'next/headers';
export default async function Page({
    params,
}: {
    params: { id: string; slug: string };
}) {   
    const { id } = params;

    const host = headers().get('host')
    const protocol = process?.env.NODE_ENV === "development" ? "http" : "https"
    const res = await fetch(`${protocol}://${host}/api/v1/getEntityById?entityId=${id}`, {
        method: "GET",
        /// headers: { "Content-Type": "application/json" },
        cache: 'no-store',
    });

    const entity = await res.json()

    return entity ? (
        <div className='h-full max-w-screen-lg mx-auto text-black dark:text-white'>
        <div>
            <video controls src={entity.video_url} className='w-full mx-auto rounded-lg '/>
            <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-bold'>
                {entity.title}
            </h1>
            <button className='bg-teal-800 text-white rounded-lg h-fit p-2.5 text-sm'>
            Contact
            </button>
            </div>
            <p>
                {entity.description}
            </p>
        </div>
       
        </div>
    ) : (
        <div>
            NOTHING
        </div>
    )
}

