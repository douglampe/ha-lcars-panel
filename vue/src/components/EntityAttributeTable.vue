<script setup lang="ts">
import { computed } from 'vue'
import { haState } from '../HAState'

const { entity } = defineProps<{ entity: string }>()

const rows = computed(() => {
  if (!haState?.value?.states) {
    return
  }
  const rowList: Array<{ key: string; value: string }> = []
  const entityObject = haState?.value?.states[entity]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Object.entries((entityObject as any).attributes).forEach(([key, value], j) => {
    rowList.push({ key, value: value as string })
  })
  return rowList
})
</script>

<template>
  <table class="lcars-table scanning-fast lcars-husk-color">
    <tr v-for="(row, index) in rows" :key="index">
      <td>{{ row.key }}</td>
      <td>{{ row.value }}</td>
    </tr>
  </table>
</template>
