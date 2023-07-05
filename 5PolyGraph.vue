<script setup>
import AxisLabel from './AxisLabel.vue'
import { computed } from 'vue'
import { valueToPoint } from './util.js'

const props = defineProps({
  stats: Array
})

const points = computed(() => {
  const total = props.stats.length
  return props.stats
    .map((stat, i) => {
      const { x, y } = valueToPoint(stat.value, i, total)
      return `${x},${y}`
    })
    .join(' ')
})
</script>

<template>
  <g>
    <polygon :points="points"></polygon>
    <circle cx="100" cy="100" r="80"></circle>
    <axis-label
      v-for="(stat, index) in stats"
      :stat="stat"
      :index="index"
      :total="stats.length"
    >
    </axis-label>
  </g>
</template>
<!-- このコードは、stats 配列の要素に基づいて多角形を描画し、円と軸ラベルを追加します。
また、valueToPoint 関数を使用して座標を計算することで、要素の値をグラフ上の位置にマッピングします。
詳細：stats プロパティの配列要素ごとにループし、
valueToPoint 関数を使用して各要素の座標を計算します。
<polygon> タグ: 多角形を描画するための要素です。
points 属性には、多角形の頂点の座標がスペース区切りの文字列としてバインドされています。
この points 属性によって多角形の形状が決定されます。
 -->