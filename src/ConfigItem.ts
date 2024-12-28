export interface ConfigItem {
  type?: string
  tag?: string
  text?: string
  showForNav?: string
  children?: ConfigItem[]
  leftChildren?: ConfigItem[]
  rightChildren?: ConfigItem[]
  topChildren?: ConfigItem[]
  bottomChildren?: ConfigItem[]
  config?: Record<string, any>
  mixin?: string
}
