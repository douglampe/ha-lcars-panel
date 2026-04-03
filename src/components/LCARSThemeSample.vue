<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import YAML from 'yaml'
import themeConfig from '@/assets/themes/themes.yaml?raw'
import LCARSElement from './LCARSElement.vue'
import PanelTL from './PanelTL.vue'
import LCARSCol from './LCARSCol.vue'
import { currentNav } from '@/LocalNav'

const selectedTheme = ref<string>('default')

const { rootPath = '/config/themes' } = defineProps<{ rootPath?: string }>()

const theme = ref<string[]>()

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

function getThemeFromNav() {
  const parts = currentNav.value.split('/')
  let themeColors = [] as string[]
  const colors = [] as string[]
  if (parts.length > rootPath.split('/').length) {
    const themeNameFromNav = parts[parts.length - 1]
    const themeFromNav = parsedConfig.value[themeNameFromNav]

    if (themeFromNav) {
      themeColors = themeFromNav
      selectedTheme.value = themeNameFromNav
    }
  }
  if (themeColors.length === 0) {
    themeColors = parsedConfig.value['default']
  }
  if (themeColors.length > 0) {
    for (let i = 0; i < 10; i++) {
      const index = i % themeColors.length
      colors.push(themeColors[index])
    }
  }
  theme.value = colors
}

watch(currentNav, () => {
  getThemeFromNav()
})

onMounted(() => {
  getThemeFromNav()
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
        :nav="rootPath + '/' + name"
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
