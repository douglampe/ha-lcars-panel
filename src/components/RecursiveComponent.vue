<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { components, mixins } from '../HAConfig'
import { currentNav } from '@/LocalNav'
import type { ConfigItem } from '@/ConfigItem'

const props = withDefaults(defineProps<ConfigItem>(), { tag: 'div' })

function applyMixin(item: ConfigItem) {
  if (item.mixin && mixins.value[item.mixin]) {
    return {
      ...mixins.value[item.mixin],
      ...item,
    }
  }
  return item
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
        v-bind="applyMixin(child)"
      />
    </template>
    <template #top v-if="props.topChildren">
      <RecursiveComponent
        v-for="(child, index) in props.topChildren"
        :key="index"
        v-bind="applyMixin(child)"
      />
    </template>
    <template #bottom v-if="props.bottomChildren">
      <RecursiveComponent
        v-for="(child, index) in props.bottomChildren"
        :key="index"
        v-bind="applyMixin(child)"
      />
    </template>
    <template #right v-if="props.rightChildren">
      <RecursiveComponent
        v-for="(child, index) in props.rightChildren"
        :key="index"
        v-bind="applyMixin(child)"
      />
    </template>

    <RecursiveComponent
      v-for="(child, index) in props.children"
      :key="index"
      v-bind="applyMixin(child)"
    />
  </component>
</template>
