<script setup lang="ts">
import graghics from '../assets/images/graphics.png'
import Enemy from '../game/Enemy'
import Player1 from '../game/Player1'
import Player2 from '../game/Player2'
import Stage from '../game/Stage.ts'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../game/config'

const canvasRef = ref()
const w = ref(CANVAS_WIDTH)
const h = ref(CANVAS_HEIGHT)

onMounted(() => {
  const img = new Image()
  img.src = graghics
  img.onload = () => {
    const canvas = canvasRef.value as HTMLCanvasElement
    const ctx = canvas!.getContext('2d')
    const stage = new Stage(img, ctx!, w.value, h.value)
    const player1 = new Player1({ x: 300, y: 500, direction: 'up' })
    const player2 = new Player2({ x: 500, y: 500, direction: 'up' })
    const enemy1 = new Enemy({ x: 0, y: 0, direction: 'down' })
    const enemy2 = new Enemy({ x: 750, y: 0, direction: 'left' })
    const enemy3 = new Enemy({ x: 350, y: 0, direction: 'down' })
    stage.add(player1)
    stage.add(player2)
    stage.add(enemy1)
    stage.add(enemy2)
    stage.add(enemy3)
    stage.start()
  }
})
</script>

<template>
  <div w-full h-full flex justify-center items-center>
    <canvas ref="canvasRef" width="800" height="600" class="bg-black"></canvas>
  </div>
</template>

<style scoped></style>
