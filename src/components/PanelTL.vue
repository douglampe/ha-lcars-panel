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
  leftWidth?: number
  leftPad?: number
  leftColor?: string
  leftGap?: number
  topCap?: boolean
  topGap?: number
  bottomCap?: boolean
  topHeight?: number
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
  topHeight = 1,
  topCap,
  topGap = 1,
  bottomCap,
  leftWidth = 3,
  leftPad = 1,
  leftGap = 1,
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
      :rad-x-top-left="outerRadX"
      :rad-y-top-left="outerRadY"
      :rad-x-inner-top-left="innerRadX"
      :rad-y-inner-top-left="innerRadY"
      :color="color"
      :width="leftWidth + innerRadX"
      :height="topHeight + innerRadY"
    ></LCARSElement>
    <LCARSRow :height="topHeight" :fill="fillWidth">
      <LCARSElement :fill="fillWidth" :height="topHeight" :color="color"></LCARSElement>
      <LCARSRow
        v-if="$slots.top"
        :margin-left="(gap || topGap || 0) / 10"
        :margin-right="(gap || topGap || 0) / 10"
        :gap="topGap ?? gap"
        :height="topHeight"
      >
        <slot name="top"></slot>
      </LCARSRow>
      <LCARSElement v-if="title" :textColor="color" :fontSize="topHeight" :lineHeight="topHeight">
        {{ title }}
      </LCARSElement>
      <LCARSElement
        v-if="topCap"
        :height="topHeight"
        :width="topHeight / 2"
        :color="color"
        :cap-right="true"
      ></LCARSElement
    ></LCARSRow>
  </LCARSRow>
  <LCARSRow
    :fill="fillHeight"
    :margin-left="marginLeft"
    :margin-right="marginRight"
    :margin-bottom="marginBottom"
  >
    <LCARSCol>
      <LCARSCol
        v-if="$slots.left"
        :margin-top="(leftGap || gap || 0) / 10"
        :margin-bottom="(leftGap || gap || 0) / 10"
        stretch
        :gap="leftGap ?? gap"
      >
        <slot name="left"></slot>
      </LCARSCol>
      <LCARSElement
        :fill="fillHeight"
        :color="leftColor ?? color"
        :width="leftWidth"
      ></LCARSElement>
      <LCARSElement
        v-if="bottomCap"
        :width="leftWidth"
        :height="leftWidth / 2"
        :cap-bottom="true"
        :color="leftColor ?? color"
      ></LCARSElement>
    </LCARSCol>
    <LCARSCol :fill="fillWidth" :margin-left="leftPad">
      <slot></slot>
    </LCARSCol>
  </LCARSRow>
</template>

<style lang="sass">
@use '@/styles/main'
</style>
