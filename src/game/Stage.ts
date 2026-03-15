import { IDirection, IMapBrick, IMapInfo, IMapProp, INode, IType } from '../game'
import AdobeBrick from './AdobeBrick'
import Enemy from './Enemy'
import ExplodeProp from './ExplodeProp'
import King from './King'
import Player1 from './Player1'
import Player2 from './Player2'
import map from './maps'
import {
  IElementPos,
  isBrick,
  isBullet,
  isEnemy,
  isTank,
  judgeCollision,
  randomBetween,
} from './utils'

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
  #gamestart = false
  #gameover = false
  #levelCleared = false
  #enemySpawnDone = false
  #enemySpawnAbort = false

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
    if (
      this.#gamestart &&
      !this.#gameover &&
      (!this.elements.find((e) => 'king' === e.type) ||
        !this.elements.find((e) => e.type.includes('player')))
    ) {
      console.log('===== game over!!! ======')

      this.#enemySpawnAbort = true
      this.destroyEnemy()
      this.destroyEnemyBullet()

      window.$eventBus.emit({
        eventName: 'gameover',
      })

      this.#gameover = true
    } else if (this.#gamestart && !this.#gameover && this.#levelCleared) {
      // 关卡胜利，进入下一关
      console.log(`===== Level ${this.currentLevel + 1} Cleared! ======`)
      this.nextLevel()
      requestAnimationFrame(this.render.bind(this))
    } else {
      this.clear()
      this.elements.forEach((elements) => {
        elements.draw(this.ctx, this.graghics)
      })
      this.#checkLevelClear()
      requestAnimationFrame(this.render.bind(this))
    }
  }

  #initExplodeProps(config: IMapInfo['props']['explodeProp']) {
    window.$CountDownGen2(config.interval).then(() => {
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
    })
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

  #genPositions(number: number) {
    const getProperPosition: (
      pos: IElementPos,
      direction: 'right' | 'left',
      list: INode[],
    ) => IElementPos = (pos, direction, list) => {
      const element = list
        .filter((ele) => !ele._destroy)
        .filter((ele) => isTank(ele) || isBrick(ele))
        .find((ele) => {
          return judgeCollision(pos, {
            x: ele.getLeft(),
            y: ele.getTop(),
            w: ele.getRight() - ele.getLeft(),
            h: ele.getBottom() - ele.getTop(),
          })
        })
      if (element) {
        let newX, newY
        switch (direction) {
          case 'right':
            newX = pos.x + pos.w + 10
            newY = pos.y + pos.h + 10
            if (newX + pos.w > this.w) {
              // change next line, change direction to left
              return getProperPosition({ ...pos, y: newY }, 'left', list)
            } else {
              // add x, keep right direction
              return getProperPosition({ ...pos, x: newX }, 'right', list)
            }
          case 'left':
            newX = pos.x - pos.w - 10
            newY = pos.y + pos.h + 10
            if (newX < 0) {
              // change next line, change direction to right
              return getProperPosition({ ...pos, y: newY }, 'right', list)
            } else {
              // subtract x, keep left direction
              return getProperPosition({ ...pos, x: newX }, 'left', list)
            }
        }
      } else {
        return pos
      }
    }

    const res: IElementPos[] = []
    if (number === 0) return []
    for (let i = 0; i < number; i++) {
      const list: INode[] = [
        ...this.elements,
        ...res.map((r) => ({
          _destroy: false,
          getLeft: () => r.x,
          getTop: () => r.y,
          getRight: () => r.x + r.w,
          getBottom: () => r.y + r.h,
          type: 'brick' as IType,
          draw: () => {},
          addStage: () => {},
          gotCollision: () => {},
          destroy: () => {},
        })),
      ]
      const pos = getProperPosition(
        { x: 0 + Math.floor(this.w / number) * i, y: 0, w: 32, h: 32 },
        i < number / 2 ? 'right' : 'left',
        list,
      )

      res.push(pos)
    }

    return res
  }

  #addEnemiesConfig(mapConfig: IMapInfo) {}

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
    this.#renderKing()
    this.#gamestart = true
  }

  #renderKing() {
    const king = new King(this.w, this.h)
    this.add(king)
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
      if (player1Option) {
        const player1 = new Player1({ ...player1Option.position })
        this.add(player1)
      }

      const player2Option = this.currentLevelMapInfo.player2
      if (player2Option) {
        const player2 = new Player2({ ...player2Option.position })
        this.add(player2)
      }
    }
  }

  async #renderEnemy() {
    function countDownTask(time: number) {
      return window.$CountDownGen2(time)
    }

    this.#enemySpawnDone = false
    this.#enemySpawnAbort = false

    if (this.currentLevelMapInfo) {
      const enemyOption = this.currentLevelMapInfo.enemy
      for (let i = 0; i < enemyOption.type.length; i++) {
        if (this.#enemySpawnAbort) break
        const item = enemyOption.type[i]
        const positions = this.#genPositions(item.length)
        item.forEach((e, i) => {
          const pos = positions[i]
          const enemy = new Enemy({
            x: pos.x,
            y: pos.y,
            direction: 'down',
            enemyType: e,
          })
          this.add(enemy)
        })
        await countDownTask(enemyOption.interval)
      }
    }

    this.#enemySpawnDone = true
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
    this.#enemySpawnAbort = true
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

  pause() {
    window.$eventBus.emit({
      eventName: 'pause',
    })
  }

  resume() {
    window.$eventBus.emit({
      eventName: 'resume',
    })
  }

  #checkLevelClear() {
    // 只有在所有波次都生成完毕后才判断通关
    if (!this.#enemySpawnDone) return
    const hasEnemy = this.elements.filter((e) => isEnemy(e)).length > 0
    if (!hasEnemy) {
      this.#levelCleared = true
    }
  }

  nextLevel() {
    if (this.currentLevel < this.totalLevel - 1) {
      // 进入下一关
      this.currentLevel++
      this.#levelCleared = false
      this.#gamestart = false
      this.#gameover = false
      this.#enemySpawnDone = false
      this.#enemySpawnAbort = false

      // 清空当前关卡元素
      this.elements.forEach((e) => e.destroy())
      this.elements = []

      // 重新开始下一关
      this.#start()

      console.log(`===== Starting Level ${this.currentLevel + 1} ======`)
    } else {
      // 通关游戏
      console.log('===== Congratulations! You passed all levels! ======')
      window.$eventBus.emit({
        eventName: 'gameover',
        victory: true,
      })
      this.#gameover = true
    }
  }

  restart() {
    window.location.reload()
  }
}
