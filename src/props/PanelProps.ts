import type { Animations } from '@/AnimationConfig'

export interface PanelProps {
  title?: string
  color?: string | number
  fillWidth?: boolean
  fillHeight?: boolean
  fillTopLeft?: boolean
  fillTopRight?: boolean
  fillLeftTop?: boolean
  fillLeftBottom?: boolean
  fillRightTop?: boolean
  fillRightBottom?: boolean
  fillBottomLeft?: boolean
  fillBottomRight?: boolean
  gap?: number
  topHeight?: number
  topCap?: boolean
  topGap?: number
  topStretch?: boolean
  leftWidth?: number
  leftPad?: number
  leftColor?: string | number
  leftGap?: number
  leftStretch?: boolean
  rightWidth?: number
  rightPad?: number
  rightColor?: string | number
  rightGap?: number
  rightStretch?: boolean
  bottomCap?: boolean
  bottomHeight?: number
  bottomGap?: number
  bottomStretch?: boolean
  outerRadX?: number
  outerRadY?: number
  innerRadX?: number
  innerRadY?: number
}
