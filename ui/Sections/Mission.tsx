import React from 'react'
import Circles from '../Misc/NetworkBall'

function Mission() {
    return (
        <section id="about" className="bg-zinc-100 dark:bg-zinc-950 w-full border-b border-zinc-300 dark:border-zinc-800">
            <div className="gap-16 items-center py-8 px-8 mx-auto max-w-screen-2xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                <div className="font-light text-zinc-900 dark:text-zinc-300 text-2xl">
                    <h2 className="mb-4 text-4xl lg:text-5xl tracking-tight font-extrabold text-black dark:text-white ">
                        Moving ideas
                        &nbsp;
                        <mark className=" bg-red-300  text-black dark:text-white italic">
                            &nbsp;forward.</mark></h2>
                    <p className="mb-4 text-lg lg:text-xl">
                        Propelling companies forward by merging
                        the power of marketing and technology.
                        We understand that ideas alone are not
                        enough; they require strategic execution
                        to thrive in today's dynamic business
                        landscape.
                    </p>
                    <p className="mb-4 text-lg lg:text-xl">

                        With our innovative solutions
                        and expert guidance, we empower businesses
                        to transform their ideas into impactful
                        realities. From cutting-edge digital marketing
                        strategies to leveraging emerging technologies,
                        we are your trusted partner in driving
                        growth and achieving long-term success. Let
                        us be the catalyst that propels your
                        ideas beyond imagination.
                    </p>
                </div>
                <div className=' scale-75 md:scale-90 justify-center flex overflow-x-visible center -ml-10 md:-ml-0'>
                    <Circles />
                </div>
            </div>
        </section>)
}

export default Mission