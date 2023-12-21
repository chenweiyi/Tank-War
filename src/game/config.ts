import { IEnemyDirectionProperty, IKeyBindMove, ITankDirectionProperty } from '../game'

export const ENEMY_KILL_EACH_OTHER = false
export const PLAYER_KILL_EACH_OTHER = false
// canvas
export const CANVAS_WIDTH = 800
export const CANVAS_HEIGHT = 600

// tank
export const TANK_SPEED = 4
export const TANK_BULLET_COLOR = '#fff'
export const TANK_SCALE = 1.2

// player1
export const PLAY1_SPEED = 6
export const PLAY1_DIRECTION = 'down'
export const PLAY1_BULLET_COLOR = 'rgb(83,197,128)'
export const PLAY1_DIRECTION_PROPERTY: ITankDirectionProperty = {
  up: [771, 3, 26, 26],
  down: [835, 3, 26, 26],
  left: [867, 3, 26, 26],
  right: [803, 3, 26, 26],
}
export const PLAY1_KEYBINDING: IKeyBindMove = {
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  shot: ' ',
}

// player2
export const PLAY2_SPEED = 6
export const PLAY2_DIRECTION = 'down'
export const PLAY2_BULLET_COLOR = 'rgb(230,162,60)'
export const PLAY2_DIRECTION_PROPERTY: ITankDirectionProperty = {
  up: [643, 3, 26, 26],
  down: [707, 3, 26, 26],
  left: [739, 3, 26, 26],
  right: [675, 3, 26, 26],
}

export const PLAY2_KEYBINDING: IKeyBindMove = {
  up: 'w',
  down: 's',
  left: 'a',
  right: 'd',
  shot: 'y',
}

// enemy
export const ENEMY_DIRECTION_PROPERTY: IEnemyDirectionProperty = {
  red: {
    up: [3, 1, 26, 30],
    down: [67, 1, 26, 30],
    left: [97, 3, 30, 26],
    right: [33, 3, 30, 26],
  },
  midRed: {
    up: [3, 97, 26, 30],
    down: [67, 97, 26, 30],
    left: [97, 99, 30, 26],
    right: [33, 99, 30, 26],
  },
  bigRed: {
    up: [3, 225, 26, 30],
    down: [67, 225, 26, 30],
    left: [97, 227, 30, 26],
    right: [33, 227, 30, 26],
  },
  sliver: {
    up: [131, 1, 26, 30],
    down: [195, 1, 26, 30],
    left: [225, 3, 30, 26],
    right: [161, 3, 30, 26],
  },
  midSliver: {
    up: [131, 97, 26, 30],
    down: [195, 97, 26, 30],
    left: [225, 99, 30, 26],
    right: [161, 99, 30, 26],
  },
  bigSliver: {
    up: [131, 225, 26, 30],
    down: [195, 225, 26, 30],
    left: [225, 227, 30, 26],
    right: [161, 227, 30, 26],
  },
  brown: {
    up: [387, 1, 26, 30],
    down: [451, 1, 26, 30],
    left: [481, 3, 30, 26],
    right: [417, 3, 30, 26],
  },
  midBrown: {
    up: [387, 97, 26, 30],
    down: [451, 97, 26, 30],
    left: [481, 99, 30, 26],
    right: [417, 99, 30, 26],
  },
  bigBrown: {
    up: [387, 225, 26, 30],
    down: [451, 225, 26, 30],
    left: [481, 227, 30, 26],
    right: [417, 227, 30, 26],
  },
}

export const ENEMY_COLLISION_INTERVAL = 500
export const ENEMY_SPEED = 2
export const ENEMY_BULLET_COLOR = '#fff'
export const ENEMY_RANDOM_MOVE_WAIT_TIME_PERIOD = [1000, 3000]
export const ENEMY_AUTO_SHOT_WAIT_TIME_PERIOD = [1000, 6000]
export const ENEMY_BULLET_SPEED = 6

// prop
export const PROP_SCALE = 1

// brick
export const BRICK_SCALE = 1
