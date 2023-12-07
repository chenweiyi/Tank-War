import {
  IDirection,
  IEnemyDirectionProperty,
  IEnemyTankType,
  INode,
  ITankDirectionProperty,
} from '../game'
import Bullet from './Bullet'
import Tank from './Tank'
import { isBrick, isBullet, isTank, randomNumber } from './utils'

function getRandomDirection() {
  const directions: IDirection[] = ['up', 'down', 'left', 'right']
  return directions[Math.floor(Math.random() * directions.length)]
}

function getHumanizedRandomDirection(currentDirection: IDirection) {
  let res: IDirection
  let directions: IDirection[]
  switch (currentDirection) {
    case 'up':
      directions = ['left', 'right']
      res = directions[Math.floor(Math.random() * directions.length)]
      break
    case 'down':
      directions = ['left', 'right']
      res = directions[Math.floor(Math.random() * directions.length)]
      break
    case 'left':
      directions = ['up', 'down']
      res = directions[Math.floor(Math.random() * directions.length)]
      break
    case 'right':
      directions = ['up', 'down']
      res = directions[Math.floor(Math.random() * directions.length)]
      break
  }
  return res
}

function getRandomEnemyTankType() {
  const enemyTankTypes: IEnemyTankType[] = [
    'red',
    'midRed',
    'bigRed',
    'sliver',
    'midSliver',
    'bigSliver',
    'brown',
  ]
  return enemyTankTypes[Math.floor(Math.random() * enemyTankTypes.length)]
}

export default class Enemy extends Tank {
  #enemyDirectionProperty: IEnemyDirectionProperty = {
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
  directionProperty: ITankDirectionProperty | undefined
  direction: IDirection
  #rqAF: number | undefined
  #timer: number | undefined
  #collisionInterval: number = 500
  #stopMove: boolean = false
  #shotInterval = 3000
  #shotTimer: NodeJS.Timeout | undefined = undefined

  constructor({
    enemyType,
    x,
    y,
    speed = 2,
    direction,
    bulletColor = '#fff',
  }: {
    enemyType?: IEnemyTankType
    x: number
    y: number
    speed?: number
    direction?: IDirection
    bulletColor?: string
  }) {
    const enemyDirection = getRandomDirection()
    const enemyTankType = getRandomEnemyTankType()
    const type = enemyType || enemyTankType
    const direction0 = direction || enemyDirection
    super({ type, x, y, speed, direction: direction0, bulletColor })
    this.directionProperty = this.#enemyDirectionProperty[type]
    this.direction = direction0
    this.bindEvents()
  }

  init(ctx: CanvasRenderingContext2D, graghics: HTMLImageElement) {
    this.#moveByDirection()
    this.#autoShot()
    this.#randomMove()
  }

  #wait(time: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(1)
      }, time)
    })
  }

  async #randomMove() {
    await this.#wait(randomNumber(2000, 6000))
    this.#thinkNext()
    this.#randomMove()
  }

  #autoShot() {
    this.#shotTimer = setInterval(() => {
      const bullet = new Bullet(this.bulletColor, 6, this)
      this.stage!.add(bullet)
    }, this.#shotInterval)
  }

  #moveByDirection() {
    const move = () => {
      switch (this.direction) {
        case 'up':
          this.moveUp()
          break
        case 'down':
          this.moveDown()
          break
        case 'left':
          this.moveLeft()
          break
        case 'right':
          this.moveRight()
          break
      }
      if (!this.#stopMove) {
        this.#rqAF = requestAnimationFrame(move)
      }
    }
    this.#rqAF = requestAnimationFrame(move)
  }

  collisionOther(node: INode) {
    if (isBrick(node) || isTank(node)) {
      this.#thinkNext()
    } else if (isBullet(node) && node.source !== this) {
      this.destroy()
    }
  }

  collisionStage() {
    this.#thinkNext()
  }

  #thinkNext() {
    this.#stopMove = true
    if (this.#rqAF !== undefined) {
      cancelAnimationFrame(this.#rqAF)
      this.#rqAF = undefined
    }
    if (this.#timer !== undefined) {
      clearTimeout(this.#timer)
    }
    // @ts-ignore
    this.#timer = setTimeout(() => {
      this.#stopMove = false
      this.direction = getHumanizedRandomDirection(this.direction)
      this.#moveByDirection()
    }, this.#collisionInterval)
  }

  bindEvents(): void {}

  unbindEvents(): void {}

  destroy() {
    this.#rqAF !== undefined && cancelAnimationFrame(this.#rqAF)
    this.#timer !== undefined && clearTimeout(this.#timer)
    this.#shotTimer !== undefined && clearInterval(this.#shotTimer)
    this.stage!.destroy(this)
  }
}
