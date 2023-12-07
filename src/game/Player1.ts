import { IDirection, IKeyBindMove, ITankDirectionProperty } from '../game'
import Tank from './Tank'

export default class Player1 extends Tank {
  directionProperty: ITankDirectionProperty = {
    up: [771, 3, 26, 26],
    down: [835, 3, 26, 26],
    left: [867, 3, 26, 26],
    right: [803, 3, 26, 26],
  }
  keybindMoveConfig: IKeyBindMove = {
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight',
    shot: ' ',
  }
  constructor({
    x,
    y,
    speed = 6,
    direction = 'down',
    bulletColor = 'rgb(83,197,128)',
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
}
