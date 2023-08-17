import React from 'react'

function SocialProof() {
    return (
        <section className="bg-zinc-100 dark:bg-zinc-950 w-full border-b border-zinc-300 dark:border-zinc-800">
            <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                <dl className="grid max-w-screen-md gap-8 mx-auto text-zinc-900 sm:grid-cols-2 dark:text-white">
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl md:text-4xl font-extrabold">16+</dt>
                        <dd className="font-light text-zinc-500 dark:text-zinc-400">years experience</dd>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl md:text-4xl font-extrabold">100+</dt>
                        <dd className="font-light text-zinc-500 dark:text-zinc-400">projects completed</dd>
                    </div>
                    <div className="hidden flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl md:text-4xl font-extrabold">4M+</dt>
                        <dd className="font-light text-zinc-500 dark:text-zinc-400">organizations</dd>
                    </div>
                </dl>
            </div>
        </section>
    )
}

export default SocialProof