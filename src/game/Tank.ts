import { IDirection, IKeyBindMove, INode, ITankDirectionProperty, ITankType } from '../game'
import Bullet from './Bullet'
import EventSync from './EventSync'
import Stage from './Stage'
import {
  ENEMY_KILL_EACH_OTHER,
  PLAYER_KILL_EACH_OTHER,
  TANK_BULLET_COLOR,
  TANK_SCALE,
  TANK_SPEED,
} from './config'
import {
  isBrick,
  isBullet,
  isCollision,
  isEnemy,
  isKing,
  isPlayer,
  isSameType,
  isTank,
} from './utils'

export default class Tank extends EventSync {
  type: ITankType
  x: number
  y: number
  direction: IDirection
  speed: number = TANK_SPEED
  directionProperty: ITankDirectionProperty | undefined
  keybindMoveConfig: IKeyBindMove | undefined
  stage: InstanceType<typeof Stage> | undefined
  scale = TANK_SCALE
  bulletColor = TANK_BULLET_COLOR
  keydownList: Set<string> = new Set()
  keyHandlerInterval = 80
  keyIntervalTimer: NodeJS.Timeout | undefined
  _destroy = false
  _pause = false

  constructor({
    type,
    x,
    y,
    speed,
    direction,
    scale = TANK_SCALE,
    bulletColor = TANK_BULLET_COLOR,
  }: {
    type: ITankType
    x: number
    y: number
    speed: number
    direction: IDirection
    scale?: number
    bulletColor?: string
  }) {
    super()
    this.type = type
    this.x = x
    this.y = y
    this.speed = speed
    this.scale = scale
    this.direction = direction
    this.bulletColor = bulletColor
  }

  init(ctx: CanvasRenderingContext2D, graghics: HTMLImageElement) {
    this.bindEventBus()
  }

  addStage(stage: InstanceType<typeof Stage>) {
    this.stage = stage
  }

  getLeft() {
    return this.x
  }

  getRight() {
    return this.directionProperty
      ? this.x + this.directionProperty![this.direction]![2] * this.scale
      : this.x
  }

  getTop() {
    return this.y
  }

  getBottom() {
    return this.directionProperty
      ? this.y + this.directionProperty![this.direction]![3] * this.scale
      : this.y
  }

  /**
   * Being collision by someone else
   * @param { INode } node - collision node
   */
  gotCollision(node: INode) {
    if (node.type === 'bullet') {
      if (node.source !== this && !isSameType(this, node.source!)) {
        console.log('1', this.type, node.source!.type)
        this.destroy()
      } else if (
        node.source !== this &&
        isSameType(this, node.source!) &&
        isEnemy(this) &&
        // @ts-ignore
        ENEMY_KILL_EACH_OTHER === true
      ) {
        console.log('2', this.type, node.source!.type)
        this.destroy()
      } else if (
        node.source !== this &&
        isSameType(this, node.source!) &&
        isPlayer(this) &&
        // @ts-ignore
        PLAYER_KILL_EACH_OTHER === true
      ) {
        console.log('3', this.type, node.source!.type)
        this.destroy()
      }
    }
  }

  /**
   * collision other node
   * @param {INode} node - collision node
   */
  collisionOther(node: INode) {}

  /**
   * collision stage
   */
  collisionStage() {}

  draw(ctx: CanvasRenderingContext2D, graghics: HTMLImageElement) {
    if (this._destroy) return
    if (this.directionProperty) {
      ctx.drawImage(
        graghics,
        // @ts-ignore
        this.directionProperty[this.direction][0],
        // @ts-ignore
        this.directionProperty[this.direction][1],
        // @ts-ignore
        this.directionProperty[this.direction][2],
        // @ts-ignore
        this.directionProperty[this.direction][3],
        this.x,
        this.y,
        // @ts-ignore
        this.directionProperty[this.direction][2] * this.scale,
        // @ts-ignore
        this.directionProperty[this.direction][3] * this.scale,
      )
    } else {
      throw new Error(`type is [${this.type}]'s property is empty!`)
    }
  }

  moveUp() {
    this.direction = 'up'
    this.y -= this.speed
    const collision = isCollision(this, this.stage!.elements)
    if (collision) {
      if (isBrick(collision) || isTank(collision) || isKing(collision)) {
        // if collision restore y
        this.y += this.speed
        this.collisionOther(collision)
      } else if (isBullet(collision) && collision.source !== this) {
        this.collisionOther(collision)
        return
      }
    }
    if (this.getTop() < 0) {
      this.y = 0
      this.collisionStage()
    }
  }

  moveDown() {
    this.direction = 'down'
    this.y += this.speed
    const collision = isCollision(this, this.stage!.elements)
    if (collision) {
      if (isBrick(collision) || isTank(collision) || isKing(collision)) {
        // if collision restore y
        this.y -= this.speed
        this.collisionOther(collision)
      } else if (isBullet(collision) && collision.source !== this) {
        this.collisionOther(collision)
        return
      }
    }
    if (this.getBottom() > this.stage!.h) {
      this.y = this.stage!.h - this.directionProperty!.down![3] * this.scale
      this.collisionStage()
    }
  }

  moveLeft() {
    this.direction = 'left'
    this.x -= this.speed
    const collision = isCollision(this, this.stage!.elements)
    if (collision) {
      if (isBrick(collision) || isTank(collision) || isKing(collision)) {
        // if collision restore x
        this.x += this.speed
        this.collisionOther(collision)
      } else if (isBullet(collision) && collision.source !== this) {
        this.collisionOther(collision)
        return
      }
    }

    if (this.getLeft() < 0) {
      this.x = 0
      this.collisionStage()
    }
  }

  moveRight() {
    this.direction = 'right'
    this.x += this.speed
    const collision = isCollision(this, this.stage!.elements)
    if (collision) {
      if (isBrick(collision) || isTank(collision) || isKing(collision)) {
        // if collision restore x
        this.x -= this.speed
        this.collisionOther(collision)
      } else if (isBullet(collision) && collision.source !== this) {
        this.collisionOther(collision)
        return
      }
    }

    if (this.getRight() > this.stage!.w) {
      this.x = this.stage!.w - this.directionProperty!.right![2] * this.scale
      this.collisionStage()
    }
  }

  keydownMoveHandler(e: KeyboardEvent) {
    console.log('e: ', e.key)
    if (!this._pause) {
      this.keydownList.add(e.key)
    }
  }

  keydownShotHandler(e: KeyboardEvent) {
    console.log('e: ', e.key)
    if (!this._pause) {
      this.keydownList.add(e.key)
    }
  }

  keyupMoveHandler(e: KeyboardEvent) {
    console.log('e: ', e.key)
    if (!this._pause) {
      this.keydownList.delete(e.key)
    }
  }

  keyupShotHandler(e: KeyboardEvent) {
    console.log('e: ', e.key)
    if (!this._pause) {
      this.keydownList.delete(e.key)
    }
  }

  moveHandler(key: string) {
    switch (key) {
      case this.keybindMoveConfig!['up']:
        this.moveUp()
        break
      case this.keybindMoveConfig!['down']:
        this.moveDown()
        break
      case this.keybindMoveConfig!['left']:
        this.moveLeft()
        break
      case this.keybindMoveConfig!['right']:
        this.moveRight()
        break
    }
  }

  bindMove() {
    if (this.keybindMoveConfig) {
      document.addEventListener('keydown', this.keydownMoveHandler)
      document.addEventListener('keyup', this.keyupMoveHandler)
    } else {
      throw new Error(`type is [${this.type}]'s keybindMoveConfig is empty!`)
    }
  }

  shotHandler(key: string) {
    switch (key) {
      case this.keybindMoveConfig!['shot']: {
        const bullet = new Bullet(this.bulletColor, 6, this)
        this.stage!.add(bullet)
        break
      }
    }
  }

  bindShot() {
    if (this.keybindMoveConfig) {
      document.addEventListener('keydown', this.keydownShotHandler)
      document.addEventListener('keyup', this.keyupShotHandler)
    } else {
      throw new Error(`type is [${this.type}]'s keybindMoveConfig is empty!`)
    }
  }

  bindEvents() {
    this.keydownMoveHandler = this.keydownMoveHandler.bind(this)
    this.keyupMoveHandler = this.keyupMoveHandler.bind(this)
    this.keydownShotHandler = this.keydownShotHandler.bind(this)
    this.keyupShotHandler = this.keyupShotHandler.bind(this)
    this.bindMove()
    this.bindShot()

    if (this.keyIntervalTimer !== undefined) {
      clearInterval(this.keyIntervalTimer)
    }
    this.keyIntervalTimer = setInterval(() => {
      if (this.keydownList.size > 0) {
        for (const key of this.keydownList) {
          this.moveHandler(key)
          this.shotHandler(key)
        }
      }
    }, this.keyHandlerInterval)
  }

  unbindMove() {
    document.removeEventListener('keydown', this.keydownMoveHandler)
    document.removeEventListener('keyup', this.keyupMoveHandler)
  }

  unbindShot() {
    document.removeEventListener('keydown', this.keydownShotHandler)
    document.removeEventListener('keyup', this.keydownShotHandler)
  }

  unbindEvents() {
    this.unbindMove()
    this.unbindShot()
    if (this.keyIntervalTimer !== undefined) {
      clearInterval(this.keyIntervalTimer)
    }
  }

  destroy() {
    this.unbindEvents()
    this.unbindEventBus()
    this.stage!.destroy(this)
  }
}
