<!--
https://eugenkiss.github.io/7guis/tasks/#flight
-->

<script setup>
import { ref, computed } from 'vue'

const flightType = ref('one-way flight')
const departureDate = ref(dateToString(new Date()))
const returnDate = ref(departureDate.value)

const isReturn = computed(() => flightType.value === 'return flight')

const canBook = computed(
  () =>
    !isReturn.value ||
    stringToDate(returnDate.value) > stringToDate(departureDate.value)
)
/*canBook: 予約ボタンがクリック可能かどうかを示す計算されたプロパティです。
片道フライトの場合は常にクリック可能ですが、
往復フライトの場合は復路の日付が出発日よりも後になっている必要があります。*/


function book() {
  alert(
    isReturn.value
      ? `You have booked a return flight leaving on ${departureDate.value} and returning on ${returnDate.value}.`
      : `You have booked a one-way flight leaving on ${departureDate.value}.`
  )
}
/*book(): 予約ボタンがクリックされた際に実行される関数です。
選択されたフライトの種類に基づいてメッセージを表示します*/

function stringToDate(str) {
  const [y, m, d] = str.split('-')
  return new Date(+y, m - 1, +d)
}

function dateToString(date) {
  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate())
  )
}

function pad(n, s = String(n)) {
  return s.length < 2 ? `0${s}` : s
}
//pad(): 数値を2桁の文字列にパディングするユーティリティ関数です。//
</script>

<template>
  <select v-model="flightType">
    <option value="one-way flight">One-way Flight</option>
    <option value="return flight">Return Flight</option>
  </select>

  <input type="date" v-model="departureDate">
  <input type="date" v-model="returnDate" :disabled="!isReturn">

  <button :disabled="!canBook" @click="book">Book</button>
  
  <p>{{ canBook ? '' : 'Return date must be after departure date.' }}</p>
</template>

<style>
select,
input,
button {
  display: block;
  margin: 0.5em 0;
  font-size: 15px;
}

input[disabled] {
  color: #999;
}

p {
  color: red;
}
</style>
