<script setup lang="ts">
import 'element-plus/es/components/message-box/style/css'
import { ElMessageBox } from 'element-plus'

import EventBus from '../helper/EventBus'
import CountDown from '../helper/CountDown'
import graghics from '../assets/images/graphics.png'
import Stage from '../game/Stage.ts'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../game/config'

let stage: Stage
const canvasRef = ref()
const w = ref(CANVAS_WIDTH)
const h = ref(CANVAS_HEIGHT)
const status = ref<'start' | 'pause' | 'restart'>()

const closeWindow = () => {
  window.opener = null
  window.open('', '_self')
  window.close()
}

const startGame = () => {
  status.value = 'start'
  stage.start()
}

const pauseGame = () => {
  status.value = 'pause'
  stage.pause()
}

const restartGame = () => {
  status.value = 'restart'
  stage.resume()
}

onMounted(() => {
  window.$eventBus = new EventBus()
  window.$CountDownGen = CountDown.gen
  window.$CountDownGen2 = CountDown.gen2
  const img = new Image()
  img.src = graghics
  img.onload = () => {
    const canvas = canvasRef.value as HTMLCanvasElement
    const ctx = canvas!.getContext('2d')
    stage = new Stage(img, ctx!, w.value, h.value)
  }
  window.$eventBus.on({
    eventName: 'gameover',
    func: () => {
      console.log('gameover func execute...')
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
    <el-button v-if="!status" type="primary" @click="startGame">开始游戏</el-button>
    <el-button v-if="status === 'start'" type="primary" @click="pauseGame">暂停游戏</el-button>
    <el-button v-if="status === 'pause'" type="primary" @click="restartGame">恢复游戏</el-button>
  </div>
  <div w-full h-full flex justify-center items-center>
    <canvas ref="canvasRef" width="800" height="600" class="bg-black"></canvas>
  </div>
</template>

<style scoped></style>
