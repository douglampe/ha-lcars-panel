<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import type { ConfigItem } from '@/ConfigItem'
import { onMounted, ref } from 'vue'
import RecursiveComponent from './RecursiveComponent.vue'
import YAML from 'yaml'

const props = defineProps<ConfigItem>()

const processedProps = ref<ConfigItem>()

async function getRemoteConfig(item: ConfigItem) {
  if (item.url) {
    try {
      const response = await fetch(item.url.replace('~', import.meta.env.BASE_URL))
      const text = await response.text()
      const remoteConfig = YAML.parse(text)
      if (remoteConfig.type === 'custom:ha-lcars-panel') {
        remoteConfig.type = 'el'
      }
      return remoteConfig
    } catch (error) {
      console.error(`Error loading remote config from ${item.url}:`, error)
    }
  }
}

onMounted(async () => {
  processedProps.value = await getRemoteConfig(props)
})
</script>

<template>
  <div>
    <RecursiveComponent v-if="processedProps" v-bind="processedProps" />
  </div>
</template>
