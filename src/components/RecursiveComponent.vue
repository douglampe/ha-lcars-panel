<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { components, loadRemoteConfig, mixins } from '../HAConfig'
import { currentNav } from '@/LocalNav'
import type { ConfigItem } from '@/ConfigItem'
import { getStateValue, haState } from '@/HAState'
import { onMounted, ref } from 'vue'
import { removeUndefined } from '@/Layout'

const props = withDefaults(defineProps<ConfigItem>(), { tag: 'div' })

const processedProps = ref<ConfigItem>({})

onMounted(async () => {
  let processedItem = { ...props }
  await loadRemoteConfig(processedItem)

  removeUndefined(processedItem)

  if (props.mixin && mixins.value[props.mixin]) {
    const mixin = mixins.value[props.mixin]
    processedItem = {
      ...mixin,
      ...processedItem,
    }
  }

  if (props.stateMap) {
    const val = getStateValue(haState.value, props.stateMap.entity, props.stateMap.attribute)
    if (val) {
      const stateMapValues = props.stateMap.states[val]
      if (stateMapValues) {
        processedItem = {
          ...processedItem,
          ...stateMapValues,
        }
      }
    }
  }

  processedProps.value = processedItem
})

function isVisible() {
  if (!processedProps.value) {
    return false
  }
  if (
    processedProps.value.showForNav &&
    !currentNav?.value.startsWith(processedProps.value.showForNav)
  ) {
    return false
  }
  return true
}
</script>

<template>
  <component
    v-if="isVisible()"
    :is="processedProps.type ? components[processedProps.type] : tag"
    v-bind="processedProps.config ?? processedProps"
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
