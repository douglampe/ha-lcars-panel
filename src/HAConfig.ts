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
  navStructure?: NavItem[]
  theme?: string
  remoteRoot?: string
  disableAnimations?: boolean
  editorEnabled?: boolean
  disableWatchers?: boolean
  components?: Record<string, ConfigItem>
}

export const haCards = ref<Array<any>>([])

export const mixins = ref({} as any)

export function loadConfig(config: any) {
  if (!config) {
    return
  }
  const processedConfig = {
    theme: 'default',
    positioning: 'relative',
    disableAnimations: false,
    editorEnabled: false,
    disableWatchers: false,
    vars: {
      lcars_unit: '2vw',
      lcars_unit_lg: '3.33vw',
      lcars_unit_md: '5vw',
      lcars_unit_sm: '6vw',
      lcars_text_transform: 'uppercase',
    },
    ...structuredClone(config),
  }
  loadMixins(processedConfig)
  loadTheme(processedConfig.theme)
  loadVariables(processedConfig)
  loadMenu(processedConfig)
  addConfigToItems(processedConfig.children, processedConfig)

  return processedConfig
}

export function getMinConfig(config: HAConfig) {
  return {
    vars: config.vars,
    mixins: config.mixins,
    navStructure: config.navStructure,
    components: config.components,
    type: '',
    children: [],
  }
}

export function addConfigToItems(items: ConfigItem[] | undefined, config: HAConfig) {
  if (!items) {
    return
  }
  for (const item of items) {
    if (item.children) {
      addConfigToItems(item.children, config)
    }
    item.config = getMinConfig(config)
  }
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
