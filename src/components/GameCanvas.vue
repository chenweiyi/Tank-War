<script setup lang="ts">
import { ElMessageBox } from 'element-plus'

import EventBus from '../EventBus'
import graghics from '../assets/images/graphics.png'
// import Enemy from '../game/Enemy'
// import Player1 from '../game/Player1'
// import Player2 from '../game/Player2'
import Stage from '../game/Stage.ts'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../game/config'

let stage: Stage
const canvasRef = ref()
const w = ref(CANVAS_WIDTH)
const h = ref(CANVAS_HEIGHT)
const isPause = ref(false)

const closeWindow = () => {
  window.opener = null
  window.open('', '_self')
  window.close()
}

const toggleGame = () => {
  isPause.value = !isPause.value
  if (isPause.value) {
    stage.pause()
  } else {
    stage.resume()
  }
}

onMounted(() => {
  window.$eventBus = new EventBus()
  const img = new Image()
  img.src = graghics
  img.onload = () => {
    const canvas = canvasRef.value as HTMLCanvasElement
    const ctx = canvas!.getContext('2d')
    stage = new Stage(img, ctx!, w.value, h.value)
    stage.start()
  }
  window.$eventBus.on({
    eventName: 'gameover',
    func: () => {
      ElMessageBox.confirm('哎呀，你被电脑打败了，要重新开始吗？', '~小提示~', {
        confirmButtonText: '重新开始游戏',
        cancelButtonText: '不想玩了',
        type: 'info',
        center: true,
      })
        .then(() => {
          stage.restart()
        })
        .catch(() => {
          closeWindow()
        })
    },
  })
})
</script>

<template>
  <div absolute top-16px left-0 right-0 m-auto flex justify-center items-center h-60px>
    <el-button v-if="!isPause" type="primary" @click="toggleGame">暂停游戏</el-button>
    <el-button v-else type="primary" @click="toggleGame">恢复游戏</el-button>
  </div>
  <div w-full h-full flex justify-center items-center>
    <canvas ref="canvasRef" width="800" height="600" class="bg-black"></canvas>
  </div>
</template>

<style scoped></style>
