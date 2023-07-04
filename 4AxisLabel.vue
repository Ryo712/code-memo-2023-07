<script setup>
import { computed } from 'vue'
import { valueToPoint } from './util.js'

const props = defineProps({
  stat: Object,
  index: Number,
  total: Number
})

const point = computed(() =>
  valueToPoint(+props.stat.value + 10, props.index, props.total)
)
</script>

<template>
  <text :x="point.x" :y="point.y">{{stat.label}}</text>
</template>

<!-- templateは、pointという算出プロパティで計算された座標に基づいてテキスト要素を表示し、
stat.labelの値を表示するためにデータバインディングを使用しています。
これにより、テキスト要素の位置と内容が動的に変化し、柔軟な描画が可能になる。
 -->