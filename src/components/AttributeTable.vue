<script setup lang="ts">
import { computed } from 'vue'
import { haState } from '../HAState'
import LCARSTable from './LCARSTable.vue'

const { entity, animation } = defineProps<{
  entity: string
  animation?: string
}>()

const rows = computed(() => {
  if (!haState?.value?.states) {
    return
  }
  const rowList: Array<{ key: string; value: string }> = []
  const entityObject = haState?.value?.states[entity]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Object.entries((entityObject as any).attributes).forEach(([key, value]) => {
    rowList.push({ key, value: value as string })
  })
  return rowList
})
</script>

<template>
  <LCARSTable :animation="animation">
    <tr v-for="(row, index) in rows" :key="index">
      <td>{{ row.key }}</td>
      <td>{{ row.value }}</td>
    </tr>
  </LCARSTable>
</template>
