import { INode } from '../game'

export const isCollision = (node: INode, elements: INode[]) => {
  const filterNodes = elements.filter((ele) => ele !== node)
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

export const isBrick = (node: INode) => {
  return node.type === 'brick'
}

/**
 * 是否是道具
 */
export const isProp = (node: INode) => {
  return node.type === 'prop'
}

export const isBullet = (node: INode) => {
  return node.type === 'bullet'
}
