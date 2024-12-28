<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { components, mixins } from '../HAConfig'
import { currentNav } from '@/LocalNav'
import type { ConfigItem } from '@/ConfigItem'
import { getStateValue, haState } from '@/HAState'

const props = withDefaults(defineProps<ConfigItem>(), { tag: 'div' })

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
  if (props.showForNav && !currentNav?.value.startsWith(props.showForNav)) {
    return false
  }
  return true
}
</script>

<template>
  <component
    v-if="isVisible()"
    :is="props.type ? components[props.type] : tag"
    v-bind="props.config"
    >{{ text }}
    <a v-if="showForNav" :name="showForNav"></a>
    <template #left v-if="props.leftChildren">
      <RecursiveComponent
        v-for="(child, index) in props.leftChildren"
        :key="index"
        v-bind="processItem(child)"
      />
    </template>
    <template #top v-if="props.topChildren">
      <RecursiveComponent
        v-for="(child, index) in props.topChildren"
        :key="index"
        v-bind="processItem(child)"
      />
    </template>
    <template #bottom v-if="props.bottomChildren">
      <RecursiveComponent
        v-for="(child, index) in props.bottomChildren"
        :key="index"
        v-bind="processItem(child)"
      />
    </template>
    <template #right v-if="props.rightChildren">
      <RecursiveComponent
        v-for="(child, index) in props.rightChildren"
        :key="index"
        v-bind="processItem(child)"
      />
    </template>

    <RecursiveComponent
      v-for="(child, index) in props.children"
      :key="index"
      v-bind="processItem(child)"
    />
  </component>
</template>
