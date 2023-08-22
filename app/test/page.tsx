'use client'
import VideoConverter from '@/lib/providers/ffmpeg'
import React from 'react'

function TestPage() {
  return (
    <div className='h-screen place-items-center flex '>
      <div className='h-fit mx-auto relative'>
<VideoConverter/>
</div>
    </div>
  )
}

export default TestPage