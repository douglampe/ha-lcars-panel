import type { AnimationConfig, Animations } from './AnimationConfig'
import { mixins, type HAConfig } from './HAConfig'
import type { ElementProps } from './props/ElementProps'
import type { PanelProps } from './props/PanelProps'
import type { RowProps } from './props/RowProps'
import type { TapActionProps } from './props/TapActionProps'

export interface ConfigItem extends ElementProps, PanelProps, RowProps, TapActionProps {
  config?: HAConfig
  type?: string
  id?: string
  tag?: string
  visible?: boolean | string
  text?: string
  md?: string
  positioning?: string
  showForNav?: string
  showForOrientation?: string
  animations?: Animations
  stateMap?: { entity: string; attribute?: string; states: Record<string, any> }
  childPositioning?: string
  children?: ConfigItem[]
  leftChildren?: ConfigItem[]
  rightChildren?: ConfigItem[]
  topChildren?: ConfigItem[]
  bottomChildren?: ConfigItem[]
  topChildrenAnimation?: AnimationConfig
  bottomChildrenAnimation?: AnimationConfig
  leftChildrenAnimation?: AnimationConfig
  rightChildrenAnimation?: AnimationConfig
  childrenAnimation?: AnimationConfig
  mixin?: string
  url?: string
  textAnimation?: AnimationConfig
  style?: Record<string, any>
  class?: string | string[] | Record<string, boolean>
}

export function applyMixin(item: ConfigItem) {
  if (item.mixin && mixins.value[item.mixin]) {
    const mixin = mixins.value[item.mixin]
    Object.assign(item, { ...mixin, ...item })
  }
}

export function applyOrientationClass(item: ConfigItem) {
  if (item.showForOrientation) {
    const className = `lcars-${item.showForOrientation}-only`
    if (item.class) {
      if (typeof item.class === 'string') {
        item.class += ` ${className}`
      } else if (Array.isArray(item.class)) {
        item.class.push(className)
      } else if (typeof item.class === 'object') {
        item.class[className] = true
      }
    } else {
      item.class = [className]
    }
  }
}
