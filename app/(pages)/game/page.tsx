'use client'
import ws from '@/utils/ws'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// aleo14rc9xfqavks0s8y6ehuev3prh9cu2etrk6c2dtxmp9e90qs86vgqf2jn08
export default function Game() {
  const [address, setAddress] = useState('')

  useEffect(() => {
    ws.close()
  }, [])

  return (
    <div className='container'>
      <div className='flex flex-col items-center justify-center p-28'>
        <div className='text-4xl font-bold'>Please enter your address</div>
        <input
          className='my-12 h-10 w-[400px] rounded-full px-3 py-2 text-[#273167] ring-2 ring-[#273167]'
          type='text'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <Link
          className={'rounded-full bg-[#FFB300] px-10 py-4 capitalize text-[#273167] hover:text-[#FFF]'}
          href={`/game/${address}`}
        >
          enter the game
        </Link>
      </div>
    </div>
  )
}
