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
  rightGap?: number
  topCap?: boolean
  bottomCap?: boolean
  bottomHeight?: number
  bottomGap?: number
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
  rightWidth = 3,
  rightPad = 1,
  rightColor,
  rightGap,
  bottomHeight = 1,
  bottomGap,
  bottomCap,
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
        :color="color"
      ></LCARSElement>
      <LCARSCol
        v-if="$slots.right"
        stretch
        :margin-top="(rightGap || gap || 0) / 10"
        :margin-bottom="(rightGap || gap || 0) / 10"
      >
        <slot name="right"></slot>
      </LCARSCol>
      <LCARSElement
        :fill="fillHeight"
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
      <LCARSRow
        v-if="$slots.bottom"
        :margin-left="(rightGap || gap || 0) / 10"
        :margin-right="(rightGap || gap || 0) / 10"
        :gap="bottomGap ?? gap"
        :height="bottomHeight"
      >
        <slot name="bottom"></slot>
      </LCARSRow>
      <LCARSElement :fill="fillWidth" :color="color" :height="bottomHeight"></LCARSElement>
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
