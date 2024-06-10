import { describe, beforeEach, test, expect, vi } from 'vitest'
import EventBus from './EventBus'

describe('EventBus', () => {
  let eventBus: EventBus

  beforeEach(() => {
    eventBus = new EventBus()
  })

  test('should add an event listener and trigger it once', () => {
    const mockFunc = vi.fn()
    eventBus.once({ eventName: 'testEvent', func: mockFunc })
    eventBus.emit({ eventName: 'testEvent', data: 'testData' })
    expect(mockFunc).toHaveBeenCalledWith({
      data: 'testData',
    })
    eventBus.emit({ eventName: 'testEvent', data: 'testData' })
    expect(mockFunc).toHaveBeenCalledTimes(1)
  })

  test('should add an event listener and trigger it multiple times', () => {
    const mockFunc = vi.fn()
    eventBus.on({ eventName: 'testEvent', func: mockFunc })
    eventBus.emit({ eventName: 'testEvent', data: 'testData' })
    expect(mockFunc).toHaveBeenCalledWith({
      data: 'testData',
    })
    eventBus.emit({ eventName: 'testEvent', data: 'testData' })
    expect(mockFunc).toHaveBeenCalledTimes(2)
  })

  test('should remove an event listener', () => {
    const mockFunc = vi.fn()
    eventBus.on({ eventName: 'testEvent', func: mockFunc })
    eventBus.off({ eventName: 'testEvent', func: mockFunc })
    eventBus.emit({ eventName: 'testEvent', data: 'testData' })
    expect(mockFunc).toHaveBeenCalledTimes(0)
  })

  test('should remove all event listeners for a specific event', () => {
    const mockFunc1 = vi.fn()
    const mockFunc2 = vi.fn()
    eventBus.on({ eventName: 'testEvent', func: mockFunc1 })
    eventBus.on({ eventName: 'testEvent', func: mockFunc2 })
    eventBus.off({ eventName: 'testEvent' })
    eventBus.emit({ eventName: 'testEvent', data: 'testData' })
    expect(mockFunc1).toHaveBeenCalledTimes(0)
    expect(mockFunc2).toHaveBeenCalledTimes(0)
  })

  test('should remove all event listeners for a specific event and target', () => {
    const mockFunc1 = vi.fn()
    const mockFunc2 = vi.fn()
    eventBus.on({ eventName: 'testEvent', func: mockFunc1, target: 'target1' })
    eventBus.on({ eventName: 'testEvent', func: mockFunc2, target: 'target2' })
    eventBus.off({ eventName: 'testEvent', target: 'target1' })
    eventBus.emit({ eventName: 'testEvent', data: 'testData' })
    expect(mockFunc1).toHaveBeenCalledTimes(0)
    expect(mockFunc2).toHaveBeenCalledTimes(1)
  })
})
