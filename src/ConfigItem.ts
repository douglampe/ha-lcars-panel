export interface ConfigItem {
  type?: string
  tag?: string
  text?: string
  visible?: boolean
  showForNav?: string
  showForOrientation?: string
  stateMap?: { entity: string; attribute?: string; states: Record<string, any> }
  children?: ConfigItem[]
  leftChildren?: ConfigItem[]
  rightChildren?: ConfigItem[]
  topChildren?: ConfigItem[]
  bottomChildren?: ConfigItem[]
  config?: Record<string, any>
  mixin?: string
  url?: string
  class?: string | Object
}
