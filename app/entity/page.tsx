import React from 'react'
import { headers } from 'next/headers';
async function page() {
    const host = headers().get('host')
    const protocol = process?.env.NODE_ENV === "development" ? "http" : "https"
    const res = await fetch(`${protocol}://${host}/api/v1/getAllOrgs?=refreshCache`, {
        method: "GET",
        /// headers: { "Content-Type": "application/json" },
        cache: 'no-store',
    });

    const data = await res.json()

    return data ? (
        <div className='h-screen'>{JSON.stringify(data)}</div>
    ) : (
        <div>
            NOTHING
        </div>
    )
}

export default page