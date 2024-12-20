<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { computed } from 'vue'
import { haState } from '../HAState'

const rows = computed(() => {
  if (!haState?.value?.states) {
    return
  }
  const rowList: any[] = []
  Object.entries(haState.value.states).forEach(([key, entity]) => {
    let row: any[] = []
    rowList.push(row)
    row.push((entity as any).attributes['friendly_name'] || key)
    Object.entries((entity as any).attributes).forEach(([key, value], j) => {
      if (j % 5 === 0) {
        row = []
        rowList.push(row)
      }
      row.push(`${key}: ${value}`)
    })
  })
  return rowList
})
</script>

<template>
  <table class="lcars-table scanning-fast lcars-husk-color">
    <tr v-for="(row, index) in rows" :key="index">
      <td v-for="(cell, index) in row" :key="index">
        {{ cell }}
      </td>
    </tr>
  </table>
</template>
