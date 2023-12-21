import Stage from './game/Stage'

export type IType = ITankType | 'bullet' | IBrickType | 'prop'

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

// brick
export type IBrickType = 'brick' | 'adobeBrick'

// maps
export interface IMapProp {
  containerWidth: number
  containerHeight: number
}

export interface IMapPlayer {
  position: {
    x: number
    y: number
    direction: IDirection
  }
}

export interface IMapBrick {
  /**
   * brick start coordinate
   */
  start: [number, number]
  /**
   * horizontal number
   */
  horizontal: number
  /**
   * vertial number
   */
  vertial: number
  /**
   * current area all bricks coordinate, include start element
   */
  eles?: Array<[number, number]>
}

export interface IMapInfo {
  /**
   * current level number , from 1 start
   */
  level: number
  player1: IMapPlayer
  player2: IMapPlayer
  enemy: {
    /**
     * tank type, two-dimensional arrays , value can be 'random' | IEnemyTankType
     */
    type: Array<Array<IEnemyTankType | 'random'>>
    /**
     * how many count enemy
     */
    number: number
    /**
     * every count interval
     */
    interval: number
    /**
     * every count enemy tank's info
     */
    info?: Array<
      Array<{
        type: IEnemyTankType | 'random'
        position: [number, number, IDirection]
      }>
    >
  }
  bricks: Array<IMapBrick>
  props: {
    explodeProp: {
      /**
       * occur interval time
       */
      interval: number
      /**
       * number per occur
       */
      perCount: number
      /**
       * prop lives time
       */
      duration: number
      /**
       * max number for every level
       */
      max: number
      /**
       * prop occur position
       */
      position: 'random' | [number, number]
    }
  }
}
