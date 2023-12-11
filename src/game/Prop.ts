import { INode, IPropProperty, IPropType } from '../game'
import Stage from './Stage'
import { PROP_SCALE } from './config'
import { isEnemy, isTank } from './utils'

export default class Prop {
  type: IPropType = 'prop'
  x: number
  y: number
  scale = PROP_SCALE
  stage: InstanceType<typeof Stage> | undefined
  property: IPropProperty | undefined
  _destroy = false

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
    return this.property ? this.x + this.property[0] * this.scale : this.x
  }

  getTop() {
    return this.y
  }

  getBottom() {
    return this.property ? this.y + this.property[1] * this.scale : this.y
  }

  /**
   * Being collision by someone else
   * @param { INode } node - collision node
   */
  gotCollision(node: INode) {
    if (isTank(node)) {
      this.destroy()
    }
  }

  destroy() {
    this.stage!.destroy(this)
  }
}
