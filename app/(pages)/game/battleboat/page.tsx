'use client'
import wsHandlerHub from '@/modules/wsHandlerHub'
import ws from '@/utils/ws'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Game() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!wsHandlerHub.private || !wsHandlerHub.address) {
      router.replace('/game')
    }

    // if (ws.socket?.readyState === 3) {
    ws.connect()
    // }
    ws.send(wsHandlerHub.address)

    setLoading(true)
    ws.onMessage((data) => {
      setLoading(false)
      wsHandlerHub.handleHub(data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsHandlerHub.private])

  return (
    <>
      <div className={(loading ? '' : 'hidden') + ' mt-12 text-center'}>Waiting to match the opponent......</div>
      <div className={(loading ? 'hidden' : '') + ' battleboat'}>
        {/* <div className='font-bold'>
          <span className='capitalize'>opponent: </span>
          {wsHandlerHub.opponent}
        </div> */}
        <p className='py-5 text-3xl font-bold'>How to play</p>
        <ol className='instructions list-disc'>
          <li id='step1'>Select your ships from the left-hand side</li>
          <li id='step2'>Place your ships on your map</li>
          <li id='step3'>
            {"Click on the cells of the enemy's map"}
            <br />
            to find and destroy all four enemy ships
          </li>
          <li id='step4'>
            The opponent will fire on your ships
            <br />
            immediately after you fire on his ships.
          </li>
        </ol>
        <div className='game-container'>
          <div id='restart-sidebar' className='hidden'>
            <h2>Try Again</h2>
            {/* <button id='restart-game'>Restart Game</button> */}
            <Link id='restart-game' className='block rounded-xl p-4' href={'/game'}>
              Restart Game
            </Link>
          </div>
          <div id='roster-sidebar'>
            <h2>Place Your Ships</h2>
            <ul className='fleet-roster'>
              <li id='patrolboat'>Patrol Boat</li>
              <li id='destroyer'>Destroyer</li>
              <li id='battleship'>Battleship</li>
              <li id='carrier'>Aircraft Carrier</li>
            </ul>
            <div id='wait-start' className='hidden'>
              The opponent is preparing!
            </div>
            <button id='rotate-button' data-direction='0'>
              Rotate Ship
            </button>
            <button id='start-game' className='hidden'>
              Start Game
            </button>
            <button id='place-randomly'>Place Randomly</button>
          </div>
          <div id='stats-sidebar' className='hidden'>
            <h2>Stats</h2>
            <p>
              <strong>Games Won</strong>
            </p>
            <p id='stats-wins'>0 of 0</p>
            <p>
              <strong>Accuracy</strong>
            </p>
            <p id='stats-accuracy'>0%</p>
            <button id='reset-stats'>Reset Stats</button>
            <button id='prob-heatmap' className='hidden'>
              Show Probability Heatmap
            </button>
          </div>
          <div className='grid-container'>
            <h2 className='mb-7 text-2xl font-bold leading-10'>Your Fleet</h2>
            <div className='human-player grid1 mx-auto'>
              <span className='no-js'>Please enable JavaScript to play this game</span>
            </div>
          </div>
          <div className='grid-container'>
            <h2 className='mb-7 text-2xl font-bold leading-10'>Enemy Fleet</h2>
            <div className='computer-player grid1 mx-auto'>
              <span className='no-js'>Please enable JavaScript to play this game</span>
            </div>
          </div>
          <div id='data-feed' className='flex h-[373px] flex-col space-y-1 overflow-y-auto overflow-x-hidden'>
            <h2>Data Feed</h2>
          </div>
        </div>
      </div>
      <div id='loading' className='fixed bottom-0 left-0 right-0 top-0 hidden bg-black opacity-20'>
        <div className='flex h-full w-full items-center justify-center bg-transparent text-black'>
          <svg
            className='-ml-1 mr-3 h-10 w-10 animate-spin text-[#ff9200]'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
        </div>
      </div>
    </>
  )
}
