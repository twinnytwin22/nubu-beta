import { getBlogPosts } from '@/lib/providers/sanity/sanity'
import React from 'react'

async function page({ params }: { params: { id?: string, slug: string } }) {
    const res = await getBlogPosts()

    if (res.success) {
        const { id: slug } = params
        //        console.log(res.slugs, 'SLUGS', slug, 'BROWSER SLUG')
        if (res.slugs.includes(slug)) {
            const relatedPost =
                res.res?.find((post: { slug: { current: string } }) =>
                    post.slug.current === slug)
            // console.log(relatedPost)
            return (
                <div className='h-screen items-center flex'>
                    <p>{relatedPost.title}</p>
                </div>
            )
        }
    }

    return (
        <div className='h-screen items-center flex'>
            <p>No valid blog post found.</p>
        </div>
    )
}

export default page
