<script setup>
import { ref } from 'vue'
import { cells, evalCell } from './store.js'

const props = defineProps({
  c: Number,
  r: Number
})

const editing = ref(false) //editingはセルが編集中かどうかを管理するためのリアクティブな変数です

function update(e) {
  editing.value = false
  cells[props.c][props.r] = e.target.value.trim()
}
</script>

<!-- テンプレート部分では、セルの外側にdiv要素があり、クリックイベントが設定されています。
クリックするとeditingがtrueに設定され、編集モードに入ります。 -->
<template>
  <div class="cell" :title="cells[c][r]" @click="editing = true">
    <input
      v-if="editing"
      :value="cells[c][r]"
      @change="update"
      @blur="update"
      @vue:mounted="({ el }) => el.focus()"
    >
    <span v-else>{{ evalCell(cells[c][r]) }}</span>
    <!--span要素はv-elseディレクティブによって、セルが編集モードでない場合に表示されます。
    evalCell関数を使用してセルの内容を評価し、表示します。-->
  </div>
</template>
<!--input要素はv-ifディレクティブによってeditingがtrueの場合に表示されます。-->
<!--:valueディレクティブを使用してセルの値を表示し、
@changeおよび@blurイベントによって編集が行われたときにupdate関数が呼び出されます。
また、@vue:mountedディレクティブを使用してマウント時にフォーカスがセットされるようにしています。-->

<style>
.cell, .cell input {
  height: 1.5em;
  line-height: 1.5;
  font-size: 15px;
}

.cell span {
  padding: 0 6px;
}

.cell input {
  width: 100%;
  box-sizing: border-box;
}
</style>