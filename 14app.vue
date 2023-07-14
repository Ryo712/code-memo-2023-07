<!--
https://eugenkiss.github.io/7guis/tasks/#timer
-->

<script setup>
import { ref, onUnmounted, computed } from 'vue'
const duration = ref(15 * 1000)
const elapsed = ref(0)

let lastTime
let handle

const update = () => {
  elapsed.value = performance.now() - lastTime
  if (elapsed.value >= duration.value) {
    cancelAnimationFrame(handle)
  } else {
    handle = requestAnimationFrame(update)
  }
}

const reset = () => {
  elapsed.value = 0
  lastTime = performance.now()
  update()
}

const progressRate = computed(() =>
  Math.min(elapsed.value / duration.value, 1)
)

reset()

onUnmounted(() => {
  cancelAnimationFrame(handle)
})
</script>

<template>
  <label
    >Elapsed Time: <progress :value="progressRate"></progress
  ></label>
  <!-- <label>: 経過時間を表示するためのラベルと進捗バー（<progress>要素）です。
    progressRateプロパティを進捗バーのvalue属性にバインディングしています。
    つまり、進捗バーの値はprogressRateの値に応じて自動的に更新されます。-->
<!-- <progress>要素は、範囲内の値に基づいて進捗バーを表示します。
    この要素にはvalue属性が必要であり、現在の進捗率を示す値を設定する必要があります。 -->

  <div>{{ (elapsed / 1000).toFixed(1) }}s</div>

  <div>
    Duration: <input type="range" v-model="duration" min="1" max="30000">
    {{ (duration / 1000).toFixed(1) }}s
  </div>

  <button @click="reset">Reset</button>
  <!-- <button>: タイマーをリセットするためのボタンです。
    reset()関数がクリックイベントのハンドラーとして設定されています。-->
</template>

<style>
.elapsed-container {
  width: 300px;
}

.elapsed-bar {
  background-color: red;
  height: 10px;
}
</style>