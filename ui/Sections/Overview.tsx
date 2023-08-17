'use client'
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { serviceSvg, techIcon, impactSvg } from '@/lib/site/icons';
import Link from 'next/link';
import Image from 'next/image';
import { imageBuilder } from '@/lib/providers/sanity/sanity';


function Overview({ content }: any) {
    const cardClass = 'hover:shadow-zinc-200 hover:shadow-2xl dark:hover:shadow-zinc-800 max-w-md w-full mx-auto ease-in-out duration-500  ';
    const headingClass = 'text-2xl md:text-3xl font-bold text-center text-black dark:text-white font-owners';
    const pClass = 'text-zinc-800 dark:text-zinc-200 text-lg text-center';


    const renderedContent = content.items.slice().reverse(); // Reverse the array
   // console.log(content)

    return renderedContent && (
        <div className='bg-white dark:bg-black w-full py-24 px-8 border-b border-zinc-300 dark:border-zinc-800'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-screen-2xl w-full mx-auto place-items-start gap-4'>
                {renderedContent.map((card, index) => (
                    <div className={cardClass} key={index}>
                        <div className='w-full h-48 relative rounded-t-lg'>
                            <Image
                                src={imageBuilder(card.image)}
                                alt={`${card.itemHeading} Background`}
                                fill
                                className='brightness-75 object-cover bg-center rounded-t-lg w-full'
                            />
                            <div className='w-10 mx-auto dark:invert absolute bottom-5 left-5 brightness-150 font-bold text-white'>
                                {card?.icon}
                            </div>
                        </div>
                        <div className='p-10'>
                            <h1 className={headingClass}>{card.itemHeading}</h1>
                            <p className={pClass}>{card.description}</p>
                            {card.url &&
                                <Link href={card?.url} className='flex items-center space-x-2 font-bold mx-auto justify-center text-zinc-900 dark:text-zinc-100'>
                                    <h1 className='font-owners'>Learn More</h1>
                                    <FaArrowRight />
                                </Link>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Overview;


export const cardData = [
    {
        icon: serviceSvg,
        title: 'Services',
        description: "Tailored multichannel solutions powered by innovative technology. Stand out in today's competitive landscape with our comprehensive services for seamless integration, exceptional customer engagement, and measurable results.",
        backgroundImage: '/images/cribcoded.jpg', // Replace with the actual path
        href: '#services'
    },
    {
        icon: techIcon,
        title: 'Technology',
        description: 'Driving digital transformation with advanced technology. Our solutions revolutionize operations, maximizing efficiency, agility, and growth. From AI-driven automation to immersive experiences, stay ahead in the digital era.',
        backgroundImage: '/images/cribcoder.jpg', // Replace with the actual path
        href: '#technology'

    },
    {
        icon: impactSvg,
        title: 'Impact',
        description: 'Empowering businesses for success. Unlock your full potential with our transformative multichannel services and innovative technology. Enhance customer experiences, drive revenue growth, and achieve sustainable success with our seamless solutions.',
        backgroundImage: '/images/impact.jpg', // Replace with the actual path
        href: '/about'

    },
];