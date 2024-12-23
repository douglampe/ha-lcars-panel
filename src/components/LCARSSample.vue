<script setup lang="ts">
import { computed } from 'vue'
import LCARSCol from './LCARSCol.vue'
import LCARSMarkdown from './LCARSMarkdown.vue'
import LCARSRow from './LCARSRow.vue'
import RecursiveComponent from './RecursiveComponent.vue'
import YAML from 'yaml'

const { content, configYaml } = defineProps<{ content: string; configYaml: string }>()

const parsedConfig = computed(() => {
  if (!configYaml) {
    return {}
  }

  return YAML.parse(`children:\n${configYaml}`)
})
</script>

<template>
  <LCARSMarkdown :content="content"></LCARSMarkdown>
  <LCARSRow :margin-bottom="1">
    <pre>{{ configYaml }}</pre>
    <LCARSCol :margin-left="1"
      ><RecursiveComponent v-bind="parsedConfig"></RecursiveComponent>
    </LCARSCol>
  </LCARSRow>
</template>
