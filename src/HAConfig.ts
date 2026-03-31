import type { ConfigItem } from './ConfigItem'
import { ref } from 'vue'
import themeConfig from '@/assets/themes/themes.yaml?raw'
import YAML from 'yaml'
import { loadMenu, type NavItem } from './NavItem'

export interface HAConfig {
  type: string
  vars: Record<string, string>
  mixins: Record<string, any>
  children: ConfigItem[]
  positioning?: string
  nav?: NavItem[]
  theme?: string
  remoteRoot?: string
  disableAnimations?: boolean
  editorEnabled?: boolean
}

export const haConfig = ref<HAConfig>({
  type: 'ha-lcars-panel',
  vars: {},
  mixins: {},
  children: [],
} as HAConfig)

export const haCards = ref<Array<any>>([])

export const mixins = ref({} as any)

export function loadConfig(config: any) {
  if (!config) {
    return
  }
  haConfig.value = config
  loadMixins(config)
  if (config.theme) {
    loadTheme(config.theme)
  } else {
    loadTheme('default')
  }
  loadVariables(config)
  loadMenu()
}

export function setVariable(key: string, value: string) {
  const formattedKey = `--${key.replace(/_/g, '-')}`
  document.documentElement?.style.setProperty(formattedKey, value)
}

export function loadVariables(haConfig: HAConfig) {
  if (haConfig?.vars) {
    Object.entries(haConfig.vars).forEach(([key, value]) => {
      setVariable(key, value as string)
    })
  }
}

export function loadTheme(theme: string) {
  const themes = YAML.parse(themeConfig)
  const colors = themes[theme] ?? themes['default'] ?? []
  for (let i = 0; i < 10; i++) {
    const index = i % colors.length
    setVariable(`lcars-color-${i + 1}`, `var(--lcars-color-${colors[index] as string})`)
  }
}

export function loadMixins(haConfig: HAConfig) {
  if (haConfig?.mixins) {
    mixins.value = haConfig.mixins
  }
}
