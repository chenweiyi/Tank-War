<script setup lang="ts">
import graghics from '../assets/images/graphics.png'
import Player1 from '../game/Player1'
import Player2 from '../game/Player2'
import Stage from '../game/Stage.ts'

const canvasRef = ref()
const w = ref(800)
const h = ref(600)

onMounted(() => {
  const img = new Image()
  img.src = graghics
  img.onload = () => {
    const canvas = canvasRef.value as HTMLCanvasElement
    const ctx = canvas!.getContext('2d')
    const stage = new Stage(img, ctx!, w.value, h.value)
    const player1 = new Player1(60, 60)
    const player2 = new Player2(0, 0)
    stage.add(player1)
    stage.add(player2)
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
