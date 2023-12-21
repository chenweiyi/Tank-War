import { INode } from '../game'

export const isCollision = (node: INode, elements: INode[]) => {
  const filterNodes = elements.filter((ele) => ele !== node && !ele._destroy)
  const circleLeft = node.getLeft()
  const circleRight = node.getRight()
  const circleTop = node.getTop()
  const circleBottom = node.getBottom()
  for (let i = 0; i < filterNodes.length; i++) {
    const ele = filterNodes[i]
    const eleLeft = ele.getLeft()
    const eleRight = ele.getRight()
    const eleTop = ele.getTop()
    const eleBottom = ele.getBottom()
    if (
      circleLeft > eleRight ||
      circleRight < eleLeft ||
      circleTop > eleBottom ||
      circleBottom < eleTop
    ) {
      // not collision, do nothing
    } else {
      // collison, return ele
      ele.gotCollision(node)
      return ele
    }
  }
  return false
}

export const isTank = (node: INode) => {
  return (
    node.type === 'player1' ||
    node.type === 'player2' ||
    node.type === 'red' ||
    node.type === 'midRed' ||
    node.type === 'bigRed' ||
    node.type === 'sliver' ||
    node.type === 'midSliver' ||
    node.type === 'bigSliver' ||
    node.type === 'brown' ||
    node.type === 'midBrown' ||
    node.type === 'bigBrown'
  )
}

export const isEnemy = (node: INode) => {
  return (
    node.type === 'red' ||
    node.type === 'midRed' ||
    node.type === 'bigRed' ||
    node.type === 'sliver' ||
    node.type === 'midSliver' ||
    node.type === 'bigSliver' ||
    node.type === 'brown' ||
    node.type === 'midBrown' ||
    node.type === 'bigBrown'
  )
}

export const isPlayer = (node: INode) => {
  return node.type === 'player1' || node.type === 'player2'
}

export const isBrick = (node: INode) => {
  return node.type.toLowerCase().includes('brick')
}

/**
 * judge other if is same to me type
 */
export const isSameType = (me: INode, other: INode) => {
  if (isEnemy(me)) {
    return isEnemy(other)
  }
  if (isPlayer(me)) {
    return isPlayer(other)
  }
  if (isBullet(me)) {
    return isBullet(other)
  }
  if (isProp(me)) {
    return isProp(other)
  }
  return false
}

export const isBothTank = (me: INode, other: INode) => {
  return isTank(me) && isTank(other)
}

/**
 * 是否是道具
 */
export const isProp = (node: INode) => {
  return node.type.toLowerCase().includes('prop')
}

export const isBullet = (node: INode) => {
  return node.type.toLowerCase().includes('bullet')
}

/**
 * 在给定的开始和结束数字之间随机生成一个数字
 */
export const randomNumber = (start: number, end: number) => {
  return start + Math.floor(Math.random() * (end - start))
}

export const sleep = async (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

/**
 * 获取介于两数之间的随机数
 */
export const randomBetween = (min: number, max: number) => {
  let _min = min
  let _max = max
  if (min > max) {
    _min = max
    _max = min
  }
  return Math.floor(Math.random() * (_max - _min)) + _min
}
