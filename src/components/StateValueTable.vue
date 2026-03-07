<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { getStateValue, haState } from '@/HAState'
import LCARSTable from './LCARSTable.vue'
import { computed } from 'vue'

export interface StateValueRow extends Array<string | number | boolean> {
  cells: Array<{ entity?: string; attribute?: string }>
}

const props = withDefaults(defineProps<{ rows?: StateValueRow[] }>(), { rows: () => [] })

defineOptions({
  inheritAttrs: false,
})

const stateRows = computed(() => {
  if (!haState?.value?.states) {
    return
  }
  const rowList: Array<Array<string>> = []
  for (const row of props.rows) {
    const cellValues: Array<string> = []
    for (const cell of row.cells) {
      if (cell.entity) {
        const value = getStateValue(haState.value, cell.entity, cell.attribute)
        cellValues.push(String(value))
      } else {
        cellValues.push('')
      }
    }
    rowList.push(cellValues)
  }
  return rowList
})
</script>

<template>
  <LCARSTable animation="scanning-fast">
    <tr v-for="(row, index) in stateRows" :key="index">
      <td v-for="(cell, index) in row" :key="index">
        {{ cell }}
      </td>
    </tr>
  </LCARSTable>
</template>
