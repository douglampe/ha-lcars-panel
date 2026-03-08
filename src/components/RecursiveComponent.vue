<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { components } from '../HAConfig'
import { currentNav } from '@/LocalNav'
import { applyMixin, applyOrientationClass, applyState, type ConfigItem } from '@/ConfigItem'
import { computed, onMounted, ref, useAttrs, watch } from 'vue'
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

  removeUndefined(processedItem)

  applyMixin(processedItem)

  applyState(processedItem)

  applyOrientationClass(processedItem)

  if (processedItem.tag) {
    const { showForNav, stateMap, children, mixin, ...rest } = processedItem
    return { ...rest }
  }

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

if (props.stateMap) {
  watch(
    () => haState.value,
    (v) => {
      processedProps.value = processItem(props)
    },
    { deep: true },
  )
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
    :style="processedProps?.style ?? {}"
    :class="processedProps?.class ?? []"
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
