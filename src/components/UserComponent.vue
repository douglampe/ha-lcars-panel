<script setup lang="ts">
import { onMounted, ref, useAttrs } from 'vue'
import RecursiveComponent from './RecursiveComponent.vue'
import type { ConfigItem } from '@/ConfigItem'
import { applyTemplates } from '@/HAState'

const processedProps = ref<ConfigItem>()
const attrs = useAttrs()

defineOptions({
  inheritAttrs: false,
})

onMounted(() => {
  {
    const { type, config } = attrs as any
    if (config?.components && type?.startsWith('user:')) {
      const userType = type.substring(5)
      if (config.components.hasOwnProperty(userType)) {
        const componentConfig = { ...config?.components[userType] }
        applyTemplates(componentConfig, attrs)
        processedProps.value = componentConfig
      }
    }
  }
})
</script>

<template>
  <div>
    <pre>{{ processedProps }}</pre>
    <RecursiveComponent :isUserComponent="true" v-if="processedProps" v-bind="processedProps" />
  </div>
</template>
