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
  gap?: number
  topHeight?: number
  leftWidth?: number
  leftPad?: number
  leftColor?: string
  rightWidth?: number
  rightPad?: number
  rightColor?: string
  topCap?: boolean
  bottomCap?: boolean
  bottomHeight?: number
  outerRadX?: number
  outerRadY?: number
  innerRadX?: number
  innerRadY?: number
}

const {
  title,
  color,
  fillWidth,
  fillHeight,
  gap = 1,
  topHeight = 1,
  leftWidth = 3,
  leftPad,
  leftColor,
  rightWidth = 3,
  rightPad,
  rightColor,
  bottomHeight = 1,
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
  <LCARSCol
    :fill="fillWidth"
    :margin-top="marginTop"
    :margin-bottom="marginBottom"
    :margin-left="marginLeft"
    :margin-right="marginRight"
  >
    <LCARSRow :gap="gap">
      <LCARSElement
        :color="color"
        :width="leftWidth + radXInnerTopLeft"
        :height="topHeight + radYInnerTopLeft"
        :rad-x-top-left="radXTopLeft"
        :rad-y-top-left="radYTopLeft"
        :rad-x-inner-top-left="radXInnerTopLeft"
        :rad-y-inner-top-left="radYInnerTopLeft"
      ></LCARSElement>
      <slot name="top"></slot>
      <LCARSElement :fill="fillWidth" :color="color" :height="topHeight"></LCARSElement>
      <LCARSElement v-if="title" :font-size="topHeight" :text-color="color">
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
    <LCARSRow :fill="fillHeight">
      <LCARSCol>
        <slot name="left"></slot>
        <LCARSElement :fill="true" :color="leftColor" :width="leftWidth"></LCARSElement>
      </LCARSCol>
      <LCARSCol :fill="fillWidth">
        <slot></slot>
      </LCARSCol>
      <LCARSCol :right="true">
        <slot name="right"></slot>
        <LCARSElement :fill="true" :color="rightColor" :width="rightWidth"></LCARSElement>
      </LCARSCol>
    </LCARSRow>
    <LCARSRow bottom>
      <LCARSElement
        :color="color"
        :width="leftWidth + radXInnerBottomLeft"
        :height="bottomHeight + radYInnerBottomLeft"
        :rad-x-bottom-left="radXBottomLeft"
        :rad-y-bottom-left="radYBottomLeft"
        :rad-x-inner-bottom-left="radXInnerBottomLeft"
        :rad-y-inner-bottom-left="radYInnerBottomLeft"
      ></LCARSElement>
      <slot name="bottom"></slot>
      <LCARSElement
        :fill="fillWidth"
        :color="color"
        :height="bottomHeight"
        :style="{ backgroundColor: color }"
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
  </LCARSCol>
</template>
