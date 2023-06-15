'use client'

import { useEffect } from 'react'

export default function GameVideo() {
  return (
    <iframe
      className='container my-auto mt-20 aspect-video'
      src='https://www.youtube.com/embed/8qvWNe42-cE'
      frameBorder='0'
      allowFullScreen
    ></iframe>
  )
}
