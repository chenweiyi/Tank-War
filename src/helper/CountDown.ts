import EventBus from './EventBus'

export default class CountDown {
  time: number
  callback: () => void
  eventBus: EventBus
  timer: NodeJS.Timeout | undefined
  st: number | undefined
  remainSt: number | undefined
  cycle: boolean
  p: Promise<any>
  resolve: (v: any) => void

  #pauseThis
  #resumeThis

  constructor(time: number, callback: () => void, eventBus: EventBus, cycle: boolean = false) {
    this.resolve = () => {}
    this.p = new Promise((res) => {
      this.resolve = res
    })
    this.timer = undefined
    this.st = undefined
    this.time = time
    this.remainSt = time
    this.callback = () => {
      callback()
      this.resolve(1)
    }
    this.eventBus = eventBus
    this.cycle = cycle
    this.#pauseThis = this.#pause.bind(this)
    this.#resumeThis = this.#resume.bind(this)
    this.bindEvent()
  }

  bindEvent() {
    this.eventBus.on({
      eventName: 'pause',
      func: this.#pauseThis,
    })

    this.eventBus.on({
      eventName: 'resume',
      func: this.#resumeThis,
    })
  }

  unBindEvent() {
    this.eventBus.off({
      eventName: 'pause',
      func: this.#pauseThis,
    })

    this.eventBus.off({
      eventName: 'resume',
      func: this.#resumeThis,
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
      if (this.cycle) {
        this.#start(this.time)
      }
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
      try {
        this.callback()
      } catch (error) {
        console.error(error)
      } finally {
        if (this.cycle) {
          this.#start(this.time)
        } else {
          this.unBindEvent()
        }
      }
    }, time)
  }

  static gen({
    time,
    eventBus,
    callback,
    cycle = false,
  }: {
    time: number
    eventBus: EventBus
    callback: () => void
    cycle?: boolean
  }) {
    const countDown = new CountDown(time, callback, eventBus, cycle)
    countDown.start()
    return countDown.p
  }

  static gen2(time: number, cycle = false) {
    const countDown = new CountDown(time, () => {}, window.$eventBus, cycle)
    countDown.start()
    return countDown.p
  }
}
