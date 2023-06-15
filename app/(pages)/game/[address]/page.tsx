'use client'
import wsHandlerHub from '@/modules/wsHandlerHub'
import ws from '@/utils/ws'
import { useEffect, useState } from 'react'

export default function Game({ params }: any) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // if (ws.socket?.readyState === 3) {
    ws.connect()
    // }
    ws.send(params.address)

    setLoading(true)
    ws.onMessage((data) => {
      setLoading(false)
      wsHandlerHub.handleHub(data)
    })
  }, [params.address])

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
            <button id='restart-game'>Restart Game</button>
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
        </div>
      </div>
    </>
  )
}
