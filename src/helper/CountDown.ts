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
      func: this.#pause,
    })

    this.eventBus.on({
      eventName: 'resume',
      func: this.#resume,
    })
  }

  unBindEvent() {
    this.eventBus.off({
      eventName: 'pause',
      func: this.#pause,
    })

    this.eventBus.off({
      eventName: 'resume',
      func: this.#resume,
    })
  }

  #pause() {
    if (this.st === undefined) return
    if (this.remainSt === undefined || this.remainSt <= 0) {
      this.unBindEvent()
      return
    }
    const now = Date.now()
    if (now - this.st < this.remainSt) {
      this.remainSt = this.remainSt - (now - this.st)
      this.timer && clearTimeout(this.timer)
    }
  }

  #resume() {
    if (this.remainSt === undefined || this.remainSt <= 0) {
      this.unBindEvent()
      return
    }
    this.#start(this.remainSt)
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
