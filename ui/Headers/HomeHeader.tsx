'use client'
import { useContactButtonStore } from '@/lib/stores/contactButtonStore';
import Image from 'next/image'; // Import next/image
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { MicrosoftLogo, AlchemyLogo } from '../Misc/SvgLogos';
import { imageBuilder } from '@/lib/providers/sanity/sanity';
import { HeaderSearch } from '../Misc/HeaderSearch';
import { useAuthProvider } from '@/app/context/auth';


function HomeHeader({ content }) {
  const setOpen = useContactButtonStore((state: any) => state.setOpen);
  const image = imageBuilder(content.image)
  const [scrollY, setScrollY] = useState(0);
  const { user } = useAuthProvider()
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
    <section className="relative mt-16 w-full  min-h-[700px] h-full  overflow-hidden border-b border-zinc-300 dark:border-zinc-800 items-center">
      {/* Next/Image component for the background image */}
      <Image
        priority
        src={image}
        alt="Background"
        fill
        quality={75}
        className='z-0 contrast-125 brightness-125 object-cover'
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />

      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-50 "></div>

      <div className="relative py-24 px-4 mx-auto max-w-screen-xl text-center lg:py-32 lg:px-12 overflow-x-hidden">
        {!user &&
          <a href="#" className="flex max-w-sm mx-auto justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-zinc-700 bg-zinc-100 rounded-full dark:bg-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700" role="alert">
            <span className="text-xs bg-primary-600 rounded-full text-black px-4 py-1.5 mr-3">New</span> <span className="text-sm font-medium">Register your business</span>
            <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
          </a>}
        <h1 className="mb-4 text-4xl font-bold tracking-normal  md:text-5xl lg:text-7xl text-white max-w-screen-lg mx-auto font-owners">
          <span className="underline underline-offset-3 decoration-8 decoration-teal-800">
            Welcome&nbsp;
          </span>
          to&nbsp;
          <br />
          <span className='underline underline-offset-3 decoration-8 decoration-teal-800 '>
            Ferguson.
          </span>
        </h1>
        <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-zinc-300 max-w-screen-lg mx-auto">{content.description}</p>
        <div className=" max-w-md mx-auto">
          <HeaderSearch />
        </div>
        <div className="px-4 pt-8 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">

        </div>
      </div>
    </section>
  );
}

export default HomeHeader;
