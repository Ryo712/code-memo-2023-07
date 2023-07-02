<!--
A nested tree component that recursively renders itself.
You can double click on an item to turn it into a folder.
-->

<script setup>
import { ref } from 'vue'
import TreeItem from './TreeItem.vue'

const treeData = ref({
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'world' },
    {
      name: 'child folder',
      children: [
        {
          name: 'child folder',
          children: [{ name: 'hello' }, { name: 'world' }]
        },
        { name: 'hello' },
        { name: 'world' },
        {
          name: 'child folder',
          children: [{ name: 'hello' }, { name: 'world' }]
        }
      ]
    }
  ]
})
</script>

<template>
  <ul>
    <TreeItem class="item" :model="treeData"></TreeItem>
  </ul>
</template>

<style>
.item {
  cursor: pointer;
  line-height: 1.5;
}
.bold {
  font-weight: bold;
}
</style>

<!-- treeDataというリアクティブなデータが定義されており、ツリーのデータ構造を表しています。
ツリーはオブジェクトの形式で表され、各ノードにはnameとchildrenのプロパティが含まれています。
nameはノードの名前を表し、childrenはそのノードの子ノードの配列を持ちます。
 -->

 <!-- <ul>要素は、順序のないリストを作成します。このリストはツリーコンポーネント全体を表しています。
 <TreeItem>コンポーネントは、ツリーの各アイテムをレンダリングするために再帰的に使用されています。
 class属性には"item"が設定されており、.itemクラスのスタイルが適用されます。
 また、:model属性にはtreeDataがバインディングされており、
 TreeItemコンポーネントにツリーデータが渡されます。
  -->