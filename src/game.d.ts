import Stage from './game/Stage'

export type IType = 'player1' | 'player2' | 'bullet' | 'brick' | 'prop'

// stage
export interface INode {
  type: IType
  init?: (ctx: CanvasRenderingContext2D, graghics: HTMLImageElement) => void
  draw: (ctx: CanvasRenderingContext2D, graghics: HTMLImageElement) => void
  addStage: (stage: InstanceType<typeof Stage>) => void
  getTop: () => number
  getLeft: () => number
  getRight: () => number
  getBottom: () => number
  gotCollision: (node: INode) => void // was collisioned
}

// tank
export type IPlayerType = 'player1' | 'player2'
export type IPlayerProperty = [number, number, number, number] | undefined // [x, y, width, height]
export type IDirection = 'up' | 'down' | 'left' | 'right'
export interface IPlayerDirectionProperty {
  up: IPlayerProperty
  down: IPlayerProperty
  left: IPlayerProperty
  right: IPlayerProperty
}

export interface IKeyBindMove {
  up: string
  down: string
  left: string
  right: string
  shot: string
}
