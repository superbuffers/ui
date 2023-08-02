'use client'
import wsHandlerHub from '@/modules/wsHandlerHub'
import ws from '@/utils/ws'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import __wbg_init, { publicKey as getPublicKey } from 'js-snarkvm'
import { useRouter } from 'next/navigation'
import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui'
import '@demox-labs/aleo-wallet-adapter-reactui/styles.css'
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import chainHandlerHub from '@/modules/chainHandlerHub'
import { DecryptPermission } from '@demox-labs/aleo-wallet-adapter-base'

// aleo14rc9xfqavks0s8y6ehuev3prh9cu2etrk6c2dtxmp9e90qs86vgqf2jn08
export default function Game() {
  const router = useRouter()
  const [pk, setPk] = useState('')
  const [opponent, setOpponent] = useState('')
  const { publicKey, connected } = useWallet()

  useEffect(() => {
    ws.close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsHandlerHub.private])

  const goUseSBBattleboat = () => {
    if (opponent && opponent.startsWith('aleo') && opponent.length === 63) {
      // chainHandlerHub.opponent = opponent

      // router.push('/game/use_SB_battleboat')
      router.push(`/game/${opponent}`)
    }
  }

  return (
    <div className='container'>
      <div className='flex flex-col items-center justify-center p-28'>
        <div className='mb-12 text-4xl font-bold'>Unuse SuperBuffers</div>
        <WalletMultiButton decryptPermission={DecryptPermission.UponRequest} />
        <label>
          <div className='mb-6 mt-12 text-center text-xl font-bold'>Please enter your opponent's address</div>
          <input
            className='h-10 w-[400px] rounded-full px-3 py-2 text-[#273167] ring-2 ring-[#273167]'
            type='text'
            value={opponent}
            onChange={(e) => setOpponent(e.target.value)}
          />
        </label>
        <button
          disabled={!connected || !publicKey}
          className={
            'mt-12 rounded-full bg-[#FFB300] px-10 py-4 capitalize text-[#273167] hover:text-[#FFF] disabled:bg-[#d7cdb5]'
          }
          onClick={goUseSBBattleboat}
        >
          enter the game
        </button>
      </div>
    </div>
  )
}
