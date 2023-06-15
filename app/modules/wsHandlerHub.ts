import ws from '@/utils/ws'
import a from './json.json'
import { startGame } from './test'

function WSHub(this: any) {
  this.role = ''
  this.opponent = ''
  this.actionSide = 'A'
  this.timeout = ''
  this.mainGame
  this.gamingIsRun = false
  this.round = 1
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

WSHub.prototype.handleHub = function (params: [string, any]) {
  if (!Array.isArray(params)) return
  console.log(params)

  const [operation, data] = params

  switch (operation) {
    case 'A':
      return this.setRole([operation, data])
    case 'B':
      return this.setRole([operation, data])
    // case 'initA':
    //   this.actionSide = operation.startsWith('A') ? 'A' : 'B'
    //   return this.initBoard([operation, data])
    // case 'BInitialize':
    //   this.actionSide = operation.startsWith('A') ? 'A' : 'B'
    //   return this.initBoard([operation, data])
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
  this.mainGame = startGame()
}

WSHub.prototype.initBoard = async function (u64: number[]) {
  const data = this.role === 'A' ? a.initA : a.initB
  await this.waitAction()

  ws.send(JSON.stringify(data))
}

WSHub.prototype.readyGame = async function (u64: number[]) {
  const data = this.role === 'A' ? a.AOffer : a.BStart

  if (this.role === this.actionSide) {
    ws.send(JSON.stringify(data))
  }
}

WSHub.prototype.saveShootCoord = async function (x: number, y: number) {
  this.x = x
  this.y = y

  const Astr: any = `ATurn${this.round}`
  const Bstr: any = `BTurn${this.round}`
  debugger
  const data = this.role === 'A' ? (a as any)[Astr] : (a as any)[Bstr]
  this.round += 1

  ws.send(JSON.stringify(data))
}

WSHub.prototype.shoot = async function (data: string[]) {
  const obj = handerToObj(data)

  if ((obj.prev_hit_or_miss === '0' || obj.prev_hit_or_miss === '1') && this.x && this.y) {
    this.mainGame.shoot(this.x, this.y, 1) // CONST.COMPUTER_PLAYER
  }

  if (obj.incoming_fire_coordinate) {
    const _0bNum = parseInt(obj.incoming_fire_coordinate).toString(2).padStart(64, '0')
    const index = _0bNum.split('').findIndex((item) => item === '1')

    this.mainGame.robot.shoot({
      x: Math.floor(index / 8),
      y: index % 8
    })
  }
}

const wsHandlerHub = new (WSHub as any)()
export default wsHandlerHub

const handerToObj = (str: any) => {
  const reg = /(u32|u64)?.public|(u32|u64)?.private|\n|\\n|"|'/g
  str = str[0].replace(reg, '')
  const data: any = {}

  str.split(/{|,|}/g).forEach((item: any) => {
    if (item) {
      const obj = item.split(':')
      data[obj[0].trim()] = obj[1].trim()
    }
  })

  return data
}
