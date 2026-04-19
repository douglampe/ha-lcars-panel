<script setup lang="ts">
import { onMounted, ref, useAttrs } from 'vue'
import RecursiveComponent from './RecursiveComponent.vue'
import type { ConfigItem } from '@/ConfigItem'
import { renderString } from 'nunjucks'
import deepmerge from 'deepmerge'

const processedProps = ref<ConfigItem>()
const attrs = useAttrs()

defineOptions({
  inheritAttrs: false,
})

function applyPropTemplates(configItem: ConfigItem) {
  for (const key in configItem) {
    if (key.endsWith('_template')) {
      const valueKey = key.substring(0, key.length - 9)
      const oldValue = configItem[valueKey as keyof ConfigItem]
      const templateValue = configItem[key as keyof ConfigItem] as string
      if (templateValue.includes('props.')) {
        const newValue = renderString(templateValue, {
          props: attrs,
        })
        if (newValue !== oldValue) {
          configItem[key as keyof ConfigItem] = newValue
        }
      }
    } else {
      const val = configItem[key as keyof ConfigItem]
      if (typeof val === 'object') {
        applyPropTemplates(val)
      }
    }
  }

  if (configItem.children) {
    for (const child of configItem.children) {
      applyPropTemplates(child)
    }
  }
}

onMounted(() => {
  {
    const { type, config } = attrs as any
    if (config?.components && type?.startsWith('user:')) {
      const userType = type.substring(5)
      if (config.components.hasOwnProperty(userType)) {
        let componentConfig = { ...config?.components[userType] }
        componentConfig = JSON.parse(JSON.stringify(componentConfig))
        applyPropTemplates(componentConfig)

        if (attrs.additionalConfig) {
          componentConfig = deepmerge(componentConfig, attrs.additionalConfig)
        }

        processedProps.value = componentConfig
      }
    }
  }
})
</script>

<template>
  <RecursiveComponent :isUserComponent="true" v-if="processedProps" v-bind="processedProps" />
</template>
