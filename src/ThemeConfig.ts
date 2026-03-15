import YAML from 'yaml'
import themesYaml from '@/assets/themes/themes.yaml?raw'
import { ref } from 'vue'
import { haConfig } from './HAConfig'

export const themeConfig = ref<Record<string, string[]>>()
themeConfig.value = YAML.parse(themesYaml) as Record<string, string[]>

export function getTheme(name?: string) {
  if (!themeConfig.value) {
    return []
  }
  return themeConfig.value[name ?? haConfig.value.theme ?? 'default']
}

export function getThemeColor(index: number) {
  const theme = getTheme()
  if (!theme || theme.length === 0) {
    return themeConfig.value?.default?.[0] || '#ffc152'
  }
  return theme[index % theme.length]
}
