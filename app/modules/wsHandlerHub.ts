import ws from '@/utils/ws'
import { startGame } from './battleboat'
import __wbg_init, { authorize } from 'js-snarkvm'
import Decimal from 'decimal.js'

const SERVER = 'http://192.168.200.25:3030'

function WSHub(this: any) {
  this.role = ''
  this.opponent = ''
  this.actionSide = 'A'
  this.timeout = ''
  this.mainGame
  this.gamingIsRun = false
  this.stateRecord = null
  this.moveRecord = null
  this.winning = false
}

WSHub.prototype.loading = function () {
  const dom = document.getElementById('loading')
  if (!dom) return
  dom.style.display = 'block'
}

WSHub.prototype.closeLoading = function () {
  const dom = document.getElementById('loading')
  if (!dom) return
  dom.style.display = 'none'
}

WSHub.prototype.waitAction = function () {
  return new Promise((reslove) => {
    const fetch = () => {
      if (this.role !== this.actionSide) {
        this.timeout = setTimeout(() => {
          clearTimeout(this.timeout)
          fetch()
        }, 1000)
      } else {
        clearTimeout(this.timeout)
        this.actionSide = this.actionSide === 'A' ? 'B' : 'A'
        reslove('')
      }
    }
    fetch()
  })
}

WSHub.prototype.handleHub = function (params: any) {
  let type

  if (params.Start) {
    type = 'Start'
    params = params.Start
  } else if (params.GameStatus) {
    type = 'GameStatus'
    params = params.GameStatus
  } else if (params.TxID) {
    const dom = document.getElementById('data-feed')
    const anchor = document.createElement('a')
    anchor.href = `${SERVER}/testnet3/transaction/${params.TxID}`
    anchor.title = params.TxID
    anchor.className = 'hover:underline'
    anchor.target = '_black'
    anchor.innerText = params.TxID.slice(0, 8) + '...' + params.TxID.slice(params.TxID.length - 8, params.TxID.length)
    dom?.scrollIntoView(false)

    dom?.appendChild(anchor)

    return
  }

  if (!Array.isArray(params)) return

  const [operation, data] = params

  if (Array.isArray(data) && data[0]) {
    const obj = handerToObj(data[0])
    const reg = /\n|\\n|"|'/g
    const record = data[0].replace(reg, '')

    if (obj.played_tiles !== undefined) {
      this.stateRecord = record
    } else {
      this.moveRecord = record
    }
  }

  switch (operation) {
    case 'A':
      return this.setRole([operation, data])
    case 'B':
      return this.setRole([operation, data])
    case 'AOffer':
      this.actionSide = operation.startsWith('A') ? 'A' : 'B'
      return this.readyGame([operation, data])
    case 'BStart':
      this.actionSide = operation.startsWith('A') ? 'A' : 'B'
      return this.readyGame([operation, data])
    case 'ATurn':
      this.actionSide = operation.startsWith('A') ? 'A' : 'B'
      if (!this.gamingIsRun) {
        this.mainGame.startGame()
      } else {
        this.shoot(data)
      }
      this.gamingIsRun = true
      return
    case 'BTurn':
      this.actionSide = operation.startsWith('A') ? 'A' : 'B'
      if (this.gamingIsRun) {
        this.shoot(data)
      }
      this.gamingIsRun = true
      return
    default:
      this.actionSide = operation.startsWith('A') ? 'A' : 'B'
  }
}

WSHub.prototype.setRole = function ([operation, data]: [string, any]) {
  this.role = operation
  this.opponent = data

  this.mainGame = startGame(wsHandlerHub)
}

WSHub.prototype.initBoard = async function (u64: number[]) {
  this.loading()

  u64.reverse()
  console.log(u64)

  const inputs = u64.map((item) => `${item}u64`)

  await __wbg_init()

  inputs.push(this.opponent)

  const request = await authorize(
    this.private,
    'battleship.aleo',
    'initialize_board',
    inputs,
    BigInt(Math.random().toString().slice(2, 18)),
    SERVER
  )

  await this.waitAction()

  ws.send(request)
}

WSHub.prototype.readyGame = async function ([operation, res]: [string, any]) {
  if (this.role === this.actionSide) {
    let request

    if (operation.includes('AOffer')) {
      request = await authorize(
        this.private,
        'battleship.aleo',
        'offer_battleship',
        [this.stateRecord],
        BigInt(Math.random().toString().slice(2, 18)),
        SERVER
      )
    } else {
      console.log('start_battleship', [this.stateRecord, this.moveRecord])

      request = await authorize(
        this.private,
        'battleship.aleo',
        'start_battleship',
        [this.stateRecord, this.moveRecord],
        BigInt(Math.random().toString().slice(2, 18)),
        SERVER
      )
    }

    ws.send(request)
    this.closeLoading()
  }
}

WSHub.prototype.saveShootCoord = async function (x: number, y: number) {
  this.loading()
  this.x = x
  this.y = y

  let u64Arr = new Array(64).fill(0)
  u64Arr[this.x * 8 + this.y] = 1

  const shoot_u64 = new Decimal(`0b${u64Arr.join('')}`).toString()

  console.log('u64', this.x, this.y, shoot_u64)

  const request = await authorize(
    this.private,
    'battleship.aleo',
    'play',
    [this.stateRecord, this.moveRecord, shoot_u64 + 'u64'],
    BigInt(Math.random().toString().slice(2, 18)),
    SERVER
  )

  ws.send(request)
  this.closeLoading()
}

WSHub.prototype.shoot = async function (data: string[]) {
  if (this.winning) return
  const obj = handerToObj(data[0])

  if (obj.prev_hit_or_miss && this.x !== undefined && this.y !== undefined) {
    this.mainGame.shoot(this.x, this.y, 1, obj.prev_hit_or_miss !== '0') // CONST.COMPUTER_PLAYER
  }

  if (obj.incoming_fire_coordinate) {
    const _0bNum = new Decimal(obj.incoming_fire_coordinate).toBinary().substring(2).padStart(64, '0')
    const index = _0bNum.split('').findIndex((item) => item === '1')

    this.mainGame.robot.shoot({
      x: Math.floor(index / 8),
      y: index % 8
    })
  }
}

const wsHandlerHub = new (WSHub as any)()
export default wsHandlerHub

const handerToObj = (str: string) => {
  const reg = /(u32|u64)?.public|(u32|u64)?.private|\n|\\n|"|'/g
  str = str.replace(reg, '')
  const data: any = {}

  str.split(/{|,|}/g).forEach((item: any) => {
    if (item) {
      const obj = item.split(':')
      data[obj[0].trim()] = obj[1].trim()
    }
  })

  return data
}
