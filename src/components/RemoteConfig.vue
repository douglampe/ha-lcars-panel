<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import type { ConfigItem } from '@/ConfigItem'
import { onMounted, ref } from 'vue'
import RecursiveComponent from './RecursiveComponent.vue'
import YAML from 'yaml'
import { addConfigToItems } from '@/HAConfig'
import { applyStateToItem } from '@/HAState'

const props = defineProps<ConfigItem>()

const processedProps = ref<ConfigItem>()

const contentMap = {} as Record<string, string>

async function getRemoteConfig(item: ConfigItem) {
  if (item.url) {
    try {
      let cachedContent = contentMap[item.url]

      if (!cachedContent) {
        const response = await fetch(
          item.url.replace('~', props.config?.remoteRoot ?? import.meta.env.BASE_URL),
        )
        const text = await response.text()
        cachedContent = text
        contentMap[item.url] = text
      }

      const remoteConfig = YAML.parse(cachedContent)

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
  const remoteConfig = await getRemoteConfig(props)
  if (remoteConfig && props.config) {
    remoteConfig.config = props.config
    addConfigToItems(remoteConfig.children, remoteConfig.config)
    processedProps.value = remoteConfig
    applyStateToItem(remoteConfig, props.config)
  }
})
</script>

<template>
  <div>
    <RecursiveComponent v-if="processedProps?.visible" v-bind="processedProps" />
  </div>
</template>
