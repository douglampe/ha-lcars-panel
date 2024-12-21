<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { components } from '../HAConfig'
import { currentNav } from '@/LocalNav'
import type { ConfigItem } from '@/ConfigItem'

const props = withDefaults(defineProps<ConfigItem>(), { tag: 'div' })

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
  >
    <template #left v-if="props.leftChildren">
      <RecursiveComponent
        v-for="(child, index) in props.leftChildren"
        :key="index"
        v-bind="child"
      />
    </template>
    <template #top v-if="props.topChildren">
      <RecursiveComponent v-for="(child, index) in props.topChildren" :key="index" v-bind="child" />
    </template>
    <template #bottom v-if="props.bottomChildren">
      <RecursiveComponent
        v-for="(child, index) in props.bottomChildren"
        :key="index"
        v-bind="child"
      />
    </template>
    <template #right v-if="props.rightChildren">
      <RecursiveComponent
        v-for="(child, index) in props.rightChildren"
        :key="index"
        v-bind="child"
      />
    </template>
    {{ text }}
    <RecursiveComponent v-for="(child, index) in props.children" :key="index" v-bind="child" />
  </component>
</template>
