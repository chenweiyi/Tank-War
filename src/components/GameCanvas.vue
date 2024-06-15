<script setup lang="ts">
import 'element-plus/es/components/message-box/style/css'
import { ElMessageBox } from 'element-plus'

import EventBus from '../helper/EventBus'
import CountDown from '../helper/CountDown'
import graghics from '../assets/images/graphics.png'
import Stage from '../game/Stage.ts'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../game/config'

let stage: Stage
let img: HTMLImageElement
const canvasRef = ref()
const w = ref(CANVAS_WIDTH)
const h = ref(CANVAS_HEIGHT)
const status = ref<'start' | 'pause' | 'restart'>()

let player1Score = ref(0)
let player2Score = ref(0)

const closeWindow = () => {
  window.opener = null
  window.open('', '_self')
  window.close()
}

const startGame = () => {
  status.value = 'start'
  loadResource().then(() => {
    const canvas = canvasRef.value as HTMLCanvasElement
    const ctx = canvas!.getContext('2d')
    stage = new Stage(img, ctx!, w.value, h.value)
    stage.start()
  })
}

const pauseGame = () => {
  status.value = 'pause'
  stage.pause()
}

const restartGame = () => {
  status.value = 'restart'
  stage.resume()
}

const loadResource = () => {
  return new Promise((resolve) => {
    img = new Image()
    img.src = graghics
    img.onload = () => {
      resolve(1)
    }
  })
}

const player1Style = {
  backgroundImage: `url(${graghics})`,
  backgroundPosition: '-803px -3px',
}

const player2Style = {
  backgroundImage: `url(${graghics})`,
  backgroundPosition: '-675px -3px',
}

onMounted(() => {
  window.$eventBus = new EventBus()
  window.$CountDownGen = CountDown.gen
  window.$CountDownGen2 = CountDown.gen2
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
    <el-button v-if="status === 'start'" type="primary" @click="pauseGame">暂停游戏</el-button>
    <el-button v-if="status === 'pause'" type="primary" @click="restartGame">恢复游戏</el-button>
  </div>
  <div w-full h-full flex justify-center items-center v-if="status">
    <canvas ref="canvasRef" width="800" height="600" class="bg-black mr-10px"></canvas>
    <div class="flex-1 grid grid-cols-[1fr_3fr] grid-rows-[60px_60px]">
      <span class="font-semibold">玩家类别</span><span class="font-semibold">歼敌数量</span>
      <div class="flex">
        <span class="w-26px h-26px mr-4px" :style="player1Style"></span><span>(玩家一)</span>
      </div>
      <span>{{ player1Score }}</span>
      <div class="flex">
        <span class="w-26px h-26px mr-4px" :style="player2Style"></span><span>(玩家二)</span>
      </div>
      <span>{{ player2Score }}</span>
    </div>
  </div>
  <div v-else class="w-full h-full flex justify-center items-center">
    <el-button v-if="!status" type="primary" @click="startGame">开始游戏</el-button>
  </div>
</template>

<style scoped></style>
