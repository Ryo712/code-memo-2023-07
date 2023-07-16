<!--
https://eugenkiss.github.io/7guis/tasks/#circle
-->

<script setup>
import { ref, shallowReactive, toRaw } from 'vue'

const history = shallowReactive([[]]) //描画履歴
const index = ref(0) //履歴の現在のインデックス
const circles = ref([]) //描画された円の配列
const selected = ref() //選択された円の参照
const adjusting = ref(false) //円の調整モード

//円がクリックされた時の処理を定義
function onClick({ clientX: x, clientY: y }) {
  if (adjusting.value) {
    adjusting.value = false
    selected.value = null
    push()
    return
  }

  selected.value = [...circles.value].reverse().find(({ cx, cy, r }) => {
    const dx = cx - x
    const dy = cy - y
    return Math.sqrt(dx * dx + dy * dy) <= r
  })

  if (!selected.value) {
    circles.value.push({
      cx: x,
      cy: y,
      r: 50
    })
    push()
  }
}

function adjust(circle) {
  selected.value = circle
  adjusting.value = true
}

function push() {
  history.length = ++index.value
  history.push(clone(circles.value))
  console.log(toRaw(history))
}

function undo() {
  circles.value = clone(history[--index.value])
}

function redo() {
  circles.value = clone(history[++index.value])
}

// 配列の複製を作成します
function clone(circles) {
  return circles.map((c) => ({ ...c }))
}
</script>

<template>
<!-- 円を描画するSVG要素が定義されています -->
  <svg @click="onClick">
    <foreignObject x="0" y="40%" width="100%" height="200">
      <p class="tip">
        Click on the canvas to draw a circle. Click on a circle to select it.
        Right-click on the canvas to adjust the radius of the selected circle.
      </p>
    </foreignObject>
    <circle
      v-for="circle in circles"
      :cx="circle.cx"
      :cy="circle.cy"
      :r="circle.r"
      :fill="circle === selected ? '#ccc' : '#fff'"
      @click="selected = circle"
      @contextmenu.prevent="adjust(circle)"
    ></circle>
  </svg>
<!-- Undo/Redoボタンが表示されるコントロール部分が定義されています -->
  <div class="controls">
    <button @click="undo" :disabled="index <= 0">Undo</button>
    <button @click="redo" :disabled="index >= history.length - 1">Redo</button>
  </div>

<!-- 円の調整ダイアログが表示される部分が定義されています -->
  <div class="dialog" v-if="adjusting" @click.stop>
    <p>Adjust radius of circle at ({{ selected.cx }}, {{ selected.cy }})</p>
    <input type="range" v-model="selected.r" min="1" max="300">
  </div>
</template>

<style>
body {
  margin: 0;
  overflow: hidden;
}

svg {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}

circle {
  stroke: #000;
}

.controls {
  position: fixed;
  top: 10px;
  left: 0;
  right: 0;
  text-align: center;
}

.controls button + button {
  margin-left: 6px;
}

.dialog {
  position: fixed;
  top: calc(50% - 50px);
  left: calc(50% - 175px);
  background: #fff;
  width: 350px;
  height: 100px;
  padding: 5px 20px;
  box-sizing: border-box;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}

.dialog input {
  display: block;
  width: 200px;
  margin: 0px auto;
}

.tip {
  text-align: center;
  padding: 0 50px;
  color: #bbb;
}
</style>