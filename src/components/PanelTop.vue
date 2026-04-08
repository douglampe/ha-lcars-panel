<script setup lang="ts">
import type { MarginProps } from '@/props/MarginProps'
import type { RadiusProps } from '@/props/RadiusProps'
import LCARSCol from './LCARSCol.vue'
import LCARSRow from './LCARSRow.vue'
import LCARSElement from './LCARSElement.vue'

interface PanelTopProps extends MarginProps, RadiusProps {
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
  gap?: number
  topHeight?: number
  topCap?: boolean
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
  outerRadX?: number
  outerRadY?: number
  innerRadX?: number
  innerRadY?: number
  backgroundScale?: number
}

const {
  title,
  color = 'default',
  fillWidth = true,
  fillHeight = true,
  fillTopLeft = true,
  fillTopRight,
  fillLeftTop,
  fillLeftBottom = true,
  fillRightTop,
  fillRightBottom = true,
  gap = 1,
  topHeight = 1,
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
  radXTopLeft = 2,
  radYTopLeft = 2,
  radXTopRight = 2,
  radYTopRight = 2,
  radXInnerTopLeft = 1,
  radYInnerTopLeft = 1,
  radXInnerTopRight = 1,
  radYInnerTopRight = 1,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  backgroundScale = 100,
} = defineProps<PanelTopProps>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <LCARSRow
    :margin-top="marginTop"
    :margin-left="marginLeft"
    :margin-right="marginRight"
    :stretch="topStretch || fillTopLeft || fillTopRight || fillWidth"
  >
    <LCARSElement
      :color="color"
      :width="leftWidth + radXInnerTopLeft"
      :height="topHeight + radYInnerTopLeft"
      :rad-x-top-left="radXTopLeft"
      :rad-y-top-left="radYTopLeft"
      :rad-x-inner-top-left="radXInnerTopLeft"
      :rad-y-inner-top-left="radYInnerTopLeft"
      :backgroundScale="backgroundScale"
    ></LCARSElement>
    <LCARSElement v-if="fillTopLeft" :fill="true" :color="color" :height="topHeight"></LCARSElement>
    <LCARSElement v-if="fillWidth" :fill="true" :color="color" :height="topHeight"></LCARSElement>
    <slot name="top"></slot>
    <LCARSElement
      v-if="fillTopRight"
      :fill="true"
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
      :backgroundScale="backgroundScale"
    ></LCARSElement>
  </LCARSRow>
  <LCARSRow
    :fill="fillHeight"
    :stretch="
      leftStretch || fillLeftTop || fillLeftBottom || fillRightTop || fillRightBottom || fillHeight
    "
    :margin-left="marginLeft"
    :margin-right="marginRight"
    :margin-bottom="marginBottom"
  >
    <LCARSCol :stretch="leftStretch || fillLeftTop || fillLeftBottom || fillHeight">
      <LCARSElement
        v-if="fillLeftTop"
        :fill="true"
        :color="leftColor ?? color"
        :width="leftWidth"
      ></LCARSElement>
      <LCARSCol
        v-if="$slots.left"
        :margin-top="(leftGap || gap || 0) / 10"
        :margin-bottom="(leftGap || gap || 0) / 10"
        :stretch="true"
        :gap="leftGap ?? gap"
      >
        <slot name="left"></slot>
      </LCARSCol>
      <LCARSElement
        v-if="fillLeftBottom"
        :fill="true"
        :color="leftColor ?? color"
        :width="leftWidth"
      ></LCARSElement>
    </LCARSCol>
    <LCARSCol :fill="true" :margin-left="leftPad" :margin-right="rightPad">
      <slot></slot>
    </LCARSCol>
    <LCARSCol :stretch="rightStretch || fillRightTop || fillRightBottom || fillHeight">
      <LCARSElement
        v-if="fillRightTop"
        :fill="true"
        :color="rightColor ?? color"
        :width="rightWidth"
        :stretch="true"
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
        :fill="true"
        :color="rightColor ?? color"
        :width="rightWidth"
        :stretch="true"
      ></LCARSElement>
    </LCARSCol>
  </LCARSRow>
</template>
