import type { MarginProps } from '@/props/MarginProps'
import type { PadProps } from '@/props/PadProps'
import type { RadiusProps } from './RadiusProps'
import type { TapActionProps } from './TapActionProps'

export interface ElementProps extends MarginProps, PadProps, RadiusProps {
  nav?: string
  color?: string
  textColor?: string
  fontSize?: number
  lineHeight?: number
  width?: number | string
  height?: number | string
  fill?: boolean
  button?: boolean
  alignContent?: string
  textTransform?: string
  tapAction?: TapActionProps
}
