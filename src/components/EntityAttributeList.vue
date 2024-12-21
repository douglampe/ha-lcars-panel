<script setup lang="ts">
import { computed } from 'vue'
import { haState } from '../HAState'

const { entity, fillRows, scanning, fast } = defineProps<{
  entity: string
  fillRows?: boolean
  scanning?: boolean
  fast?: boolean
}>()

const classes = computed(() => {
  if (scanning) {
    return `scanning-cell${fast ? '-fast' : ''}`
  }

  if (fillRows) {
    return 'row-fill'
  }

  return ''
})

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
  <table class="lcars-table" :class="classes">
    <tr v-for="(row, index) in rows" :key="index">
      <td>{{ row.key.replace('_', ' ') }}: {{ row.value }}</td>
    </tr>
  </table>
</template>
