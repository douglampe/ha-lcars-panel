import type { HAConfig } from '@/HAConfig'
import type { TapActionProps } from './TapActionProps'

export interface ScaleProps {
  entity?: string
  attribute?: string
  title?: string
  titleColor?: string | number
  titleWidth?: number
  titleHeight?: number
  titleTapAction?: TapActionProps
  width?: number
  height?: number
  barThickness?: number
  barOffset?: number
  color?: string | number
  borderColor?: string | number
  bgColor?: string | number
  gridColor?: string | number
  stroke?: number
  min?: number
  max?: number
  tickInterval?: number
  showTickLabels?: boolean
  tickLabelFontSize?: string | number
  tickLabelMin?: number
  tickLabelMax?: number
  minorTickInterval?: number
  decimalPlaces?: number
  showGrid?: boolean
  service?: string
  serviceKey?: string
  data?: any
  topBorder?: number
  bottomBorder?: number
  leftBorder?: number
  rightBorder?: number
  config?: HAConfig
}
