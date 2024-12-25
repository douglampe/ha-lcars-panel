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
  fillRightTop?: boolean
  fillRightBottom?: boolean
  fillTopLeft?: boolean
  fillTopRight?: boolean
  gap?: number
  rightWidth?: number
  rightPad?: number
  rightColor?: string
  rightGap?: number
  rightStretch?: boolean
  topCap?: boolean
  topHeight?: number
  topGap: number
  topStretch?: boolean
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
  fillRightTop,
  fillRightBottom = true,
  fillTopLeft,
  fillTopRight = true,
  gap = 1,
  topCap,
  topGap,
  topHeight = 1,
  topStretch,
  bottomCap,
  rightColor,
  rightWidth = 3,
  rightPad = 1,
  rightGap,
  rightStretch,
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
      <LCARSElement
        v-if="fillTopLeft"
        :fill="fillTopLeft"
        :color="color"
        :height="topHeight"
      ></LCARSElement>
      <LCARSRow
        v-if="$slots.top"
        :margin-left="(rightGap || gap || 0) / 10"
        :margin-right="(rightGap || gap || 0) / 10"
        :gap="topGap ?? gap"
        :height="topHeight"
        :stretch="topStretch"
      >
        <slot name="top"></slot>
      </LCARSRow>
      <LCARSElement
        v-if="fillTopRight"
        :fill="fillTopRight"
        :color="color"
        :height="topHeight"
      ></LCARSElement>
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
      <LCARSElement
        v-if="fillRightTop"
        :fill="fillRightTop"
        :color="rightColor ?? color"
        :width="rightWidth"
      ></LCARSElement>
      <LCARSCol
        v-if="$slots.right"
        :margin-top="(rightGap || gap || 0) / 10"
        :margin-bottom="(rightGap || gap || 0) / 10"
        :stretch="rightStretch"
        :gap="rightGap ?? gap"
      >
        <slot name="right"></slot>
      </LCARSCol>
      <LCARSElement
        v-if="fillRightBottom"
        :fill="fillRightBottom"
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
