import type { MarginProps } from '@/props/MarginProps'
import type { PadProps } from '@/props/PadProps'
import type { RadiusProps } from './RadiusProps'

export interface ElementProps extends MarginProps, PadProps, RadiusProps {
  nav?: string
  color?: string
  textColor?: string
  fontSize?: number
  lineHeight?: number
  width?: number
  height?: number
  fill?: boolean
  button?: boolean
  alignContent?: string
  textTransform?: string
}
