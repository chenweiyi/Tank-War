import { IDirection, IKeyBindMove, IPlayerDirectionProperty } from '../game'
import Tank from './Tank'

export default class Player1 extends Tank {
  speed: number = 4
  direction: IDirection = 'down'
  directionProperty: IPlayerDirectionProperty = {
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
  constructor(x: number, y: number, direction: IDirection = 'down') {
    super('player1', x, y, direction)
    this.bindEvents()
  }
}
