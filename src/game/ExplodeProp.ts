import { INode, IPropProperty } from '../game'
import Prop from './Prop'
import { isPlayer, isTank } from './utils'

export default class ExplodeProp extends Prop {
  property: IPropProperty = [32, 30]
  constructor(x: number, y: number, duration: number) {
    super(x, y, duration)
  }

  draw(ctx: CanvasRenderingContext2D, graghics: HTMLImageElement) {
    ctx.drawImage(
      graghics,
      960,
      33,
      this.property[0],
      this.property[1],
      this.x,
      this.y,
      this.property[0] * this.scale,
      this.property[1] * this.scale,
    )
  }

  /**
   * Being collision by someone else
   * @param { INode } node - collision node
   */
  gotCollision(node: INode) {
    if (isPlayer(node)) {
      this.destroy()
      this.stage?.destroyEnemyBullet()
      this.stage?.destroyEnemy()
    }
  }
}
