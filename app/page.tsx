import { getPageContent } from '@/lib/providers/sanity/sanity'
import { BizCard } from '@/ui/Cards/BusinessProfileCard'
import HomeHeader from '@/ui/Headers/HomeHeader'

import Overview from '@/ui/Sections/Overview'
import { headers } from 'next/headers'

import React from 'react'
export default async function Home () {
  const host = headers().get('host')
  const protocol = process?.env.NODE_ENV === 'development' ? 'http' : 'https'
  const res = await fetch(
    `${protocol}://${host}/api/v1/getAllOrgs?=refreshCache`,
    {
      method: 'GET',
      /// headers: { "Content-Type": "application/json" },
      cache: 'no-store'
    }
  )

  const data = await res.json()
  const content = await getPageContent()
  const section = content?.homePage?.sections

  if (content && section) {
    return (
      <main className='flex min-h-screen flex-col items-center justify-between  bg-white dark:bg-black  w-full max-w-screen'>
        <React.Fragment>
          <React.Suspense>
            <HomeHeader content={section[0]?.items[0]} />
            <Overview content={section[1]} />
          </React.Suspense>
          {data ? (
            <div className='max-w-screen-2xl w-full mx-auto mt-4'>
              <div className='flex items-center justify-center min-h-screen flex-wrap'>
                {data.map((entity: any) => (
                  <BizCard entity={entity} />
                ))}
                {/*JSON.stringify(data)*/}
              </div>
            </div>
          ) : (
            <div>NOTHING</div>
          )}
        </React.Fragment>
      </main>
    )
  } else {
    return (
      <div className='w-full h-screen'>
        <p>Loading...</p>
      </div>
    )
  }
}
