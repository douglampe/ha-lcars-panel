<script setup lang="ts">
import type { MarginProps } from '@/props/MarginProps'
import LCARSCol from './LCARSCol.vue'
import LCARSElement from './LCARSElement.vue'
import LCARSRow from './LCARSRow.vue'

interface PanelTLProps extends MarginProps {
  title?: string
  color: string
  fillWidth?: boolean
  fillHeight?: boolean
  gap?: number
  rightWidth?: number
  rightPad?: number
  rightColor?: string
  topCap?: boolean
  bottomCap?: boolean
  topHeight?: number
  outerRadX?: number
  outerRadY?: number
  innerRadX?: number
  innerRadY?: number
}

const {
  title,
  color,
  fillWidth = true,
  fillHeight = true,
  gap = 1,
  topCap,
  bottomCap,
  rightWidth = 3,
  rightPad = 1,
  topHeight = 1,
  outerRadX = 2,
  outerRadY = 2,
  innerRadX = 1,
  innerRadY = 1,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
} = defineProps<PanelTLProps>()
</script>

<template>
  <LCARSRow
    :fill="fillHeight"
    :margin-top="marginTop"
    :margin-left="marginLeft"
    :margin-right="marginRight"
  >
    <LCARSElement
      v-if="topCap"
      :height="topHeight"
      :width="topHeight / 2"
      :color="color"
      :cap-right="true"
    ></LCARSElement>
    <LCARSElement
      v-if="title"
      :textColor="color"
      :fontSize="topHeight"
      :lineHeight="topHeight * 0.8"
    >
      {{ title }}
    </LCARSElement>
    <LCARSRow :fill="true" :gap="gap">
      <slot name="top"></slot>
      <LCARSElement :fill="fillWidth" :color="color" :height="topHeight"></LCARSElement>
    </LCARSRow>
    <LCARSElement
      :rad-x-top-right="outerRadX"
      :rad-y-top-right="outerRadY"
      :rad-x-inner-top-right="innerRadX"
      :rad-y-inner-top-right="innerRadY"
      :color="color"
      :width="rightWidth + innerRadX"
      :height="topHeight + innerRadY"
    ></LCARSElement>
  </LCARSRow>
  <LCARSRow
    :fill="fillHeight"
    :margin-left="marginLeft"
    :margin-right="marginRight"
    :margin-bottom="marginBottom"
  >
    <LCARSCol :fill="fillWidth" :margin-right="rightPad">
      <slot></slot>
    </LCARSCol>
    <LCARSCol stretch :gap="gap">
      <slot name="right"></slot>
      <LCARSElement
        :fill="fillHeight"
        :color="rightColor ?? color"
        :width="rightWidth"
      ></LCARSElement>
      <LCARSElement
        v-if="bottomCap"
        :width="rightWidth"
        :height="rightWidth / 2"
        :cap-bottom="true"
        :color="color"
      ></LCARSElement>
    </LCARSCol>
  </LCARSRow>
</template>

<style lang="sass">
@use '@/styles/main'
</style>
