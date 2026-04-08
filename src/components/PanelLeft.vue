<script setup lang="ts">
import type { MarginProps } from '@/props/MarginProps'
import type { RadiusProps } from '@/props/RadiusProps'
import LCARSCol from './LCARSCol.vue'
import LCARSRow from './LCARSRow.vue'
import LCARSElement from './LCARSElement.vue'

interface PanelLeftProps extends MarginProps, RadiusProps {
  title?: string
  color?: string | number
  fillWidth?: boolean
  fillHeight?: boolean
  fillTopLeft?: boolean
  fillTopRight?: boolean
  fillLeftTop?: boolean
  fillLeftBottom?: boolean
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
  rightPad?: number
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
  fillLeftTop = true,
  fillLeftBottom = true,
  fillBottomLeft = true,
  fillBottomRight = true,
  gap = 1,
  topHeight = 1,
  topStretch,
  leftWidth = 3,
  leftPad,
  leftColor,
  leftGap,
  leftStretch,
  rightPad,
  bottomHeight = 1,
  bottomStretch,
  radXTopLeft = 2,
  radYTopLeft = 2,
  radXBottomLeft = 2,
  radYBottomLeft = 2,
  radXInnerTopLeft = 1,
  radYInnerTopLeft = 1,
  radXInnerBottomLeft = 1,
  radYInnerBottomLeft = 1,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  backgroundScale = 100,
} = defineProps<PanelLeftProps>()

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
  </LCARSRow>
  <LCARSRow
    :fill="fillHeight"
    :stretch="leftStretch || fillLeftTop || fillLeftBottom || fillHeight"
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
        :stretch="leftStretch || fillLeftTop || fillHeight"
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
  </LCARSRow>
</template>
