import { IDirection, IKeyBindMove, INode, IPlayerDirectionProperty, IPlayerType } from '../game'
import Bullet from './Bullet'
import Stage from './Stage'
import { isCollision } from './utils'

export default class Tank {
  type: IPlayerType
  x: number
  y: number
  direction: IDirection
  speed: number = 4
  directionProperty: IPlayerDirectionProperty | undefined
  keybindMoveConfig: IKeyBindMove | undefined
  stage: InstanceType<typeof Stage> | undefined
  scale = 1.2

  constructor(type: IPlayerType, x: number, y: number, direction: IDirection) {
    this.type = type
    this.x = x
    this.y = y
    this.direction = direction
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
      this.destroy()
    } else if (node.type === 'brick' || node.type === 'player1' || node.type === 'player2') {
      // do nothing
    }
  }

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

  moveHandler(e: KeyboardEvent) {
    // console.log('key:', e.key)
    let collision: INode | false
    switch (e.key) {
      case this.keybindMoveConfig!['up']:
        this.direction = 'up'
        this.y -= this.speed
        collision = isCollision(this, this.stage!.elements)
        if (collision) {
          if (
            collision.type === 'brick' ||
            collision.type === 'player1' ||
            collision.type === 'player2'
          ) {
            // if collision restore y
            this.y += this.speed
          } else if (collision.type === 'bullet') {
            this.destroy()
            return
          }
        }

        if (this.getTop() < 0) this.y = 0
        break
      case this.keybindMoveConfig!['down']:
        this.direction = 'down'
        this.y += this.speed
        collision = isCollision(this, this.stage!.elements)
        if (collision) {
          if (
            collision.type === 'brick' ||
            collision.type === 'player1' ||
            collision.type === 'player2'
          ) {
            // if collision restore y
            this.y -= this.speed
          } else if (collision.type === 'bullet') {
            this.destroy()
            return
          }
        }
        if (this.getBottom() > this.stage!.h) {
          this.y = this.stage!.h - this.directionProperty!.down![3] * this.scale
        }

        break
      case this.keybindMoveConfig!['left']:
        this.direction = 'left'
        this.x -= this.speed
        collision = isCollision(this, this.stage!.elements)
        if (collision) {
          if (
            collision.type === 'brick' ||
            collision.type === 'player1' ||
            collision.type === 'player2'
          ) {
            // if collision restore x
            this.x += this.speed
          } else if (collision.type === 'bullet') {
            this.destroy()
            return
          }
        }

        if (this.getLeft() < 0) this.x = 0
        break
      case this.keybindMoveConfig!['right']:
        this.direction = 'right'
        this.x += this.speed
        collision = isCollision(this, this.stage!.elements)
        if (collision) {
          if (
            collision.type === 'brick' ||
            collision.type === 'player1' ||
            collision.type === 'player2'
          ) {
            // if collision restore x
            this.x -= this.speed
          } else if (collision.type === 'bullet') {
            this.destroy()
            return
          }
        }

        if (this.getRight() > this.stage!.w) {
          this.x = this.stage!.w - this.directionProperty!.right![2] * this.scale
        }
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
