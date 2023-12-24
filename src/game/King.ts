import { INode } from '../game'
import Stage from './Stage'
import { KING_SCALE } from './config'

export default class King {
  type: 'king' = 'king'
  x: number
  y: number
  stage: InstanceType<typeof Stage> | undefined
  _destroy = false
  scale: number = KING_SCALE
  w: number = 32
  h: number = 32
  constructor(w: number, h: number) {
    this.x = w / 2 - (this.w * this.scale) / 2
    this.y = h - this.h
  }

  init(ctx: CanvasRenderingContext2D, graghics: HTMLImageElement) {}

  draw(ctx: CanvasRenderingContext2D, graghics: HTMLImageElement) {
    ctx.drawImage(graghics, 896, 66, 32, 32, this.x, this.y, this.w, this.h)
  }

  addStage(stage: InstanceType<typeof Stage>) {
    this.stage = stage
  }

  getLeft() {
    return this.x
  }

  getRight() {
    return this.x + this.w * this.scale
  }

  getTop() {
    return this.y
  }

  getBottom() {
    return this.y + this.h * this.scale
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

  destroy() {
    this.stage!.destroy(this)
  }
}
