import { IDirection, IKeyBindMove, ITankDirectionProperty } from '../game'
import Tank from './Tank'

export default class Player1 extends Tank {
  directionProperty: ITankDirectionProperty = {
    up: [643, 3, 26, 26],
    down: [707, 3, 26, 26],
    left: [739, 3, 26, 26],
    right: [675, 3, 26, 26],
  }
  keybindMoveConfig: IKeyBindMove = {
    up: 'w',
    down: 's',
    left: 'a',
    right: 'd',
    shot: 'y',
  }
  constructor({
    x,
    y,
    speed = 6,
    direction = 'down',
    bulletColor = 'rgb(230,162,60)',
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
}
