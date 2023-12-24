import { INode, IPropProperty, IPropType } from '../game'
import EventSync from './EventSync'
import Stage from './Stage'
import { PROP_SCALE } from './config'
import { isTank } from './utils'

export default class Prop extends EventSync {
  type: IPropType = 'prop'
  x: number
  y: number
  scale = PROP_SCALE
  stage: InstanceType<typeof Stage> | undefined
  property: IPropProperty | undefined
  duration: number = Infinity
  #timer: NodeJS.Timeout | undefined
  _destroy = false

  constructor(x: number, y: number, duration?: number) {
    super()
    this.x = x
    this.y = y
    this.duration = duration || Infinity
  }

  init(ctx: CanvasRenderingContext2D, graghics: HTMLImageElement) {
    this.#destroyWhenTimeCome()
  }

  pauseEventCallback() {
    clearTimeout(this.#timer)
  }

  resumeEventCallback() {
    this.#destroyWhenTimeCome()
  }

  #destroyWhenTimeCome() {
    if (this.duration < Infinity) {
      this.#timer = setTimeout(() => {
        if (this._destroy) return
        this.destroy()
      }, this.duration)
    }
  }

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
    clearTimeout(this.#timer)
    this.stage!.destroy(this)
  }
}
