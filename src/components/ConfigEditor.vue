<script setup lang="ts">
import type { HAConfig } from '@/HAConfig'
import { onMounted, ref } from 'vue'
import YAML from 'yaml'

defineOptions({
  inheritAttrs: false,
})

const editorRef = ref()
const config = defineProps<{ config: HAConfig }>()
const configYaml = ref<string>()

function onConfigChange(event: Event) {
  if (!editorRef.value) {
    return
  }

  const newConfig = (event.target as HTMLTextAreaElement).value
  const changeEvent = new Event('config-changed', {
    bubbles: true,
    composed: true,
  }) as any
  changeEvent.detail = { config: newConfig }
  editorRef.value.dispatchEvent(changeEvent)
  configYaml.value = YAML.parse(newConfig)
}

onMounted(() => {
  configYaml.value = YAML.stringify(config)
})
</script>

<template>
  <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 25%; z-index: 99">
    <textarea
      ref="editorRef"
      style="width: 100%; height: 100%"
      @input="onConfigChange"
      v-model="configYaml"
    ></textarea>
  </div>
</template>
