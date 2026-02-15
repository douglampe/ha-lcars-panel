<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { getStateValue, haState } from '@/HAState'
import LCARSTable from './LCARSTable.vue'
import { computed } from 'vue'

export interface SiteValueRow extends Array<string | number | boolean> {
  cells: Array<{ entity: string; attribute?: string }>
}

const { rows } = defineProps<{ rows: SiteValueRow[] }>()

const stateRows = computed(() => {
  if (!haState?.value?.states) {
    return
  }
  const rowList: Array<Array<string>> = []
  for (const row of rows) {
    const cellValues: Array<string> = []
    for (const cell of row.cells) {
      const value = getStateValue(haState.value, cell.entity, cell.attribute)
      cellValues.push(String(value))
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
