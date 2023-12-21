import { IBrickType, INode } from '../game'
import Brick from './Brick'

export default class AdobeBrick extends Brick {
  type: IBrickType = 'adobeBrick'

  constructor(x: number, y: number) {
    super(x, y)
  }

  draw(ctx: CanvasRenderingContext2D, graghics: HTMLImageElement) {
    ctx.drawImage(graghics, 896, 0, 16, 16, this.x, this.y, 16, 16)
    ctx.drawImage(graghics, 912, 8, 16, 16, this.x + 16, this.y, 16, 16)
    ctx.drawImage(graghics, 896, 0, 16, 16, this.x, this.y + 16, 16, 16)
    ctx.drawImage(graghics, 896, 0, 16, 16, this.x + 16, this.y + 16, 16, 16)
  }

  /**
   * Being collision by someone else
   * @param { INode } node - collision node
   */
  gotCollision(node: INode) {
    if (node.type === 'bullet') {
      if (node.source !== this) {
        this.destroy()
      }
    }
  }
}
