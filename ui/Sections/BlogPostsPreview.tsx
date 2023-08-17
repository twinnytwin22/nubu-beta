import React from 'react';
import PortableText from '../Misc/PortableText';
import Link from 'next/link';
import Image from 'next/image';
import { convertDatetime } from '@/lib/hooks/convertDatetime';
const BlogPost = ({ category, _createdAt, title, content, author, authorAvatar, slug }) => (
    <article className="p-6 bg-white rounded-lg border border-zinc-200 shadow-md dark:bg-zinc-950 dark:border-zinc-800">
        <div className="flex justify-between items-center mb-5 text-zinc-500">
            <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                {''}
            </span>
            <span className="text-sm">{convertDatetime(_createdAt).timePast}</span>
        </div>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            <Link href="#">{title}</Link>
        </h2>
        <div className="mb-5 font-light text-zinc-500 dark:text-zinc-400 text-sm"><PortableText content={content} /></div>
        <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <div className='rounded-full bg-zinc-100 contrast-'>
                    <Image width={30} height={30} className="w-7 h-7 rounded-full" src={'/images/network-ball.png'} alt={`${author} avatar`} />
                </div>
                <span className="font-medium dark:text-white">{author}</span>
            </div>
            <Link href={`/post/${slug?.current}`} className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                Read more
                <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </Link>
        </div>
    </article>
);

const BlogPostsPreview = ({ blogPosts }) => {

    return (
        <section className="bg-zinc-100 dark:bg-black border-t border-b border-zinc-200 dark:border-zinc-800 py-8">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                    <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-zinc-900 dark:text-white">Our Blog</h2>
                    <p className="font-light text-zinc-500 sm:text-xl dark:text-zinc-400">We use an agile approach to test assumptions and connect with the needs of your audience early and often.</p>
                </div>
                <div className="grid gap-8 lg:grid-cols-2">
                    {blogPosts.map((post, index) => (
                        <BlogPost key={index} {...post} />
                    ))}
                </div>
            </div>
        </section>
    );
}
export default BlogPostsPreview;
