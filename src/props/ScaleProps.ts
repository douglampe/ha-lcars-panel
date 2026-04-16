import type { HAConfig } from '@/HAConfig'
import type { TapActionProps } from './TapActionProps'

export interface ScaleProps {
  entity?: string
  attribute?: string
  title?: string
  titleColor?: string | number
  titleWidth?: number
  titleTapAction?: TapActionProps
  width?: number
  height?: number
  color?: string | number
  borderColor?: string | number
  bgColor?: string | number
  gridColor?: string | number
  stroke?: number
  min?: number
  max?: number
  tickInterval?: number
  tickFontSize?: string | number
  minorTickInterval?: number
  decimalPlaces?: number
  showGrid?: boolean
  showTickLabels?: boolean
  service?: string
  serviceKey?: string
  data?: any
  topBorder?: number
  bottomBorder?: number
  leftBorder?: number
  rightBorder?: number
  config?: HAConfig
}
