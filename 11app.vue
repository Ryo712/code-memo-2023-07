<!--
https://eugenkiss.github.io/7guis/tasks/#temp
-->

<script setup>
import { ref } from 'vue'

const c = ref(0)
const f = ref(32)

function setC(e, v = +e.target.value) {
  c.value = v
  f.value = v * (9 / 5) + 32
}

function setF(e, v = +e.target.value) {
  f.value = v
  c.value = (v - 32) * (5 / 9)
}
</script>

<template>
  <input type="number" :value="c" @change="setC"> Celsius =
  <input type="number" :value="f" @change="setF"> Fahrenheit
</template>

<!--
setC()関数は、摂氏の値が変更されたときに呼び出されます。入力フィールドの値を受け取り、
それを摂氏の値として設定し、摂氏から華氏への変換を行います。
setF()関数は、華氏の値が変更されたときに呼び出されます。入力フィールドの値を受け取り、
それを華氏の値として設定し、華氏から摂氏への変換を行います。
-->