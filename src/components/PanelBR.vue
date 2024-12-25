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
  fillRightTop?: boolean
  fillRightBottom?: boolean
  fillBottomLeft?: boolean
  fillBottomRight?: boolean
  gap?: number
  rightWidth?: number
  rightPad?: number
  rightColor?: string
  rightGap?: number
  rightStretch?: boolean
  bottomCap?: boolean
  bottomHeight?: number
  bottomGap?: number
  bottomStretch?: boolean
  topCap?: boolean
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
  fillBottomLeft,
  fillBottomRight = true,
  gap = 1,
  rightWidth = 3,
  rightPad = 1,
  rightColor,
  rightGap,
  rightStretch,
  bottomHeight = 1,
  bottomGap,
  bottomCap,
  bottomStretch,
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
    <LCARSCol>
      <LCARSElement
        v-if="topCap"
        :cap-top="true"
        :width="rightWidth"
        :height="rightWidth / 2"
        :color="rightColor ?? color"
      ></LCARSElement>
      <LCARSElement
        v-if="fillRightTop"
        :fill="fillRightTop"
        :color="rightColor ?? color"
        :width="rightWidth"
      ></LCARSElement>
      <LCARSCol
        v-if="$slots.right"
        :stretch="rightStretch"
        :margin-top="(rightGap || gap || 0) / 10"
        :margin-bottom="(rightGap || gap || 0) / 10"
      >
        <slot name="right"></slot>
      </LCARSCol>
      <LCARSElement
        v-if="fillRightBottom"
        :fill="fillRightBottom"
        :color="rightColor ?? color"
        :width="rightWidth"
      ></LCARSElement>
    </LCARSCol>
  </LCARSRow>
  <LCARSRow
    bottom
    :margin-left="marginLeft"
    :margin-right="marginRight"
    :margin-bottom="marginBottom"
  >
    <LCARSRow :height="bottomHeight" :fill="fillWidth">
      <LCARSElement
        v-if="bottomCap"
        :height="bottomHeight"
        :width="bottomHeight / 2"
        :color="color"
        :cap-left="true"
      ></LCARSElement>
      <LCARSElement
        v-if="title"
        :textColor="color"
        :fontSize="bottomHeight"
        :lineHeight="bottomHeight * 0.8"
      >
        {{ title }}
      </LCARSElement>
      <LCARSElement
        v-if="fillBottomLeft"
        :fill="fillBottomLeft"
        :color="color"
        :height="bottomHeight"
      ></LCARSElement>
      <LCARSRow
        v-if="$slots.bottom"
        :margin-left="(rightGap || gap || 0) / 10"
        :margin-right="(rightGap || gap || 0) / 10"
        :gap="bottomGap ?? gap"
        :height="bottomHeight"
        :stretch="bottomStretch"
      >
        <slot name="bottom"></slot>
      </LCARSRow>
      <LCARSElement
        v-if="fillBottomRight"
        :fill="fillBottomRight"
        :color="color"
        :height="bottomHeight"
      ></LCARSElement>
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
