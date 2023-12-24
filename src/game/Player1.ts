import { IDirection, IKeyBindMove, ITankDirectionProperty } from '../game'
import Tank from './Tank'
import {
  PLAY1_BULLET_COLOR,
  PLAY1_DIRECTION,
  PLAY1_DIRECTION_PROPERTY,
  PLAY1_KEYBINDING,
  PLAY1_SPEED,
} from './config'

export default class Player1 extends Tank {
  directionProperty: ITankDirectionProperty = PLAY1_DIRECTION_PROPERTY
  keybindMoveConfig: IKeyBindMove = PLAY1_KEYBINDING
  _pause = false
  constructor({
    x,
    y,
    speed = PLAY1_SPEED,
    direction = PLAY1_DIRECTION,
    bulletColor = PLAY1_BULLET_COLOR,
  }: {
    x: number
    y: number
    speed?: number
    direction?: IDirection
    bulletColor?: string
  }) {
    super({ type: 'player1', x, y, speed, direction, bulletColor })
    this.bindEvents()
  }

  pauseEventCallback() {
    this.keydownList.clear()
  }
}
