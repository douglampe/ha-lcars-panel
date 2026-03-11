<script setup lang="ts">
import { ref, watch } from 'vue'
import { haConfig } from '@/HAConfig'
import YAML from 'yaml'

defineOptions({
  inheritAttrs: false,
})

const config = ref<string>(YAML.stringify(haConfig.value))

function onConfigChange(event: Event) {
  const newConfig = (event.target as HTMLTextAreaElement).value
  config.value = newConfig
  haConfig.value = YAML.parse(newConfig)
}

watch(haConfig, (newConfig) => {
  config.value = YAML.stringify(newConfig)
})
</script>

<template>
  <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 25%; z-index: 99">
    <textarea style="width: 100%; height: 100%" @input="onConfigChange">{{ config }}</textarea>
  </div>
</template>
