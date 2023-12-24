export default class EventSync {
  _pause = false
  _pauseEvent: () => void = () => {}
  _resumeEvent: () => void = () => {}

  bindEventBus() {
    this._pauseEvent = this.pauseEvent.bind(this)
    this._resumeEvent = this.resumeEvent.bind(this)
    window.$eventBus.on({
      eventName: 'pause',
      func: this._pauseEvent,
      target: this,
    })
    window.$eventBus.on({
      eventName: 'resume',
      func: this._resumeEvent,
      target: this,
    })
  }

  pauseEventCallback() {}
  resumeEventCallback() {}

  pauseEvent() {
    this._pause = true
    this.pauseEventCallback()
  }

  resumeEvent() {
    this._pause = false
    this.resumeEventCallback()
  }

  unbindEventBus() {
    window.$eventBus.off({
      eventName: 'pause',
      func: this._pauseEvent,
      target: this,
    })
    window.$eventBus.off({
      eventName: 'resume',
      func: this._resumeEvent,
      target: this,
    })
  }
}
