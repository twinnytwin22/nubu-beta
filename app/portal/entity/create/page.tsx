import { PortalPageTitle } from '@/lib/hooks/PortalPageTitle'
import CreateEntityForm from '@/ui/Forms/CreateEntityForm'
import React from 'react'

function page() {
    return (
        <section className='w-full h-full mx-auto relative'>
                <div className='flex px-4 justify-between items-center h-fit w-full mb-3'>
                        <PortalPageTitle title='Create Entity' toolTip='Get ya mind right' />
                       
                    </div>
            <div className='relative flex min-h-full mx-auto w-full p-8'>
                <CreateEntityForm />
            </div>
        </section>
    )
}

export default page