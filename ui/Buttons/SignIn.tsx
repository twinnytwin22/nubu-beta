"use client";
import { useAuthProvider } from "@/app/context/auth";
import Link from "next/link";
import React, { useState } from "react";

export const SignInModal = () => {
  const { user } = useAuthProvider()

  function SignInButton() {
    return (
      <div className='w-full flex items-center'>
        <Link href={'/login'}
        >
          <h4
            className="flex items-center text-white hover:bg-teal-950 bg-teal-900 focus:ring-4  border-zinc-700 border focus:ring-zinc-300 duration-300 ease-in-out text-xs rounded-lg lg:text-sm px-3 lg:px-5 py-2 lg:py-2.5   focus:outline-none   shadow-zinc-200 hover:shadow-sm"

          >{`${!user ? 'Sign In' : 'My Account'}`}</h4>


        </Link>
      </div>
    );
  }

  return (
    <>
      <div>
        <SignInButton />

      </div>
    </>
  );
};

export default SignInModal;
