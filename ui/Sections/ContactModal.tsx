import React from 'react'
import ContactForm from './ContactPageForm';

export const ContactModal = ({ handleClose }) => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center mx-8">
            <div className="fixed inset-0  bg-black opacity-50" onClick={handleClose}></div>
            <div className="bg-zinc-50 dark:bg-black relative">
                <svg
                    onClick={handleClose}
                    className="w-6 absolute top-3 left-3 z-[99999] text-black dark:text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <ContactForm handleClose={handleClose} />
            </div>
        </div>
    );
};