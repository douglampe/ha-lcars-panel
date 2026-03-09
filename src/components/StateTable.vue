<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { getAllStateValues, haState } from '../HAState'
import LCARSTable from './LCARSTable.vue'

const {
  maxLen = 50,
  pageSize = 10,
  keys = true,
  entities = true,
  animation = 'row-fill',
  pageDuration,
} = defineProps<{
  maxLen?: number
  pageSize?: number
  keys?: boolean
  entities?: boolean
  animation?: string
  pageDuration?: number
}>()

const page = ref(0)
let pageTimer: number | undefined

function getPageDuration() {
  if (pageDuration) {
    return pageDuration * 1000
  } else {
    switch (animation) {
      case 'row-fill':
        return 5000
      case 'scanning':
        return 8000
      case 'scanning-fast':
        return 2000
      default:
        return 2000
    }
  }
}

const allRows = computed(() => {
  if (!haState?.value?.states) {
    return []
  }
  let len = 0
  let row: string[] = []
  let lastEntity = ''

  function pushValue(value: string) {
    if (len + value.length > maxLen) {
      row = []
      rowList.push(row)
      len = 0
    }
    row.push(value)
    len += value.length + 1
  }

  const values = getAllStateValues()

  const rowList: Array<Array<string>> = []
  rowList.push(row)

  for (const { entity, key, value } of values) {
    if (entities && entity !== lastEntity) {
      pushValue(entity)
      lastEntity = entity
    }
    if (keys) {
      pushValue(`${key}: ${value}`)
    } else {
      pushValue(value)
    }
  }

  return rowList
})

const pageCount = computed(() => Math.ceil(allRows.value.length / pageSize))

const rows = computed(() => {
  if (pageCount.value === 0) {
    return []
  }

  const currentPage = page.value % pageCount.value
  const start = currentPage * pageSize

  return allRows.value.slice(start, start + pageSize)
})

onMounted(async () => {
  await nextTick()

  pageTimer = window.setInterval(() => {
    if (pageCount.value <= 1) {
      page.value = 0
      return
    }

    page.value = (page.value + 1) % pageCount.value
  }, getPageDuration())
})

onUnmounted(() => {
  if (pageTimer !== undefined) {
    window.clearInterval(pageTimer)
  }
})
</script>

<template>
  <LCARSTable :animation="animation" v-bind="$attrs">
    <tr v-for="(row, index) in rows" :key="index">
      <td>{{ row.join(' ') }}</td>
    </tr>
  </LCARSTable>
</template>
