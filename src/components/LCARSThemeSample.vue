<script setup lang="ts">
import { computed, ref } from 'vue'
import YAML from 'yaml'
import themeConfig from '@/assets/themes/themes.yaml?raw'
import LCARSElement from './LCARSElement.vue'
import PanelTL from './PanelTL.vue'
import LCARSCol from './LCARSCol.vue'

const selectedTheme = ref<string>('default')

const parsedConfig = computed(() => {
  if (!themeConfig) {
    return {}
  }

  return YAML.parse(themeConfig)
})

const themeNames = computed(() => {
  const themes = parsedConfig.value
  if (!themes) {
    return []
  }
  return Object.keys(themes)
})

const theme = computed(() => {
  let colors = []
  if (selectedTheme.value) {
    const themeConfig = parsedConfig.value[selectedTheme.value]
    for (let i = 0; i < 10; i++) {
      const index = i % themeConfig.length
      colors.push(themeConfig[index])
    }
  }
  return colors as string[]
})
</script>

<template>
  <PanelTL :width="1" color="1" :left-width="5">
    <template #left>
      <LCARSElement
        v-for="(name, index) in themeNames"
        :key="index"
        :color="parsedConfig[name][0] ?? '1'"
        :width="5"
        text-color="black"
        :button="true"
        @click="selectedTheme = name"
        text-transform="none"
        :cap-right="selectedTheme === name"
        >{{ name }}</LCARSElement
      >
    </template>
    <LCARSElement
      v-if="theme"
      v-for="(color, index) in theme"
      :key="index"
      :color="color"
      :width="5"
      :pad-left="0.1"
      text-color="black"
      text-align="center"
    >
      Color {{ index + 1 }}
    </LCARSElement>
  </PanelTL>
</template>
