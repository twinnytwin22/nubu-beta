import React from 'react'
//import Image from 'next/image';

import { getBlogPosts } from '@/lib/providers/sanity/sanity';

//const backgroundImage = "/images/azwindmill.jpg"
async function page() {
    const blogPosts = await getBlogPosts()
    if (blogPosts.success) {

        return (
            <React.Fragment>
                ABOUT
            </React.Fragment>

        )
    }
}

export default page








