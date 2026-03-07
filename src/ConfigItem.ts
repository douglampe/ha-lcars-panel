import type { ElementProps } from './props/ElementProps'
import type { PanelProps } from './props/PanelProps'
import type { RowProps } from './props/RowProps'
import type { TapActionProps } from './props/TapActionProps'

export interface ConfigItem extends ElementProps, PanelProps, RowProps, TapActionProps {
  type?: string
  tag?: string
  text?: string
  showForNav?: string
  stateMap?: { entity: string; attribute?: string; states: Record<string, any> }
  children?: ConfigItem[]
  leftChildren?: ConfigItem[]
  rightChildren?: ConfigItem[]
  topChildren?: ConfigItem[]
  bottomChildren?: ConfigItem[]
  config?: Record<string, any>
  mixin?: string
  url?: string
  remoteLoaded?: boolean
}
