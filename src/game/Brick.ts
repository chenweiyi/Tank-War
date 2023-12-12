import { IBrickType, INode } from '../game'
import Stage from './Stage'
import { BRICK_SCALE } from './config'

export default class Brick {
  type: IBrickType = 'brick'
  x: number
  y: number
  stage: InstanceType<typeof Stage> | undefined
  _destroy = false
  scale: number = BRICK_SCALE
  w: number = 16
  h: number = 16
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  init(ctx: CanvasRenderingContext2D, graghics: HTMLImageElement) {}

  draw(ctx: CanvasRenderingContext2D, graghics: HTMLImageElement) {}

  addStage(stage: InstanceType<typeof Stage>) {
    this.stage = stage
  }

  getLeft() {
    return this.x
  }

  getRight() {
    // return this.property ? this.x + this.property[0] * this.scale : this.x
    // TODO:
    return this.x + this.w * this.scale * 2
  }

  getTop() {
    return this.y
  }

  getBottom() {
    // return this.property ? this.y + this.property[1] * this.scale : this.y
    // TODO:
    return this.y + this.h * this.scale * 2
  }

  /**
   * Being collision by someone else
   * @param { INode } node - collision node
   */
  gotCollision(node: INode) {}

  destroy() {
    this.stage!.destroy(this)
  }
}
