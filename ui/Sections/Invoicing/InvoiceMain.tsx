'use client'
import React, { useState } from 'react'
import { ClientDetailsForm } from './ClientDetailsForm'
import InvoiceForm from './InvoiceForm'

function InvoiceMain() {
    const [step, setStep] = useState<number>(1)

    const handleBackStep = () => {
        setStep(1)
    }

    const handleNextStep = () => {
        setStep(2)
    }
    return (
        <div>
            {step === 1 && <ClientDetailsForm />}
            {step === 2 && <InvoiceForm />}
            {step === 2 && <button
                className="relative bottom-0 mt-8 left-5 dark:text-black text-white bg-black hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-sm text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-white dark:hover:bg-zinc-200 dark:focus:ring-zinc-800 ease-in-out duration-300"

                onClick={handleBackStep}>Back</button>}

            {step === 1 && <button
                className="relative bottom-8 mt-8 left-5 dark:text-black text-white bg-black hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-sm text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-white dark:hover:bg-zinc-200 dark:focus:ring-zinc-800 ease-in-out duration-300"

                onClick={handleNextStep}>Next</button>}
        </div>
    )
}

export default InvoiceMain