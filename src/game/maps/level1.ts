import { IMapInfo, IMapProp } from '../../game'

const mapConfig: (props: IMapProp) => IMapInfo = (props) => {
  return {
    level: 1,
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
      // tank type, value can be 'random' | IEnemyTankType
      type: [
        ['red', 'sliver', 'brown'],
        ['midRed', 'midSliver', 'midBrown'],
        ['bigRed', 'bigSliver', 'bigBrown'],
      ],
      // how many count enemy
      number: 3,
      // every count interval
      interval: 12000,
    },
    bricks: [
      {
        start: [100, 100],
        horizontal: 2,
        vertial: 4,
      },
      {
        start: [350, 100],
        horizontal: 2,
        vertial: 4,
      },
      {
        start: [600, 100],
        horizontal: 2,
        vertial: 4,
      },
      {
        start: [150, 350],
        horizontal: 6,
        vertial: 2,
      },
      {
        start: [450, 350],
        horizontal: 6,
        vertial: 2,
      },
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
        // occur interval time
        interval: 30000,
        // number per occur
        perCount: 1,
        // live time
        duration: 15000,
        // max number for every level
        max: 2,
        // prop position, string | [number, number]
        position: 'random',
      },
    },
  }
}

export default mapConfig
