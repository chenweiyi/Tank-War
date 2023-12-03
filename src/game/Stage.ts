import { INode } from '../game'

export default class Stage {
  graghics: HTMLImageElement
  elements: INode[] = []
  ctx: CanvasRenderingContext2D
  w: number
  h: number

  constructor(
    graghics: HTMLImageElement,
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    elements?: INode[],
  ) {
    this.graghics = graghics
    this.ctx = ctx
    this.w = w
    this.h = h
    this.elements = elements || []
  }

  add(node: INode) {
    node.init?.(this.ctx, this.graghics)
    node.addStage(this)
    this.elements.push(node)
  }

  clear() {
    this.ctx.clearRect(0, 0, this.w, this.h)
  }

  render() {
    this.clear()
    this.elements.forEach((elements) => {
      elements.draw(this.ctx, this.graghics)
    })
    requestAnimationFrame(this.render.bind(this))
  }

  start() {
    this.render()
  }

  destroy(node: INode) {
    this.elements = this.elements.filter((element) => element !== node)
  }
}
