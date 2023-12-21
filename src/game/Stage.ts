import { IDirection, IMapBrick, IMapInfo, IMapProp, INode } from '../game'
import AdobeBrick from './AdobeBrick'
import Enemy from './Enemy'
import ExplodeProp from './ExplodeProp'
import Player1 from './Player1'
import Player2 from './Player2'
import map from './maps'
import { isBullet, isEnemy, randomBetween, sleep } from './utils'

export default class Stage {
  graghics: HTMLImageElement
  elements: INode[] = []
  ctx: CanvasRenderingContext2D
  w: number
  h: number
  currentLevel = 0
  totalLevel = 1
  maps: Array<IMapInfo> = []
  currentLevelMapInfo: IMapInfo | undefined
  #initExplodePropsTimer: NodeJS.Timeout | undefined
  #explodePropsNumber: number = 0

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

  #initExplodeProps(config: IMapInfo['props']['explodeProp']) {
    this.#initExplodePropsTimer = setTimeout(() => {
      let position = config.position
      if (position === 'random') {
        position = [randomBetween(50, this.w - 50), randomBetween(50, this.h - 50)]
      }
      const explodeProp = new ExplodeProp(position[0], position[1], config.duration)
      this.add(explodeProp)
      this.#explodePropsNumber++
      if (this.#explodePropsNumber <= config.max) {
        this.#initExplodeProps(config)
      }
    }, config.interval)
  }

  #initBrick(pos: Required<IMapBrick>['eles'][0]) {
    const adobeBrick = new AdobeBrick(pos[0], pos[1])
    this.add(adobeBrick)
  }

  #buildMapConfig(maps: Array<(props: IMapProp) => IMapInfo>) {
    return maps.map((mapFunc) => {
      const mapConfig = mapFunc({
        containerWidth: this.w,
        containerHeight: this.h,
      })
      this.#addEnemiesConfig(mapConfig)
      this.#addBricksConfig(mapConfig)
      this.#addPropsConfig(mapConfig)
      return mapConfig
    })
  }

  #addPropsConfig(mapConfig: IMapInfo) {}

  #addEnemiesConfig(mapConfig: IMapInfo) {
    const getPosition: (index: number) => [number, number, IDirection] = (index) => {
      switch (index) {
        case 0:
          return [0, 0, 'down']
        case 1:
          return [350, 0, 'down']
        case 2:
          return [750, 0, 'down']
      }
      return [0, 0, 'down']
    }

    const info: Required<IMapInfo['enemy']>['info'] = []
    mapConfig.enemy.type.forEach((type) => {
      const item: Required<IMapInfo['enemy']>['info'][0] = []
      type.forEach((t, i) => {
        item.push({
          type: t,
          position: getPosition(i),
        })
      })
      info.push(item)
    })
    mapConfig.enemy.info = info
  }

  #addBricksConfig(mapConfig: IMapInfo) {
    mapConfig.bricks.map((brick) => {
      for (let i = 0; i < brick.horizontal; i++) {
        for (let j = 0; j < brick.vertial; j++) {
          if (!brick.eles) {
            brick.eles = [brick.start]
          }
          brick.eles.push([brick.start[0] + 32 * i, brick.start[1] + 32 * j])
        }
      }
    })
  }

  registMaps() {
    this.totalLevel = map.maps.length
    this.maps = this.#buildMapConfig(map.maps)
  }

  #start() {
    this.currentLevelMapInfo = this.maps[this.currentLevel]
    this.#renderBrick()
    this.#renderPlayer()
    this.#renderEnemy()
    this.#renderProp()
  }

  #renderBrick() {
    if (this.currentLevelMapInfo) {
      this.currentLevelMapInfo.bricks.forEach((brick) => {
        brick.eles?.forEach((ele) => {
          this.#initBrick(ele)
        })
      })
    }
  }

  #renderPlayer() {
    if (this.currentLevelMapInfo) {
      const player1Option = this.currentLevelMapInfo.player1
      const player1 = new Player1({ ...player1Option.position })
      this.add(player1)

      const player2Option = this.currentLevelMapInfo.player2
      const player2 = new Player2({ ...player2Option.position })
      this.add(player2)
    }
  }

  async #renderEnemy() {
    if (this.currentLevelMapInfo) {
      const enemyOption = this.currentLevelMapInfo.enemy
      for (let i = 0; i < enemyOption.info!.length; i++) {
        const item = enemyOption.info![i]
        item.forEach((e) => {
          const enemy = new Enemy({
            x: e.position[0],
            y: e.position[1],
            direction: e.position[2],
            enemyType: e.type,
          })
          this.add(enemy)
        })
        await sleep(enemyOption.interval)
      }
    }
  }

  #renderProp() {
    if (this.currentLevelMapInfo) {
      const explodePropConfig = this.currentLevelMapInfo.props.explodeProp
      this.#initExplodeProps(explodePropConfig)
    }
  }

  start() {
    this.render()
    this.registMaps()
    this.#start()
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
