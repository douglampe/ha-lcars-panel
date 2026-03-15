<script setup lang="ts">
import { computed, ref } from 'vue'
import YAML from 'yaml'
import themeConfig from '@/assets/themes/themes.yaml?raw'
import LCARSElement from './LCARSElement.vue'
import PanelTL from './PanelTL.vue'
import LCARSCol from './LCARSCol.vue'
import { currentNav } from '@/LocalNav'

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
  const colors = []
  if (currentNav.value) {
    const parts = currentNav.value.split('/')
    if (parts.length > 3) {
      selectedTheme.value = parts[parts.length - 1]
    }
  }
  if (!parsedConfig.value || !selectedTheme.value) {
    return []
  }
  const theme = parsedConfig.value[selectedTheme.value ?? 'default']
  if (!theme) {
    return []
  }
  for (let i = 0; i < 10; i++) {
    const index = i % theme.length
    colors.push(theme[index])
  }
  return colors as string[]
})
</script>

<template>
  <PanelTL :width="1" color="1" :left-width="10">
    <template #left>
      <LCARSElement
        v-for="(name, index) in themeNames"
        :key="index"
        :color="parsedConfig[name][0] ?? '1'"
        :width="10"
        text-color="black"
        :button="true"
        :nav="'/config/themes/' + name"
        :capRight="selectedTheme === name"
        text-transform="none"
        >{{ name }}</LCARSElement
      >
    </template>
    <LCARSCol v-if="theme">
      <LCARSElement
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
    </LCARSCol>
  </PanelTL>
</template>
