'use client'
import wsHandlerHub from '@/modules/wsHandlerHub'
import ws from '@/utils/ws'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import __wbg_init, { publicKey } from 'js-snarkvm'
import { useRouter } from 'next/navigation'

// aleo14rc9xfqavks0s8y6ehuev3prh9cu2etrk6c2dtxmp9e90qs86vgqf2jn08
export default function Game() {
  const router = useRouter()
  const [pk, setPk] = useState('')

  useEffect(() => {
    ws.close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsHandlerHub.private])

  const goToDashbord = async () => {
    await __wbg_init()
    const address = publicKey(pk).replaceAll('"', '')

    wsHandlerHub.address = address
    wsHandlerHub.private = pk

    router.push('/game/battleboat')
  }

  return (
    <div className='container'>
      <div className='flex flex-col items-center justify-center p-28'>
        <div className='text-4xl font-bold'>Please enter your address</div>

        <input
          className='my-12 h-10 w-[400px] rounded-full px-3 py-2 text-[#273167] ring-2 ring-[#273167]'
          type='text'
          value={pk}
          placeholder='Private Key'
          onChange={(e) => setPk(e.target.value)}
        />

        <button
          className={'rounded-full bg-[#FFB300] px-10 py-4 capitalize text-[#273167] hover:text-[#FFF]'}
          onClick={goToDashbord}
        >
          enter the game
        </button>
      </div>

      {/* <div className='flex flex-col items-center justify-center p-28'>
        <div className='mb-12 text-4xl font-bold'>Please connect Leo Wallet</div>
        <WalletMultiButton />
        {connected && publicKey && (
          <Link
            className={'mt-12 rounded-full bg-[#FFB300] px-10 py-4 capitalize text-[#273167] hover:text-[#FFF]'}
            href={`/game/${publicKey}`}
          >
            enter the game
          </Link>
        )}
      </div> */}
    </div>
  )
}
