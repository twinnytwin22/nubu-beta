'use client'
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { useState } from 'react'
export const PortalPageTitle = ({ title, toolTip, subtitle }: { title: string, subtitle?: string | null, toolTip?: string | null | boolean }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const handleSetTooltip = () => {
        setShowTooltip(true);
    };
    const handleHideTooltip = () => {
        setShowTooltip(false);
    };

    return (
        <div className='w-full relative items-center text-black dark:text-white'>
            <div className='absolute top-32 left-20 flex items-center space-x-2 z-50'>
                <div>
                    <p className='text-xl font-bold'>{title}</p>

                    {subtitle && <p className='text-xs'>{subtitle}</p>}
                </div>
                {toolTip &&
                    <div className='relative'
                        onMouseEnter={handleSetTooltip}
                        onMouseLeave={handleHideTooltip}>
                        <BsFillQuestionSquareFill />
                        {showTooltip &&
                            <div className='absolute top-8 right-0 left-0 w-48 max-w-72 p-2.5 rounded-sm bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 shadow-md'>
                                <p className='text-xs'>{toolTip}</p>
                            </div>}
                    </div>}
            </div>
        </div>
    );
};

