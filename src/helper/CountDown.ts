import EventBus from './EventBus'

export class CountDown {
  time: number
  callback: () => void
  eventBus: EventBus
  timer: NodeJS.Timeout | undefined
  st: number | undefined
  remainSt: number | undefined

  constructor(time: number, callback: () => void, eventBus: EventBus) {
    this.timer = undefined
    this.st = undefined
    this.time = time
    this.remainSt = time
    this.callback = callback
    this.eventBus = eventBus
    this.bindEvent()
  }

  bindEvent() {
    this.eventBus.on({
      eventName: 'pause',
      func: () => {
        if (this.st === undefined || this.remainSt === undefined || this.remainSt <= 0) return
        const now = Date.now()
        if (now - this.st < this.remainSt) {
          this.remainSt = this.remainSt - (now - this.st)
          this.timer && clearTimeout(this.timer)
        }
      },
    })

    this.eventBus.on({
      eventName: 'resume',
      func: () => {
        if (this.remainSt === undefined || this.remainSt <= 0) return
        this.#start(this.remainSt)
      },
    })
  }

  start() {
    this.#start(this.time)
  }

  #start(time: number) {
    this.st = Date.now()
    this.timer = setTimeout(() => {
      this.callback()
    }, time)
  }
}
