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
  ENEMY_KILL_EACH_OTHER,
  ENEMY_RANDOM_MOVE_WAIT_TIME_PERIOD,
  ENEMY_SPEED,
} from './config'
import { isBrick, isBullet, isKing, isSameType, isTank, randomNumber } from './utils'

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
    'midBrown',
    'bigBrown',
  ]
  return enemyTankTypes[Math.floor(Math.random() * enemyTankTypes.length)]
}

export default class Enemy extends Tank {
  #enemyDirectionProperty: IEnemyDirectionProperty = ENEMY_DIRECTION_PROPERTY
  directionProperty: ITankDirectionProperty | undefined
  direction: IDirection
  #rqAF: number | undefined
  #collisionInterval: number = ENEMY_COLLISION_INTERVAL
  _pause = false
  _wait = false

  constructor({
    enemyType,
    x,
    y,
    speed = ENEMY_SPEED,
    direction,
    bulletColor = ENEMY_BULLET_COLOR,
  }: {
    enemyType?: IEnemyTankType | 'random'
    x: number
    y: number
    speed?: number
    direction?: IDirection
    bulletColor?: string
  }) {
    const enemyDirection = getRandomDirection()
    const enemyTankType = getRandomEnemyTankType()
    const type = enemyType === 'random' || !enemyType ? enemyTankType : enemyType
    const direction0 = direction || enemyDirection
    super({ type, x, y, speed, direction: direction0, bulletColor })
    this.directionProperty = this.#enemyDirectionProperty[type]
    this.direction = direction0
    this.bindEvents()
  }

  init(ctx: CanvasRenderingContext2D, graghics: HTMLImageElement) {
    console.log('enemy init')
    this.bindEventBus()
    this.#moveByDirection()
    this.#autoShot()
    this.#randomMove()
  }
  pauseEventCallback() {}
  resumeEventCallback() {}

  async #randomMove() {
    window
      .$CountDownGen2(
        randomNumber(ENEMY_RANDOM_MOVE_WAIT_TIME_PERIOD[0], ENEMY_RANDOM_MOVE_WAIT_TIME_PERIOD[1]),
      )
      .then(() => {
        if (this._destroy) return
        if (this._pause) return
        this.#thinkNext().then(() => {
          this.#randomMove()
        })
      })
  }

  async #autoShot() {
    window
      .$CountDownGen2(
        randomNumber(ENEMY_AUTO_SHOT_WAIT_TIME_PERIOD[0], ENEMY_AUTO_SHOT_WAIT_TIME_PERIOD[1]),
      )
      .then(() => {
        if (this._destroy) return
        if (this._pause) return
        console.log('new bullet')
        const bullet = new Bullet(this.bulletColor, ENEMY_BULLET_SPEED, this)
        this.stage!.add(bullet)
        this.#autoShot()
      })
  }

  #moveByDirection() {
    const move = () => {
      // console.log('pause:', this._pause)
      if (this._destroy) return
      if (!this._pause && !this._wait) {
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
      }
      this.#rqAF = requestAnimationFrame(move)
    }
    this.#rqAF = requestAnimationFrame(move)
  }

  collisionOther(node: INode) {
    if (isBrick(node) || isTank(node) || isKing(node)) {
      this.#thinkNext()
    } else if (isBullet(node) && node.source !== this && !isSameType(node.source!, this)) {
      console.log('11', node.source?.type, this.type)
      this.destroy()
    } else if (
      isBullet(node) &&
      node.source !== this &&
      isSameType(node.source!, this) &&
      // @ts-ignore
      ENEMY_KILL_EACH_OTHER === true
    ) {
      console.log('22', node.source?.type, this.type)
      this.destroy()
    }
  }

  collisionStage() {
    this.#thinkNext()
  }

  #thinkNext() {
    this._wait = true
    return window.$CountDownGen2(this.#collisionInterval).then(() => {
      if (this._destroy) return
      if (this._pause) return
      this.direction = getHumanizedRandomDirection(this.direction)
      this._wait = false
    })
  }

  bindEvents(): void {}

  unbindEvents(): void {}

  destroy() {
    this.#rqAF !== undefined && cancelAnimationFrame(this.#rqAF)
    this.stage!.destroy(this)
  }
}
