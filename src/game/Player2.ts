import { IDirection, IKeyBindMove, IPlayerDirectionProperty } from '../game'
import Tank from './Tank'

export default class Player1 extends Tank {
  speed: number = 4
  direction: IDirection = 'down'
  directionProperty: IPlayerDirectionProperty = {
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
  constructor(x: number, y: number, direction: IDirection = 'down') {
    super('player2', x, y, direction)
    this.bindEvents()
  }
}
