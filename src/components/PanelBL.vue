<script setup lang="ts">
import type { MarginProps } from '@/props/MarginProps'
import type { ElementProps } from '../props/ElementProps'
import LCARSCol from './LCARSCol.vue'
import LCARSElement from './LCARSElement.vue'
import LCARSRow from './LCARSRow.vue'

interface PanelBLProps extends MarginProps {
  title?: string
  color: string
  fillWidth?: boolean
  fillHeight?: boolean
  gap?: number
  leftWidth?: number
  leftPad?: number
  leftColor?: string
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
  leftWidth = 3,
  leftPad,
  leftColor,
  bottomHeight = 1,
  outerRadX = 2,
  outerRadY = 2,
  innerRadX = 1,
  innerRadY = 1,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
} = defineProps<PanelBLProps>()
</script>

<template>
  <LCARSRow
    :fill="fillHeight"
    :margin-top="marginTop"
    :margin-left="marginLeft"
    :margin-right="marginRight"
  >
    <LCARSCol stretch :gap="gap">
      <LCARSElement
        v-if="topCap"
        :cap-top="true"
        :width="leftWidth"
        :height="leftWidth / 2"
        :color="color"
      ></LCARSElement>
      <slot name="left"></slot>
      <LCARSElement :fill="fillHeight" :color="leftColor" :width="leftWidth"></LCARSElement>
    </LCARSCol>
    <LCARSCol :fill="fillWidth" :margin-left="leftPad">
      <slot></slot>
    </LCARSCol>
  </LCARSRow>
  <LCARSRow
    bottom
    :margin-left="marginLeft"
    :margin-right="marginRight"
    :margin-bottom="marginBottom"
  >
    <LCARSElement
      :rad-x-bottom-left="outerRadX"
      :rad-y-bottom-left="outerRadY"
      :rad-x-inner-bottom-left="innerRadX"
      :rad-y-inner-bottom-left="innerRadY"
      :color="color"
      :width="leftWidth + innerRadX"
      :height="bottomHeight + innerRadY"
    ></LCARSElement>
    <LCARSRow :fill="fillWidth" :gap="gap">
      <LCARSElement :fill="fillWidth" :color="color" :height="bottomHeight"></LCARSElement>
      <slot name="bottom"></slot>
    </LCARSRow>
    <LCARSElement
      v-if="title"
      :color="color"
      :fontSize="bottomHeight"
      :lineHeight="bottomHeight * 0.8"
    >
      {{ title }}
    </LCARSElement>
    <LCARSElement
      v-if="bottomCap"
      :height="bottomHeight"
      :width="bottomHeight / 2"
      :color="color"
      :cap-right="true"
    ></LCARSElement>
  </LCARSRow>
</template>

<style lang="sass">
@use '@/styles/main'
</style>
