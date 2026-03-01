<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LCARSCol from './LCARSCol.vue'
import LCARSMarkdown from './LCARSMarkdown.vue'
import LCARSRow from './LCARSRow.vue'
import RecursiveComponent from './RecursiveComponent.vue'
import YAML from 'yaml'
import { loadRemoteConfig } from '@/HAConfig'
import type { ConfigItem } from '@/ConfigItem'

const { content, configYaml } = defineProps<{ content?: string; configYaml: string }>()
const parsedConfig = ref<ConfigItem>({})

onMounted(async () => {
  if (!configYaml) {
    parsedConfig.value = {}
  } else {
    const yamlConfig = YAML.parse(`children:\n${configYaml}`)
    await loadRemoteConfig(yamlConfig)
    parsedConfig.value = yamlConfig
  }
})
</script>

<template>
  <LCARSMarkdown v-if="content" :content="content"></LCARSMarkdown>
  <LCARSRow :margin-bottom="1">
    <pre>{{ configYaml }}</pre>
    <LCARSCol :margin-left="1"
      ><RecursiveComponent v-if="parsedConfig" v-bind="parsedConfig"></RecursiveComponent>
    </LCARSCol>
  </LCARSRow>
</template>
