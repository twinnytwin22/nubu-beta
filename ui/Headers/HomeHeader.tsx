'use client'
import { useContactButtonStore } from '@/lib/stores/contactButtonStore';
import Image from 'next/image'; // Import next/image
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { MicrosoftLogo, AlchemyLogo } from '../Misc/SvgLogos';
import { imageBuilder } from '@/lib/providers/sanity/sanity';


function HomeHeader({ content }) {
  const setOpen = useContactButtonStore((state: any) => state.setOpen);
  const image = imageBuilder(content.image)
  const [scrollY, setScrollY] = useState(0);
  //console.log(image)
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleOpenModal = () => {
    setOpen(true);
  };

  return (
    <section className="relative mt-16 w-full overflow-hidden border-b border-zinc-300 dark:border-zinc-800">
      {/* Next/Image component for the background image */}
      <Image
        priority
        src={image}
        alt="Background"
        fill
        quality={75}
        className='z-0 grayscale contrast-125 brightness-125 object-cover'
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />

      {/* Black overlay */}
      <div className="absolute inset-0 "></div>

      <div className="relative py-24 px-4  mx-auto max-w-screen-xl text-center lg:py-32 lg:px-12 overflow-x-hidden">
        <a href="#" className="hidden justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-zinc-700 bg-zinc-100 rounded-full dark:bg-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700" role="alert">
          <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">New</span> <span className="text-sm font-medium">Flowbite is out! See what's new</span>
          <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
        </a>
        <h1 className="mb-4 text-4xl font-bold tracking-normal  md:text-5xl lg:text-7xl text-white max-w-screen-lg mx-auto font-owners">
          <span className="underline underline-offset-3 decoration-8 decoration-red-300">
            Innovating&nbsp;
          </span>
          the&nbsp;digital&nbsp;
          <br />
          <span className='underline underline-offset-3 decoration-8 decoration-red-300 '>
            experience.
          </span>
        </h1>
        <p className='uppercase font-semibold py-2 pb-6 tracking-wider text-zinc-300'>Connect. Revolutionize. Innovate. Boost.</p>
        <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-zinc-400 max-w-screen-lg mx-auto">{content.description}</p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link href={content?.url || '/about'} className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-sm bg-primary-700 hover:bg-primary-800 focus:ring-2 focus:ring-red-200 ">
            Learn more
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </Link>
          <div onClick={handleOpenModal} className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center rounded-sm border border-zinc-300 hover:bg-zinc-100 focus:ring-4 focus:ring-zinc-100 text-white  hover:text-black ">
            <svg className='w-7 pr-2' fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
            Let's Chat
          </div>
        </div>
        <div className="px-4 pt-8 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
          <span className="font-semibold text-zinc-300 uppercase tracking-wider">WITH SUPPORT FROM </span>
          <div className="flex flex-wrap justify-center items-center mt-8 text-zinc-500 sm:justify-around max-w-sm mx-auto">
            <Link href="https://microsoft.com" className=" mr-5 mb-5 lg:mb-0 hover:text-zinc-800 dark:hover:text-zinc-400">
              <MicrosoftLogo />
            </Link>

            <Link href="https://www.alchemy.com/" className="mr-5 mb-5 lg:mb-0 hover:text-zinc-800 dark:hover:text-zinc-400">
              <AlchemyLogo />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeHeader;
