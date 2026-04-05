<script setup lang="ts">
import type { MarginProps } from '@/props/MarginProps'
import type { RadiusProps } from '@/props/RadiusProps'
import LCARSCol from './LCARSCol.vue'
import LCARSRow from './LCARSRow.vue'
import LCARSElement from './LCARSElement.vue'

interface PanelAllProps extends MarginProps, RadiusProps {
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
  fillTopLeft,
  fillTopRight,
  fillLeftTop,
  fillLeftBottom,
  fillRightTop,
  fillRightBottom,
  fillBottomLeft,
  fillBottomRight,
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
  bottomHeight = 1,
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
  backgroundScale = 100,
} = defineProps<PanelAllProps>()

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
    <LCARSElement
      v-if="fillTopLeft || fillWidth"
      :fill="true"
      :color="color"
      :height="topHeight"
    ></LCARSElement>
    <slot name="top"></slot>
    <LCARSElement
      v-if="fillTopRight || fillWidth"
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
        v-if="fillLeftTop || fillHeight"
        :fill="true"
        :color="leftColor ?? color"
        :width="leftWidth"
      ></LCARSElement>
      <LCARSCol
        v-if="$slots.left"
        :margin-top="(leftGap || gap || 0) / 10"
        :margin-bottom="(leftGap || gap || 0) / 10"
        :stretch="leftStretch || fillLeftTop || fillHeight"
        :gap="leftGap ?? gap"
      >
        <slot name="left"></slot>
      </LCARSCol>
      <LCARSElement
        v-if="fillLeftBottom || fillHeight"
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
        v-if="fillRightTop || fillHeight"
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
        v-if="fillRightBottom || fillHeight"
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
      :color="color"
      :width="leftWidth + radXInnerBottomLeft"
      :height="bottomHeight + radYInnerBottomLeft"
      :rad-x-bottom-left="radXBottomLeft"
      :rad-y-bottom-left="radYBottomLeft"
      :rad-x-inner-bottom-left="radXInnerBottomLeft"
      :rad-y-inner-bottom-left="radYInnerBottomLeft"
      :backgroundScale="backgroundScale"
    ></LCARSElement>
    <LCARSElement
      v-if="fillBottomLeft || fillWidth"
      :fill="true"
      :color="color"
      :height="bottomHeight"
    ></LCARSElement>
    <slot name="bottom"></slot>
    <LCARSElement
      v-if="fillBottomRight || fillWidth"
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
