import React from 'react';

const Circles = () => {
    return (
        <div className="  items-center w-full max-w-lg relative text-black dark:text-white scale-75 mx-auto justify-center lg:scale-100">
            <div className="w-[500px] h-[500px]  justify-center items-center rounded-full   relative border border-black dark:border-white">
                <p className="text-base font-bold absolute top-2 left-56">Boost.</p>
                <p className="text-xs font-light absolute top-7 left-[153px] text-center w-48">Powering Growth, Amplifying Results.</p>

                <div className="w-[400px] h-[400px] justify-center items-center rounded-full border border-black dark:border-white  absolute bottom-6 left-6">
                    <p className="text-base font-bold absolute top-2 left-40 ml-1">Innovate.</p>
                    <p className="text-xs font-light absolute top-7 text-center w-40 left-[117px] ml-1">Pioneering Ideas, Fueling Progress.</p>

                    <div className="w-[300px] h-[300px] justify-center items-center rounded-full border border-black dark:border-white  absolute bottom-6 left-6">
                        <p className="text-base font-bold absolute top-4 left-24">Revolutionize.</p>
                        <p className="text-xs font-light absolute top-9 w-40 text-center left-[68px]">Define and Disrupt Your Industry.</p>

                        <div className="w-[200px] h-[200px] absolute bottom-6 left-6 justify-center items-center rounded-full border border-black dark:border-white  ">
                            <p className="text-lg font-bold absolute top-16 left-14">Connect.</p>
                            <p className="text-xs font-light absolute bottom-20 left-4 w-40 text-center">Connecting People, Ideas, and Possibilities.</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Circles;
