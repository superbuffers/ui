'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function GameVideo() {
  return (
    <div className='flex flex-col justify-center'>
      <iframe
        className='container my-20 aspect-video'
        src='https://www.youtube.com/embed/8qvWNe42-cE'
        frameBorder='0'
        allowFullScreen
      ></iframe>

      <Link
        className={
          'mx-auto rounded-full bg-[#FFB300] px-10 py-4 capitalize text-[#273167] hover:text-[#FFF] disabled:bg-[#d7cdb5]'
        }
        href='/game'
      >
        Play Unuse SuperBuffers Game
      </Link>
    </div>
  )
}
