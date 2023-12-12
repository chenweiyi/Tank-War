import { IBrickType } from '../game'
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
}
