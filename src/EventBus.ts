interface IEvent {
  name: string
  target?: any
  cbs: Set<Function>
  once: boolean
}

interface IEventOnEvent {
  eventName: string
  func: Function
  target?: any
  once?: boolean
}

interface IEventEmitEvent {
  eventName: string
  target?: any
  [str: string]: any
}

interface IEventOffEvent {
  eventName: string
  func?: Function
  target?: any
}

interface IEventOnceEvent {
  eventName: string
  func: Function
  target?: any
}

export default class EventBus {
  events: IEvent[] = []
  constructor(events: IEvent[] = []) {
    this.events = events
  }

  on({ eventName, func, target, once = false }: IEventOnEvent) {
    let event = this.events.find((e) => e.name === eventName)
    if (!event) {
      event = { name: eventName, cbs: new Set(), target, once }
    }
    if (target) {
      event = this.events.find((e) => e.name === eventName && e.target === target)
    }
    if (!event) {
      event = { name: eventName, cbs: new Set(), target, once }
      this.events.push(event)
    }
    event.cbs.add(func)
  }

  emit(params: IEventEmitEvent) {
    const { eventName, target, ...args } = params
    let events = this.events.filter((e) => e.name === eventName)
    if (target) {
      const event = this.events.find((e) => e.name === eventName && e.target === target)
      events = event ? [event] : []
    }
    try {
      events.forEach((event) => {
        event.cbs.forEach((cb) => {
          cb(args)
        })
      })
    } catch (e) {
      console.error(e)
    } finally {
      events.forEach((event) => {
        if (event.once) {
          this.off({ eventName })
        }
      })
    }
  }

  off({ eventName, func, target }: IEventOffEvent) {
    let events = this.events.filter((e) => e.name === eventName)
    if (target) {
      const event = this.events.find((e) => e.name === eventName && e.target === target)
      events = event ? [event] : []
    }

    if (func === undefined) {
      this.events = this.events.filter((e) => events.indexOf(e) === -1)
    } else {
      events.forEach((event) => {
        event.cbs.has(func) && event.cbs.delete(func)
      })
    }
  }

  once({ eventName, func, target }: IEventOnceEvent) {
    this.on({ eventName, func, target, once: true })
  }
}
