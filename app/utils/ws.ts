type Timeout = ReturnType<typeof setTimeout>
type Interval = ReturnType<typeof setInterval>
type Nullable<T> = T | null

const baseURL = 'ws://192.168.200.25:3000/battleship'
const reconnectMaxCount = 3
const message = 'aleo14rc9xfqavks0s8y6ehuev3prh9cu2etrk6c2dtxmp9e90qs86vgqf2jn08'
const interval = 3000
const timeout = 1000
type AutoReconnect = {
  reconnectMaxCount?: number
}
type Heartbeat = {
  message: string
  interval: number
}

export interface IWSOptions {
  autoReconnect: boolean | AutoReconnect
  heartbeat: boolean | Heartbeat
  query: Record<string, string>
}

class WS {
  url: string
  socket: WebSocket | null = null
  reconnectCount = 0
  delay: Nullable<Timeout> = null
  timer: Nullable<Interval> = null
  autoReconnect: IWSOptions['autoReconnect']
  heartbeat: IWSOptions['heartbeat']
  query: IWSOptions['query']
  constructor(url?: string, options?: IWSOptions) {
    const { autoReconnect = true, query = {}, heartbeat = false } = options || {}
    this.autoReconnect = autoReconnect
    this.heartbeat = heartbeat
    this.query = query
    this.url = url || baseURL
    this.connect()
  }

  connect(): void {
    this.close()
    this.socket = new WebSocket(this.url)
    this.onError()
    this.onOpen()
  }

  onOpen(): void {
    if (this.socket) {
      this.socket.onopen = () => {
        console.log('[open] Connection established')
      }
    }
  }

  onError(): void {
    if (this.socket) {
      this.socket.onerror = () => {
        const count = (this.autoReconnect as AutoReconnect)?.reconnectMaxCount || reconnectMaxCount
        if (this.autoReconnect && this.reconnectCount < count) {
          this.reconnectCount++
          this.connect()
        }
      }
    }
  }

  close(): void {
    this.socket && this.socket.close()
    this.delay && clearTimeout(this.delay)
    this.timer && clearInterval(this.timer)
    console.log(this.socket?.readyState)
    this.socket = null
  }

  onMessage(callback: (...data: any[]) => any): void {
    if (this.socket) {
      this.socket.onmessage = (data) => {
        try {
          const res = JSON.parse(data.data)
          callback(res)
        } catch (err) {
          callback(data)
        }
      }
    }
  }

  send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    if (!this.socket) return
    console.log('this.socket', this.socket)

    if (this.socket.readyState === this.socket.OPEN) {
      this.socket.send(data)
    } else if (this.socket.readyState === this.socket.CONNECTING) {
      this.delay = setTimeout(() => {
        this.socket?.send(data)
      }, timeout)
    } else {
      this.connect()
      this.delay = setTimeout(() => {
        this.socket?.send(data)
      }, timeout)
    }
  }
}

const ws = new WS()
export default ws
