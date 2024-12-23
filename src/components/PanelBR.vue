<script setup lang="ts">
import type { MarginProps } from '@/props/MarginProps'
import LCARSCol from './LCARSCol.vue'
import LCARSElement from './LCARSElement.vue'
import LCARSRow from './LCARSRow.vue'

interface PanelBRProps extends MarginProps {
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
  bottomHeight?: number
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
  rightWidth = 3,
  rightPad = 1,
  rightColor,
  bottomHeight = 1,
  outerRadX = 2,
  outerRadY = 2,
  innerRadX = 1,
  innerRadY = 1,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
} = defineProps<PanelBRProps>()
</script>

<template>
  <LCARSRow
    :fill="fillHeight"
    :margin-top="marginTop"
    :margin-left="marginLeft"
    :margin-right="marginRight"
  >
    <LCARSCol :fill="fillWidth" :margin-right="rightPad">
      <slot></slot>
    </LCARSCol>
    <LCARSCol stretch :gap="gap">
      <LCARSElement
        :fill="fillHeight"
        :color="rightColor ?? color"
        :width="rightWidth"
      ></LCARSElement>
      <slot name="right"></slot>
      <LCARSElement
        v-if="topCap"
        :cap-top="true"
        :width="rightWidth"
        :height="rightWidth / 2"
        :color="color"
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
      v-if="bottomCap"
      :height="bottomHeight"
      :width="bottomHeight / 2"
      :color="color"
      :cap-right="true"
    ></LCARSElement>
    <LCARSElement
      v-if="title"
      :color="color"
      :fontSize="bottomHeight"
      :lineHeight="bottomHeight * 0.8"
    >
      {{ title }}
    </LCARSElement>
    <LCARSRow :fill="fillWidth" :gap="gap">
      <LCARSElement :fill="fillWidth" :color="color" :height="bottomHeight"></LCARSElement>
      <slot name="bottom"></slot>
    </LCARSRow>
    <LCARSElement
      :rad-x-bottom-right="outerRadX"
      :rad-y-bottom-right="outerRadY"
      :rad-x-inner-bottom-right="innerRadX"
      :rad-y-inner-bottom-right="innerRadY"
      :color="color"
      :width="rightWidth + innerRadX"
      :height="bottomHeight + innerRadY"
    ></LCARSElement>
  </LCARSRow>
</template>

<style lang="sass">
@use '@/styles/main'
</style>
