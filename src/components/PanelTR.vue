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
  rightGap?: number
  topCap?: boolean
  topHeight?: number
  topGap: number
  bottomCap?: boolean
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
  gap = 1,
  topCap,
  topGap,
  bottomCap,
  rightWidth = 3,
  rightPad = 1,
  rightGap,
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
    <LCARSRow :height="topHeight" :fill="fillWidth">
      <LCARSElement
        v-if="topCap"
        :height="topHeight"
        :width="topHeight / 2"
        :color="color"
        :cap-left="true"
      ></LCARSElement>
      <LCARSElement
        v-if="title"
        :textColor="color"
        :fontSize="topHeight"
        :lineHeight="topHeight * 0.8"
      >
        {{ title }}
      </LCARSElement>
      <LCARSRow
        v-if="$slots.top"
        :margin-left="(rightGap || gap || 0) / 10"
        :margin-right="(rightGap || gap || 0) / 10"
        :gap="topGap ?? gap"
        :height="topHeight"
      >
        <slot name="top"></slot>
      </LCARSRow>
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
    <LCARSCol>
      <LCARSCol
        v-if="$slots.right"
        :margin-top="(rightGap || gap || 0) / 10"
        :margin-bottom="(rightGap || gap || 0) / 10"
        stretch
        :gap="rightGap ?? gap"
      >
        <slot name="right"></slot>
      </LCARSCol>
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
        :color="rightColor ?? color"
      ></LCARSElement>
    </LCARSCol>
  </LCARSRow>
</template>

<style lang="sass">
@use '@/styles/main'
</style>
