<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { components, loadRemoteConfig, mixins } from '../HAConfig'
import { currentNav } from '@/LocalNav'
import type { ConfigItem } from '@/ConfigItem'
import { getStateValue, haState } from '@/HAState'
import { onMounted, ref } from 'vue'

const props = withDefaults(defineProps<ConfigItem>(), { tag: 'div' })

const processedProps = ref<ConfigItem>({})

onMounted(async () => {
  await loadRemoteConfig(props)
  processedProps.value = processItem(props)
})

function processItem(item: ConfigItem) {
  let processedItem = { ...item }

  if (item.stateMap) {
    const val = getStateValue(haState.value, item.stateMap.entity, item.stateMap.attribute)
    if (val) {
      const stateMapValues = item.stateMap.states[val]
      if (stateMapValues) {
        processedItem = {
          ...processedItem,
          ...stateMapValues,
        }
      }
    }
  }
  if (item.mixin && mixins.value[item.mixin]) {
    return {
      ...mixins.value[item.mixin],
      ...processedItem,
    }
  }
  return processedItem
}

function isVisible() {
  if (
    processedProps.value.showForNav &&
    !currentNav?.value.startsWith(processedProps.value.showForNav)
  ) {
    return false
  }
  return processedProps.value
}
</script>

<template>
  <component
    v-if="isVisible()"
    :is="processedProps.type ? components[processedProps.type] : tag"
    v-bind="props.config"
    >{{ text }}
    <a v-if="showForNav" :name="showForNav"></a>
    <template #left v-if="processedProps.leftChildren">
      <RecursiveComponent
        v-for="(child, index) in processedProps.leftChildren"
        :key="index"
        v-bind="child"
      />
    </template>
    <template #top v-if="processedProps.topChildren">
      <RecursiveComponent
        v-for="(child, index) in processedProps.topChildren"
        :key="index"
        v-bind="child"
      />
    </template>
    <template #bottom v-if="processedProps.bottomChildren">
      <RecursiveComponent
        v-for="(child, index) in processedProps.bottomChildren"
        :key="index"
        v-bind="child"
      />
    </template>
    <template #right v-if="processedProps.rightChildren">
      <RecursiveComponent
        v-for="(child, index) in processedProps.rightChildren"
        :key="index"
        v-bind="child"
      />
    </template>

    <RecursiveComponent
      v-for="(child, index) in processedProps.children"
      :key="index"
      v-bind="child"
    />
  </component>
</template>
