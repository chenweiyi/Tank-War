import { IDirection, IKeyBindMove, ITankDirectionProperty } from '../game'
import Tank from './Tank'
import {
  PLAY2_BULLET_COLOR,
  PLAY2_DIRECTION,
  PLAY2_DIRECTION_PROPERTY,
  PLAY2_KEYBINDING,
  PLAY2_SPEED,
} from './config'

export default class Player2 extends Tank {
  directionProperty: ITankDirectionProperty = PLAY2_DIRECTION_PROPERTY
  keybindMoveConfig: IKeyBindMove = PLAY2_KEYBINDING
  _pause = false
  constructor({
    x,
    y,
    speed = PLAY2_SPEED,
    direction = PLAY2_DIRECTION,
    bulletColor = PLAY2_BULLET_COLOR,
  }: {
    x: number
    y: number
    speed?: number
    direction?: IDirection
    bulletColor?: string
  }) {
    super({ type: 'player2', x, y, speed, direction, bulletColor })
    this.bindEvents()
  }

  pauseEventCallback() {
    this.keydownList.clear()
  }
}
