import { IDirection, INode, IType } from '../game'
import EventSync from './EventSync'
import Stage from './Stage'
import Tank from './Tank'
import { ENEMY_KILL_EACH_OTHER, PLAYER_KILL_EACH_OTHER } from './config'
import {
  isBothTank,
  isBrick,
  isCollision,
  isEnemy,
  isKing,
  isPlayer,
  isProp,
  isSameType,
} from './utils'

const getShotBulletInitInfo = (source: InstanceType<typeof Tank>) => {
  const res: {
    direction: IDirection
    x: number
    y: number
  } = {
    direction: 'up',
    x: 0,
    y: 0,
  }
  switch (source.direction) {
    case 'up':
      res.direction = 'up'
      res.x = source.x + (source.directionProperty!.up![2] * source.scale) / 2
      res.y = source.y - 1
      break
    case 'down':
      res.direction = 'down'
      res.x = source.x + (source.directionProperty!.down![2] * source.scale) / 2
      res.y = source.y + source.directionProperty!.down![3] * source.scale + 1
      break
    case 'left':
      res.direction = 'left'
      res.x = source.x - 1
      res.y = source.y + (source.directionProperty!.left![3] * source.scale) / 2
      break
    case 'right':
      res.direction = 'right'
      res.x = source.x + source.directionProperty!.right![2] * source.scale + 1
      res.y = source.y + (source.directionProperty!.right![3] * source.scale) / 2
      break
  }
  return res
}

export default class Bullet extends EventSync {
  type: IType = 'bullet'
  color: string = '#fff'
  speed: number = 4
  r = 4
  x: number
  y: number
  direction: IDirection
  stage: InstanceType<typeof Stage> | undefined
  source: InstanceType<typeof Tank>
  _destroy = false

  constructor(color: string, speed: number, source: InstanceType<typeof Tank>) {
    super()
    this.color = color
    this.speed = speed
    this.source = source
    const { direction, x, y } = getShotBulletInitInfo(source)
    this.direction = direction
    this.x = x
    this.y = y
  }

  init(ctx: CanvasRenderingContext2D) {
    this.bindEventBus()
    this.#draw(ctx)
  }

  getLeft() {
    return this.x - this.r
  }

  getRight() {
    return this.x + this.r
  }

  getTop() {
    return this.y - this.r
  }

  getBottom() {
    return this.y + this.r
  }

  gotCollision(node: INode) {
    if (node !== this.source && !isSameType(this.source, node)) {
      this.destroy()
    } else if (
      node !== this.source &&
      isSameType(this.source, node) &&
      isEnemy(this.source) &&
      // @ts-ignore
      ENEMY_KILL_EACH_OTHER === true
    ) {
      this.destroy()
    } else if (
      node !== this.source &&
      isSameType(this.source, node) &&
      isPlayer(this.source) &&
      // @ts-ignore
      PLAYER_KILL_EACH_OTHER === true
    ) {
      this.destroy()
    }
  }

  #draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }

  addStage(stage: InstanceType<typeof Stage>) {
    this.stage = stage
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this._destroy) return
    if (this._pause) {
      this.#draw(ctx)
      return
    }
    switch (this.direction) {
      case 'up':
        this.y -= this.speed
        break
      case 'down':
        this.y += this.speed
        break
      case 'left':
        this.x -= this.speed
        break
      case 'right':
        this.x += this.speed
        break
    }
    let ele: INode | false
    if (this.y < 0 || this.y > this.stage!.h || this.x < 0 || this.x > this.stage!.w) {
      // out of stage
      this.destroy()
    } else if ((ele = isCollision(this, this.stage!.elements))) {
      if (ele !== this.source && (isBrick(ele) || isKing(ele))) {
        this.destroy()
      } else if (
        ele !== this.source &&
        isEnemy(ele) &&
        isSameType(this.source, ele) &&
        // @ts-ignore
        ENEMY_KILL_EACH_OTHER === true
      ) {
        this.destroy()
      } else if (
        ele !== this.source &&
        isPlayer(ele) &&
        isSameType(this.source, ele) &&
        // @ts-ignore
        PLAYER_KILL_EACH_OTHER === true
      ) {
        this.destroy()
      } else if (
        ele !== this.source &&
        !isSameType(this.source, ele) &&
        isBothTank(this.source, ele)
      ) {
        this.destroy()
      }
    } else {
      this.#draw(ctx)
    }
  }

  destroy() {
    this.unbindEventBus()
    this.stage!.destroy(this)
  }
}
