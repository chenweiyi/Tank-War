import Stage from './game/Stage'

export type IType = ITankType | 'bullet' | 'brick' | 'prop'

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
  destroy: () => void
  source?: INode
  _destroy: boolean
}

// tank
export type ITankType = 'player1' | 'player2' | IEnemyTankType
export type ITankProperty = [number, number, number, number] | undefined // [x, y, width, height]
export type IDirection = 'up' | 'down' | 'left' | 'right'
export interface ITankDirectionProperty {
  up: ITankProperty
  down: ITankProperty
  left: ITankProperty
  right: ITankProperty
}

export type IEnemyTankType =
  | 'red'
  | 'midRed'
  | 'bigRed'
  | 'sliver'
  | 'midSliver'
  | 'bigSliver'
  | 'brown'
  | 'midBrown'
  | 'bigBrown'

export type IEnemyDirectionProperty = Record<IEnemyTankType, ITankDirectionProperty>

// keybind
export interface IKeyBindMove {
  up: string
  down: string
  left: string
  right: string
  shot: string
}

// prop
export type IPropType = 'prop'
export type IPropProperty = [number, number]
