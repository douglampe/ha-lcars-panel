<script setup lang="ts">
import { computed } from 'vue'
import { haState } from '../HAState'

const { entity, scanning, fast } = defineProps<{
  entity: string
  scanning?: boolean
  fast?: boolean
}>()

const classes = computed(() => {
  if (scanning) {
    return `scanning-cell${fast ? '-fast' : ''}`
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
  <div class="lcars-row" :class="classes" style="flex-wrap: wrap">
    <div
      v-for="(row, index) in rows"
      :key="index"
      class="lcars-col"
      style="width: calc(var(--lcars-unit) * 5)"
    >
      {{ row.key.replace('_', ' ') }}: {{ row.value }}
    </div>
  </div>
</template>
