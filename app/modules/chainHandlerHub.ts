import ws from '@/utils/ws'
import { startGame } from './battleboat'
import Decimal from 'decimal.js'
import toast from 'react-hot-toast'
import { AleoNetworkClient, Block } from '@aleohq/sdk'
import { Transaction, WalletAdapterNetwork } from '@demox-labs/aleo-wallet-adapter-base'

const waitTime = (ms = delayTime): Promise<any> => {
  return new Promise((reslove) => {
    setTimeout(() => {
      reslove('')
    }, ms)
  })
}

const baseURL = 'https://vm.aleo.org/api'
const public_connection = new AleoNetworkClient(baseURL)
const programId = 'battleship1.aleo'
const fee = 4_100_000
const delayTime = 5000

enum Step {
  'initialize_board',
  'offer_battleship',
  'start_battleship',
  'play'
}

const getTransactionStatus = async (txId: string) => {
  let timeout: any
  const fetch = () => {
    ;(window as any).leoWallet.transactionStatus(txId).then(({ status }: any) => {
      console.log('status', status)

      if (status === 'Failed') {
        toast.error('Failed')
        clearTimeout(timeout)
      } else {
        timeout = setTimeout(() => {
          clearTimeout(timeout)
          fetch()
        }, 1000)
      }
    })
  }
  fetch()
}

function ChainHandler(this: any) {
  this.role = ''
  this.opponent = ''
  this.actionSide = 'A'
  this.timeout = ''
  this.mainGame
  this.gamingIsRun = false
  this.stateRecord = null
  this.moveRecord = null
  this.winning = false
  this.step = 0
  this.proxy = new Proxy(
    {},
    {
      set: (obj: any, prop: any, value: any) => {
        const { cipherText, programFunction } = value

        ;(window as any).leoWallet
          .decrypt(cipherText)
          .then((res: any) => {
            if (!this.role) {
              this.role = 'A'
            }

            let operation

            switch (this.step) {
              case 0:
                if (this.role === 'A') {
                  operation = 'AOffer'
                } else {
                  operation = 'BStart'
                }

                this.step += 1
                break
              case 1:
                // case 2:
                if (this.role === 'A') {
                  operation = 'ATurn'
                } else {
                  operation = 'BTurn'
                }
                break
              default:
                break
            }

            this.handleHub([operation, [res.text]])
          })
          .catch((err: any) => {
            if (!this.role) {
              this.role = 'B'
            }

            if (this.step) {
              toast.error(err + '')
              this.closeLoading()
              console.log(err)
            }
          })

        obj[prop] = value
        return true
      }
    }
  )
}

ChainHandler.prototype.loading = function () {
  const dom = document.getElementById('loading')
  if (!dom) return
  dom.style.display = 'block'
}

ChainHandler.prototype.closeLoading = function () {
  const dom = document.getElementById('loading')
  if (!dom) return
  dom.style.display = 'none'
}

ChainHandler.prototype.waitAction = function () {
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

ChainHandler.prototype.handleHub = function (params: any) {
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
      this.readyGame([operation, data])
      this.actionSide = operation.startsWith('A') ? 'A' : 'B'
      break
    case 'BStart':
      this.readyGame([operation, data])
      this.actionSide = operation.startsWith('A') ? 'A' : 'B'
      break
    case 'ATurn':
      if (!this.gamingIsRun) {
        this.mainGame.startGame()
      } else {
        this.shoot(data)
      }
      this.gamingIsRun = true
      this.actionSide = operation.startsWith('A') ? 'A' : 'B'
      break
    case 'BTurn':
      if (this.gamingIsRun) {
        this.shoot(data)
      }
      this.gamingIsRun = true
      this.actionSide = operation.startsWith('A') ? 'A' : 'B'
      break
    default:
      this.actionSide = operation.startsWith('A') ? 'A' : 'B'
  }
}

ChainHandler.prototype.setRole = function ([operation, data]: [string, any]) {
  this.role = operation
}

ChainHandler.prototype.init = async function () {
  const latestHeight = await public_connection.getLatestHeight()

  this.height = latestHeight

  this.mainGame = startGame(chainHandlerHub)

  const fetch = () => {
    public_connection
      .getBlock(this.height)
      .then((block) => {
        const transactions = (block as Block)?.transactions ?? []

        for (let j = 0; j < transactions.length; j++) {
          const transaction = transactions[j]

          if (transaction.type === 'execute' && transaction.transaction?.execution?.transitions) {
            for (let z = 0; z < transaction.transaction.execution.transitions.length; z++) {
              const item = transaction.transaction.execution.transitions[z]

              if (item.program === programId) {
                const outputs = item?.outputs ?? []

                for (let index = 0; index < outputs.length; index++) {
                  const output = outputs[index]
                  if (output.type === 'record') {
                    const cipherText = output.value
                    this.proxy.record = { cipherText, programFunction: item.function }
                  }
                }
              }
            }
          }
        }

        this.height += 1
        waitTime(1000).then(() => fetch())
      })
      .catch(() => {
        waitTime(15000).then(() => fetch())
      })
  }

  fetch()
}

ChainHandler.prototype.initBoard = async function (u64: number[]) {
  this.loading()

  u64.reverse()
  console.log(u64)

  const inputs = u64.map((item) => `${item}u64`)
  inputs.push(this.opponent)

  const transaction = Transaction.createTransaction(
    (window as any).leoWallet.publicKey,
    WalletAdapterNetwork.Testnet,
    programId,
    Step[0],
    inputs,
    fee
  )

  const { transactionId } = await (window as any).leoWallet.requestTransaction(transaction)
  getTransactionStatus(transactionId)
}

ChainHandler.prototype.readyGame = async function ([operation, res]: [string, any]) {
  await this.waitAction()
  if (this.role === this.actionSide) {
    let transaction

    if (operation.includes('AOffer')) {
      transaction = Transaction.createTransaction(
        (window as any).leoWallet.publicKey,
        WalletAdapterNetwork.Testnet,
        programId,
        Step[1],
        [this.stateRecord],
        fee
      )
    } else {
      console.log('start_battleship', [this.stateRecord, this.moveRecord])
      transaction = Transaction.createTransaction(
        (window as any).leoWallet.publicKey,
        WalletAdapterNetwork.Testnet,
        programId,
        Step[2],
        [this.stateRecord, this.moveRecord],
        fee
      )
    }

    const { transactionId } = await (window as any).leoWallet.requestTransaction(transaction)

    getTransactionStatus(transactionId)

    this.closeLoading()
  }
}

ChainHandler.prototype.saveShootCoord = async function (x: number, y: number) {
  this.loading()
  this.x = x
  this.y = y

  let u64Arr = new Array(64).fill(0)
  u64Arr[this.x * 8 + this.y] = 1

  const shoot_u64 = new Decimal(`0b${u64Arr.join('')}`).toString()

  console.log('u64', this.x, this.y, shoot_u64)

  const transaction = Transaction.createTransaction(
    (window as any).leoWallet.publicKey,
    WalletAdapterNetwork.Testnet,
    programId,
    Step[3],
    [this.stateRecord, this.moveRecord, shoot_u64 + 'u64'],
    fee
  )

  const { transactionId } = await (window as any).leoWallet.requestTransaction(transaction)
  getTransactionStatus(transactionId)

  this.closeLoading()
}

ChainHandler.prototype.shoot = async function (data: string[]) {
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

const chainHandlerHub = new (ChainHandler as any)()
export default chainHandlerHub

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
