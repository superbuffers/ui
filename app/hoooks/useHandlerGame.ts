import { useState } from 'react'

const useHandlerGame = () => {
  const [data, setData] = useState({
    role: '',
    opponent: ''
  })

  const setRole = ([operation, data]: [string, any]) => {
    setData({
      role: operation,
      opponent: data
    })
  }

  const onOffer = () => {}

  return {
    setRole,
    ...data
  }
}

export { useHandlerGame }
// import ws from '@/utils/ws'
