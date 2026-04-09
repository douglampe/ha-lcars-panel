import YAML from 'yaml'
import themesYaml from '@/assets/themes/themes.yaml?raw'
import { ref } from 'vue'

export const themeConfig = ref<Record<string, string[]>>()
themeConfig.value = YAML.parse(themesYaml) as Record<string, string[]>

export function getTheme(name?: string) {
  if (!themeConfig.value) {
    return []
  }
  return themeConfig.value[name ?? 'default']
}

export function getThemeColor(themeName: string | undefined, index: number) {
  const theme = getTheme(themeName)
  if (!theme || theme.length === 0) {
    return themeConfig.value?.default?.[0] || '#ffc152'
  }
  return theme[(index - 1) % theme.length]
}
