import EventBus from './helper/EventBusventBus'
import CountDown from './helper/CountDown'

declare global {
  interface Window {
    $eventBus: EventBus
    $CountDownGen: CountDown.gen
    $CountDownGen2: CountDown.gen2
  }
}
