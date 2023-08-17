import ClientDetails from '@/ui/Sections/Invoicing/ClientDetails'
//import InvoiceForm from '@/ui/Sections/Invoicing/InvoiceForm'
import SummaryTable from '@/ui/Sections/Invoicing/SummaryTable'
import React from 'react'
import InvoiceMain from '@/ui/Sections/Invoicing/InvoiceMain'
function page() {
    return (
        <div className='min-h-screen bg-zinc-100 dark:bg-black p-8 text-black dark:text-zinc-200 h-full w-full mx-auto content-center justify-center'>
            <div className='grid grid-cols-7 max-w-screen-2xl mx-auto place-items-start h-full'>
                <div className='col-span-4'>
                    <InvoiceMain />
                </div>
                <div className="border p-8 rounded-md mt-24 border-zinc-300 dark:border-zinc-900">
                    <ClientDetails />
                    <SummaryTable />
                </div>
            </div>
        </div>
    )
}

export default page