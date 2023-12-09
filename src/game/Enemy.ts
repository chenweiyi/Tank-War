import {
  IDirection,
  IEnemyDirectionProperty,
  IEnemyTankType,
  INode,
  ITankDirectionProperty,
} from '../game'
import Bullet from './Bullet'
import Tank from './Tank'
import {
  ENEMY_AUTO_SHOT_WAIT_TIME_PERIOD,
  ENEMY_BULLET_COLOR,
  ENEMY_BULLET_SPEED,
  ENEMY_COLLISION_INTERVAL,
  ENEMY_DIRECTION_PROPERTY,
  ENEMY_RANDOM_MOVE_WAIT_TIME_PERIOD,
  ENEMY_SPEED,
} from './config'
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
  #enemyDirectionProperty: IEnemyDirectionProperty = ENEMY_DIRECTION_PROPERTY
  directionProperty: ITankDirectionProperty | undefined
  direction: IDirection
  #rqAF: number | undefined
  #timer: number | undefined
  #collisionInterval: number = ENEMY_COLLISION_INTERVAL
  #stopMove: boolean = false
  #shotTimer: NodeJS.Timeout | undefined = undefined

  constructor({
    enemyType,
    x,
    y,
    speed = ENEMY_SPEED,
    direction,
    bulletColor = ENEMY_BULLET_COLOR,
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
    await this.#wait(
      randomNumber(ENEMY_RANDOM_MOVE_WAIT_TIME_PERIOD[0], ENEMY_RANDOM_MOVE_WAIT_TIME_PERIOD[1]),
    )
    if (this._destroy) return
    this.#thinkNext()
    this.#randomMove()
  }

  async #autoShot() {
    await this.#wait(
      randomNumber(ENEMY_AUTO_SHOT_WAIT_TIME_PERIOD[0], ENEMY_AUTO_SHOT_WAIT_TIME_PERIOD[1]),
    )
    if (this._destroy) return
    const bullet = new Bullet(this.bulletColor, ENEMY_BULLET_SPEED, this)
    this.stage!.add(bullet)
    this.#autoShot()
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
