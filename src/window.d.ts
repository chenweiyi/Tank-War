import EventBus from './EventBus'

declare global {
  interface Window {
    $eventBus: EventBus
  }
}
