<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LCARSCol from './LCARSCol.vue'
import LCARSMarkdown from './LCARSMarkdown.vue'
import LCARSRow from './LCARSRow.vue'
import RecursiveComponent from './RecursiveComponent.vue'
import YAML from 'yaml'
import type { ConfigItem } from '@/ConfigItem'
import { addConfigToItems, type HAConfig } from '@/HAConfig'

const { content, configYaml, config } = defineProps<{
  content?: string
  configYaml?: string
  config: HAConfig
}>()
const parsedConfig = ref<ConfigItem>()

defineOptions({
  inheritAttrs: false,
})

onMounted(() => {
  if (configYaml) {
    const yamlConfig = YAML.parse(configYaml)
    const sampleConfig = Array.isArray(yamlConfig)
      ? { children: yamlConfig, config }
      : { ...yamlConfig }
    addConfigToItems(sampleConfig.children, config)
    parsedConfig.value = sampleConfig
  }
})
</script>

<template>
  <div>
    <LCARSMarkdown v-if="content" :content="content"></LCARSMarkdown>
    <p v-if="content"></p>
    <LCARSRow :wrap="true">
      <pre>{{ configYaml }}</pre>
      <LCARSCol :margin-left="1">
        <RecursiveComponent v-if="parsedConfig" v-bind="parsedConfig"></RecursiveComponent>
      </LCARSCol>
    </LCARSRow>
  </div>
</template>
