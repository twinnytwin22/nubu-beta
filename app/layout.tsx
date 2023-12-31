import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import NavBar from '@/ui/Navigation/NavBar'
import Providers from '@/lib/providers'
import { Footer } from '@/ui/Navigation/Footer'
import { getSiteSettings } from '@/lib/providers/sanity/sanity'
import Script from 'next/script'
import { Suspense } from 'react'
export const metadata = {
  title: 'CRIB',
  description: 'Connect. Revolutionize. Innovate. Boost.',
}



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const settings = await getSiteSettings()

  if (!settings) {
    return <p>Loading...</p>
  }
  return settings && (
    <html lang="en" suppressHydrationWarning>
      <Script strategy='worker' defer src="https://unpkg.com/@tinybirdco/flock.js" data-host="https://api.us-east.tinybird.co" data-token="p.eyJ1IjogIjU1OWM1NjJhLTNlNzYtNDA4Zi04OTBiLTIyMzUxOGU4Mzg1ZCIsICJpZCI6ICJiNTYyMDhjYi05Zjc2LTQ2NTUtODExOS01MjZiNmEwM2E2NjUiLCAiaG9zdCI6ICJ1c19lYXN0In0.cKSSXc8kLjuWDvICc2XoJ16NUwB0SKGCwufLTVxWujU"></Script>
      <body className='max-w-screen w-full relative bg-white dark:bg-black'>
        <Suspense>
        <Providers>
          <NavBar settings={settings} />
          <main className='relative'>
            <Suspense>
            {children}
            </Suspense>
            <ToastContainer theme='dark' />

          </main>

          <Footer settings={settings} />
        </Providers>
        </Suspense>
        </body>
    </html>
  )
}
