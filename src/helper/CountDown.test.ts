import { describe, beforeEach, afterEach, test, expect, vi, Mock } from 'vitest'
import CountDown from './CountDown'
import EventBus from './EventBus'

describe('CountDown', () => {
  let eventBus: EventBus
  let callback: Mock
  let countDown: CountDown

  beforeEach(() => {
    eventBus = new EventBus()
    callback = vi.fn()
    countDown = new CountDown(1000, callback, eventBus, true)
  })

  afterEach(() => {
    vi.clearAllMocks()
    countDown.unBindEvent()
  })

  test('should start the countdown and call callback after time elapses', () => {
    vi.useFakeTimers()
    countDown.start()
    vi.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalledTimes(1)
    vi.useRealTimers()
  })

  test('should pause the countdown when "pause" event is emitted', () => {
    vi.useFakeTimers()
    countDown.start()
    vi.advanceTimersByTime(500)
    eventBus.emit({
      eventName: 'pause',
    })
    vi.advanceTimersByTime(500)
    expect(callback).toHaveBeenCalledTimes(0)
    vi.useRealTimers()
  })

  test('should resume the countdown when "resume" event is emitted', () => {
    vi.useFakeTimers()
    countDown.start()
    vi.advanceTimersByTime(500)
    eventBus.emit({
      eventName: 'pause',
    })
    vi.advanceTimersByTime(500)
    eventBus.emit({
      eventName: 'resume',
    })
    vi.advanceTimersByTime(500)
    expect(callback).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(500)
    expect(callback).toHaveBeenCalledTimes(1)
    vi.useRealTimers()
  })

  test('should restart the countdown when "resume" event is emitted in cycle mode', () => {
    vi.useFakeTimers()
    countDown.start()
    vi.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalledTimes(1)
    eventBus.emit({
      eventName: 'pause',
    })
    vi.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalledTimes(1)
    eventBus.emit({
      eventName: 'resume',
    })
    vi.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalledTimes(2)
    vi.useRealTimers()
  })
})
