import { IDirection, IKeyBindMove, INode, ITankDirectionProperty, ITankType } from '../game'
import Bullet from './Bullet'
import Stage from './Stage'
import { isBrick, isBullet, isCollision, isTank } from './utils'

export default class Tank {
  type: ITankType
  x: number
  y: number
  direction: IDirection
  speed: number = 4
  directionProperty: ITankDirectionProperty | undefined
  keybindMoveConfig: IKeyBindMove | undefined
  stage: InstanceType<typeof Stage> | undefined
  scale = 1.2

  constructor({
    type,
    x,
    y,
    speed,
    direction,
    scale = 1.2,
  }: {
    type: ITankType
    x: number
    y: number
    speed: number
    direction: IDirection
    scale?: number
  }) {
    this.type = type
    this.x = x
    this.y = y
    this.speed = speed
    this.scale = scale
    this.direction = direction
  }

  init(ctx: CanvasRenderingContext2D, graghics: HTMLImageElement) {}

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
      this.destroy()
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
      if (isBrick(collision) || isTank(collision)) {
        // if collision restore y
        this.y += this.speed
        this.collisionOther(collision)
      } else if (isBullet(collision)) {
        this.destroy()
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
      if (isBrick(collision) || isTank(collision)) {
        // if collision restore y
        this.y -= this.speed
        this.collisionOther(collision)
      } else if (isBullet(collision)) {
        this.destroy()
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
      if (isBrick(collision) || isTank(collision)) {
        // if collision restore x
        this.x += this.speed
        this.collisionOther(collision)
      } else if (isBullet(collision)) {
        this.destroy()
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
      if (isBrick(collision) || isTank(collision)) {
        // if collision restore x
        this.x -= this.speed
        this.collisionOther(collision)
      } else if (isBullet(collision)) {
        this.destroy()
        return
      }
    }

    if (this.getRight() > this.stage!.w) {
      this.x = this.stage!.w - this.directionProperty!.right![2] * this.scale
      this.collisionStage()
    }
  }

  moveHandler(e: KeyboardEvent) {
    switch (e.key) {
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
      document.addEventListener('keydown', this.moveHandler)
    } else {
      throw new Error(`type is [${this.type}]'s keybindMoveConfig is empty!`)
    }
  }

  shotHandler(e: KeyboardEvent) {
    // console.log('key:', e.key)
    switch (e.key) {
      case this.keybindMoveConfig!['shot']: {
        const bullet = new Bullet(this.type === 'player1' ? '#fff' : 'rgb(230,162,60)', 6, this)
        this.stage!.add(bullet)
        break
      }
    }
  }

  bindShot() {
    if (this.keybindMoveConfig) {
      document.addEventListener('keydown', this.shotHandler)
    } else {
      throw new Error(`type is [${this.type}]'s keybindMoveConfig is empty!`)
    }
  }

  bindEvents() {
    this.moveHandler = this.moveHandler.bind(this)
    this.shotHandler = this.shotHandler.bind(this)
    this.bindMove()
    this.bindShot()
  }

  unbindMove() {
    document.removeEventListener('keydown', this.moveHandler)
  }

  unbindShot() {
    document.removeEventListener('keydown', this.shotHandler)
  }

  unbindEvents() {
    this.unbindMove()
    this.unbindShot()
  }

  destroy() {
    this.unbindEvents()
    this.stage!.destroy(this)
  }
}
