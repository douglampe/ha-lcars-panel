<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { components, mixins } from '../HAConfig'
import { currentNav } from '@/LocalNav'
import type { ConfigItem } from '@/ConfigItem'
import { computed, onMounted, ref, useAttrs } from 'vue'
import { removeUndefined } from '@/Layout'
import { getStateValue, haState } from '@/HAState'
import HTMLComponent from './HTMLComponent.vue'
import ParentComponent from './ParentComponent.vue'
import LoadingComponent from './LoadingComponent.vue'

const props = useAttrs()

const processedProps = ref<ConfigItem>()
const renderKey = ref(0)

defineOptions({
  inheritAttrs: false,
})

function removeFalse(obj: Record<string, any>) {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === false) {
      delete obj[key]
    }
  })

  return obj
}

function processItem(item: ConfigItem) {
  let processedItem = { ...item }

  if (processedItem.mixin && mixins.value[processedItem.mixin]) {
    const mixin = mixins.value[processedItem.mixin]
    processedItem = {
      ...mixin,
      ...processedItem,
    }
  }

  if (processedItem.stateMap) {
    const val = getStateValue(
      haState.value,
      processedItem.stateMap.entity,
      processedItem.stateMap.attribute,
    )
    if (val) {
      const stateMapValues = processedItem.stateMap.states[val]
      if (stateMapValues) {
        processedItem = {
          ...processedItem,
          ...stateMapValues,
        }
      }
    }
  }

  if (processedItem.tag) {
    const { showForNav, stateMap, children, mixin, ...rest } = processedItem
    return { ...rest }
  }

  removeUndefined(processedItem)
  removeFalse(processedItem)

  if (processedItem.children) {
    delete processedItem.children
  }

  renderKey.value++

  return processedItem
}

function getComponentType(cmps: Record<string, any>) {
  if (!cmps) {
    return LoadingComponent
  }

  if (props.type) {
    const cmpType = cmps[props.type as any as string]
    if (cmpType) {
      return cmpType
    }
  }

  return props.tag ? HTMLComponent : 'div'
}

const isVisible = computed(() => {
  if (
    components &&
    (!processedProps?.value?.showForNav ||
      currentNav?.value.startsWith(processedProps.value.showForNav))
  ) {
    return true
  }
  return false
})

onMounted(() => {
  if (!processedProps.value) {
    processedProps.value = processItem(props as ConfigItem)
  }
})
</script>

<template>
  <component
    v-if="isVisible"
    :is="getComponentType(components)"
    v-bind="processedProps"
    :key="renderKey"
  >
    {{ processedProps?.text }}
    <a v-if="props.showForNav" :name="props.showForNav"></a>
    <template #left v-if="props.leftChildren">
      <ParentComponent :children="props.leftChildren as Array<ConfigItem>" />
    </template>
    <template #top v-if="props.topChildren">
      <ParentComponent :children="props.topChildren as Array<ConfigItem>" />
    </template>
    <template #bottom v-if="props.bottomChildren">
      <ParentComponent :children="props.bottomChildren as Array<ConfigItem>" />
    </template>
    <template #right v-if="props.rightChildren">
      <ParentComponent :children="props.rightChildren as Array<ConfigItem>" />
    </template>
    <ParentComponent v-if="props.children" :children="props.children as Array<ConfigItem>" />
  </component>
</template>
