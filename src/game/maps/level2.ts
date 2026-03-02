import { IMapInfo, IMapProp } from '../../game'

const mapConfig: (props: IMapProp) => IMapInfo = (props) => {
  return {
    level: 2,
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
      // 第二关：更多敌人，生成更快
      type: [
        ['red', 'sliver', 'brown', 'midRed'],
        ['midSliver', 'midBrown', 'bigRed'],
        ['bigSliver', 'bigBrown'],
        ['random', 'random'],
      ],
      number: 4,
      interval: 10000, // 生成间隔更短
    },
    bricks: [
      // 顶部防御墙
      {
        start: [50, 80],
        horizontal: 3,
        vertial: 2,
      },
      {
        start: [700, 80],
        horizontal: 3,
        vertial: 2,
      },
      // 中间迷宫
      {
        start: [200, 200],
        horizontal: 2,
        vertial: 3,
      },
      {
        start: [400, 200],
        horizontal: 4,
        vertial: 2,
      },
      {
        start: [600, 200],
        horizontal: 2,
        vertial: 3,
      },
      // 底部障碍
      {
        start: [150, 400],
        horizontal: 3,
        vertial: 2,
      },
      {
        start: [500, 400],
        horizontal: 3,
        vertial: 2,
      },
      // 大本营保护墙
      {
        start: [352, 536],
        horizontal: 3,
        vertial: 1,
      },
      {
        start: [352, 568],
        horizontal: 1,
        vertial: 1,
      },
      {
        start: [416, 568],
        horizontal: 1,
        vertial: 1,
      },
    ],
    props: {
      explodeProp: {
        interval: 25000, // 道具生成更频繁
        perCount: 1,
        duration: 15000,
        max: 3, // 最大数量增加
        position: 'random',
      },
    },
  }
}

export default mapConfig
