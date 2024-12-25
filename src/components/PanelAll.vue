<script setup lang="ts">
import type { MarginProps } from '@/props/MarginProps'
import type { RadiusProps } from '@/props/RadiusProps'
import LCARSCol from './LCARSCol.vue'
import LCARSRow from './LCARSRow.vue'
import LCARSElement from './LCARSElement.vue'

interface PanelBLProps extends MarginProps, RadiusProps {
  title?: string
  color: string
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
  leftColor?: string
  leftGap?: number
  leftStretch: boolean
  rightWidth?: number
  rightPad?: number
  rightColor?: string
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

const {
  title,
  color = 'default',
  fillWidth = true,
  fillHeight = true,
  fillTopLeft = true,
  fillTopRight,
  fillLeftTop = true,
  fillLeftBottom = true,
  fillRightTop = true,
  fillRightBottom = true,
  fillBottomLeft = true,
  fillBottomRight = true,
  gap = 1,
  topHeight = 1,
  topGap,
  topStretch,
  leftWidth = 3,
  leftPad,
  leftColor,
  leftGap,
  leftStretch,
  rightWidth = 3,
  rightPad,
  rightColor,
  rightGap,
  rightStretch,
  bottomHeight = 1,
  bottomGap,
  bottomStretch,
  radXTopLeft = 2,
  radYTopLeft = 2,
  radXTopRight = 2,
  radYTopRight = 2,
  radXBottomLeft = 2,
  radYBottomLeft = 2,
  radXBottomRight = 2,
  radYBottomRight = 2,
  radXInnerTopLeft = 1,
  radYInnerTopLeft = 1,
  radXInnerTopRight = 1,
  radYInnerTopRight = 1,
  radXInnerBottomLeft = 1,
  radYInnerBottomLeft = 1,
  radXInnerBottomRight = 1,
  radYInnerBottomRight = 1,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
} = defineProps<PanelBLProps>()
</script>

<template>
  <LCARSRow :margin-top="marginTop" :margin-left="marginLeft" :margin-right="marginRight">
    <LCARSElement
      :color="color"
      :width="leftWidth + radXInnerTopLeft"
      :height="topHeight + radYInnerTopLeft"
      :rad-x-top-left="radXTopLeft"
      :rad-y-top-left="radYTopLeft"
      :rad-x-inner-top-left="radXInnerTopLeft"
      :rad-y-inner-top-left="radYInnerTopLeft"
    ></LCARSElement>
    <LCARSElement
      v-if="fillTopLeft"
      :fill="fillTopLeft"
      :color="color"
      :height="topHeight"
    ></LCARSElement>
    <LCARSRow
      v-if="$slots.top"
      :margin-left="(gap || topGap || 0) / 10"
      :margin-right="(gap || topGap || 0) / 10"
      :gap="topGap ?? gap"
      :height="topHeight"
      :stretch="topStretch"
    >
      <slot name="top"></slot>
    </LCARSRow>
    <LCARSElement
      v-if="fillTopRight"
      :fill="fillTopRight"
      :color="color"
      :height="topHeight"
    ></LCARSElement>
    <LCARSElement v-if="title" :font-size="topHeight" :text-color="color" :line-height="topHeight">
      {{ title }}
    </LCARSElement>
    <LCARSElement
      :color="color"
      :width="rightWidth + radXInnerTopRight"
      :height="topHeight + radYInnerTopRight"
      :rad-x-top-right="radXTopRight"
      :rad-y-top-right="radYTopRight"
      :rad-x-inner-top-right="radXInnerTopRight"
      :rad-y-inner-top-right="radYInnerTopRight"
    ></LCARSElement>
  </LCARSRow>
  <LCARSRow
    :fill="fillHeight"
    :margin-left="marginLeft"
    :margin-right="marginRight"
    :margin-bottom="marginBottom"
  >
    <LCARSCol>
      <LCARSElement
        v-if="fillLeftTop"
        :fill="fillLeftTop"
        :color="leftColor ?? color"
        :width="leftWidth"
      ></LCARSElement>
      <LCARSCol
        v-if="$slots.left"
        :margin-top="(leftGap || gap || 0) / 10"
        :margin-bottom="(leftGap || gap || 0) / 10"
        :stretch="leftStretch"
        :gap="leftGap ?? gap"
      >
        <slot name="left"></slot>
      </LCARSCol>
      <LCARSElement
        v-if="fillLeftBottom"
        :fill="fillLeftBottom"
        :color="leftColor ?? color"
        :width="leftWidth"
      ></LCARSElement>
    </LCARSCol>
    <LCARSCol :fill="true" :margin-left="leftPad" :margin-right="rightPad">
      <slot></slot>
    </LCARSCol>
    <LCARSCol>
      <LCARSElement
        v-if="fillRightTop"
        :fill="fillRightTop"
        :color="rightColor ?? color"
        :width="rightWidth"
      ></LCARSElement>
      <LCARSCol
        v-if="$slots.right"
        :margin-top="(rightGap || gap || 0) / 10"
        :margin-bottom="(rightGap || gap || 0) / 10"
        :gap="rightGap ?? gap"
        :stretch="rightStretch"
      >
        <slot name="right"></slot>
      </LCARSCol>
      <LCARSElement
        v-if="fillRightBottom"
        :fill="fillRightBottom"
        :color="rightColor ?? color"
        :width="rightWidth"
      ></LCARSElement>
    </LCARSCol>
  </LCARSRow>
  <LCARSRow
    bottom
    :margin-left="marginLeft"
    :margin-right="marginRight"
    :margin-bottom="marginBottom"
  >
    <LCARSElement
      :color="color"
      :width="leftWidth + radXInnerBottomLeft"
      :height="bottomHeight + radYInnerBottomLeft"
      :rad-x-bottom-left="radXBottomLeft"
      :rad-y-bottom-left="radYBottomLeft"
      :rad-x-inner-bottom-left="radXInnerBottomLeft"
      :rad-y-inner-bottom-left="radYInnerBottomLeft"
    ></LCARSElement>
    <LCARSElement
      v-if="fillBottomLeft"
      :fill="fillBottomLeft"
      :color="color"
      :height="bottomHeight"
    ></LCARSElement>
    <LCARSRow
      v-if="$slots.bottom"
      :margin-left="(leftGap || gap || 0) / 10"
      :margin-right="(leftGap || gap || 0) / 10"
      :gap="bottomGap ?? gap"
      :height="bottomHeight"
      :stretch="bottomStretch"
    >
      <slot name="bottom"></slot>
    </LCARSRow>
    <LCARSElement
      v-if="fillBottomRight"
      :fill="fillBottomRight"
      :color="color"
      :height="bottomHeight"
    ></LCARSElement>
    <LCARSElement
      :color="color"
      :width="rightWidth + radXInnerBottomRight"
      :height="bottomHeight + radYInnerBottomRight"
      :rad-x-bottom-right="radXBottomRight"
      :rad-y-bottom-right="radYBottomRight"
      :rad-x-inner-bottom-right="radXInnerBottomRight"
      :rad-y-inner-bottom-right="radYInnerBottomRight"
    ></LCARSElement>
  </LCARSRow>
</template>
