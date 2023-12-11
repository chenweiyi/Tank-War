import { INode } from '../game'
import ExplodeProp from './ExplodeProp'
import { isBullet, isEnemy } from './utils'

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

  initProps() {
    // Generate a random prop
    setTimeout(() => {
      const explodeProp = new ExplodeProp(300, 300)
      explodeProp.init(this.ctx, this.graghics)
      explodeProp.addStage(this)
      this.elements.push(explodeProp)
    }, 3000)
  }

  start() {
    this.render()
    this.initProps()
  }

  destroy(node: INode) {
    node._destroy = true
    this.elements = this.elements.filter((element) => element !== node)
  }

  destroyEnemy() {
    this.elements
      .filter((element) => isEnemy(element))
      .forEach((element) => {
        element.destroy()
      })
  }

  destroyEnemyBullet() {
    this.elements
      .filter((element) => isBullet(element) && isEnemy(element.source!))
      .forEach((element) => {
        element.destroy()
      })
  }
}
