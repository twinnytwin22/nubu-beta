import React from "react";
import Image from "next/image";
import Link from "next/link";
function OurTech() {
    return (
        <div id="tech" className="w-full py-32 bg-zinc-100 dark:bg-zinc-950 border-b border-zinc-300 dark:border-zinc-800">
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-screen-2xl w-full mx-auto  px-8">
                <div className="flex flex-col space-y-10 w-full mb-12 text-zinc-900 dark:text-zinc-300">
                    <Link href='https://www.prns.app/' className="space-y-2 w-full ">
                        <Image
                            className="invert dark:invert-0 mx-auto"
                            src="/logos/prns.png"
                            alt="logo"
                            priority
                            width={180}
                            height={100}
                        />
                        <p className="w-40 text-center text-sm mx-auto">Administration and education tools for pro musicians.</p>
                    </Link>
                    <Link href='https://subport.xyz' className="w-full mx-auto flex-col flex">
                        <div className="flex items-center space-x-3 mx-auto w-full justify-center mb-2">
                            <Image
                                src="/logos/subport.png"
                                alt="logo"
                                priority
                                width={50}
                                height={200}
                                className=""
                            />
                            <p className="text-2xl font-bold text-black dark:text-white  ">Subport</p>
                        </div>
                        <p className="w-40 text-center text-sm mx-auto">Marketing and promotion tools for independent creators.</p>

                    </Link>
                </div>
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold font-owners mb-4 text-black dark:text-white">
                        Our Technology
                    </h1>
                    <p className="text-xl max-w-lg w-full text-zinc-800 dark:text-zinc-300">
                        We leverage cutting-edge technology to empower businesses with
                        faster processes and deliver services that harness the latest
                        advancements. Our internally-crafted tools and services optimize
                        productivity, enhance customer experiences, and unlock new growth
                        opportunities. Experience the transformative potential of our
                        innovation-driven solutions in today's dynamic world.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default OurTech;
