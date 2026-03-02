import { IMapInfo, IMapProp } from '../../game'

const mapConfig: (props: IMapProp) => IMapInfo = (props) => {
  return {
    level: 3,
    player1: {
      position: {
        x: 300,
        y: 500,
        direction: 'up',
      },
    },
    player2: {
      position: {
        x: 500,
        y: 500,
        direction: 'up',
      },
    },
    enemy: {
      // 第三关：困难模式，大量高级敌人
      type: [
        ['midRed', 'midSliver', 'midBrown', 'bigRed'],
        ['bigSliver', 'bigBrown', 'random'],
        ['random', 'random', 'random'],
        ['bigRed', 'bigSliver', 'bigBrown'],
        ['random', 'random'],
      ],
      number: 5,
      interval: 8000, // 生成间隔非常短
    },
    bricks: [
      // 四角防御
      {
        start: [30, 50],
        horizontal: 2,
        vertial: 3,
      },
      {
        start: [750, 50],
        horizontal: 2,
        vertial: 3,
      },
      {
        start: [30, 500],
        horizontal: 2,
        vertial: 2,
      },
      {
        start: [750, 500],
        horizontal: 2,
        vertial: 2,
      },
      // 中央复杂迷宫
      {
        start: [250, 150],
        horizontal: 1,
        vertial: 5,
      },
      {
        start: [350, 150],
        horizontal: 3,
        vertial: 1,
      },
      {
        start: [450, 150],
        horizontal: 1,
        vertial: 5,
      },
      {
        start: [250, 350],
        horizontal: 3,
        vertial: 1,
      },
      {
        start: [450, 350],
        horizontal: 3,
        vertial: 1,
      },
      // 大本营复杂保护
      {
        start: [320, 520],
        horizontal: 5,
        vertial: 1,
      },
      {
        start: [320, 520],
        horizontal: 1,
        vertial: 3,
      },
      {
        start: [480, 520],
        horizontal: 1,
        vertial: 3,
      },
    ],
    props: {
      explodeProp: {
        interval: 20000,
        perCount: 2,
        duration: 12000,
        max: 4,
        position: 'random',
      },
    },
  }
}

export default mapConfig
