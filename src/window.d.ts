import EventBus from './helper/EventBusventBus'

declare global {
  interface Window {
    $eventBus: EventBus
  }
}
