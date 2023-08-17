import { getPageContent } from '@/lib/providers/sanity/sanity'
import HomeHeader from '@/ui/Headers/HomeHeader'
import Mission from '@/ui/Sections/Mission'
import OurTech from '@/ui/Sections/OurTech'
import Overview from '@/ui/Sections/Overview'
import Services from '@/ui/Sections/Services'
import SocialProof from '@/ui/Sections/SocialProof'
import React from 'react'
export default async function Home() {
  const content = await getPageContent()
  const section = content?.homePage?.sections

  if (content && section) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between  bg-white dark:bg-black  w-full max-w-screen">
        <React.Fragment>
          <React.Suspense>
            <HomeHeader content={section[0]?.items[0]} />
            <Overview content={section[1]} />
          </React.Suspense>


        </React.Fragment>

      </main>
    )
  }
  else {
    return (
      <div className='w-full h-screen'>
        <p>Loading...</p>
      </div>)
  }
}