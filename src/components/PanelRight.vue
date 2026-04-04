<script setup lang="ts">
import type { MarginProps } from '@/props/MarginProps'
import type { RadiusProps } from '@/props/RadiusProps'
import LCARSCol from './LCARSCol.vue'
import LCARSRow from './LCARSRow.vue'
import LCARSElement from './LCARSElement.vue'

interface PanelRightProps extends MarginProps, RadiusProps {
  title?: string
  color?: string | number
  fillWidth?: boolean
  fillHeight?: boolean
  fillTopLeft?: boolean
  fillTopRight?: boolean
  fillRightTop?: boolean
  fillRightBottom?: boolean
  fillBottomLeft?: boolean
  fillBottomRight?: boolean
  gap?: number
  topHeight?: number
  topCap?: boolean
  topStretch?: boolean
  leftPad?: number
  rightWidth?: number
  rightPad?: number
  rightColor?: string | number
  rightGap?: number
  rightStretch?: boolean
  bottomCap?: boolean
  bottomHeight?: number
  bottomStretch?: boolean
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
  fillRightTop = true,
  fillRightBottom = true,
  fillBottomLeft = true,
  fillBottomRight = true,
  gap = 1,
  topHeight = 1,
  topStretch,
  leftPad,
  rightWidth = 3,
  rightPad,
  rightColor,
  rightGap,
  rightStretch,
  bottomHeight = 1,
  bottomStretch,
  radXTopRight = 2,
  radYTopRight = 2,
  radXBottomRight = 2,
  radYBottomRight = 2,
  radXInnerTopRight = 1,
  radYInnerTopRight = 1,
  radXInnerBottomRight = 1,
  radYInnerBottomRight = 1,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  backgroundScale = 100,
} = defineProps<PanelRightProps>()

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
    :stretch="fillRightTop || fillRightBottom || fillHeight"
    :margin-left="marginLeft"
    :margin-right="marginRight"
    :margin-bottom="marginBottom"
  >
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
  <LCARSRow
    bottom
    :margin-left="marginLeft"
    :margin-right="marginRight"
    :margin-bottom="marginBottom"
    :stretch="bottomStretch || fillBottomLeft || fillBottomRight || fillWidth"
  >
    <LCARSElement
      v-if="fillBottomLeft"
      :fill="true"
      :color="color"
      :height="bottomHeight"
    ></LCARSElement>
    <LCARSElement
      v-if="fillWidth"
      :fill="true"
      :color="color"
      :height="bottomHeight"
    ></LCARSElement>
    <slot name="bottom"></slot>
    <LCARSElement
      v-if="fillBottomRight"
      :fill="true"
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
      :backgroundScale="backgroundScale"
    ></LCARSElement>
  </LCARSRow>
</template>
