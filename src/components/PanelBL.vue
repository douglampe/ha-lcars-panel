<script setup lang="ts">
import type { MarginProps } from '@/props/MarginProps'
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
  leftGap?: number
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
  leftGap,
  leftWidth = 3,
  leftPad = 1,
  leftColor,
  bottomHeight = 1,
  bottomGap,
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
    <LCARSCol>
      <LCARSElement
        v-if="topCap"
        :cap-top="true"
        :width="leftWidth"
        :height="leftWidth / 2"
        :color="leftColor ?? color"
      ></LCARSElement>
      <LCARSElement
        :fill="fillHeight"
        :color="leftColor ?? color"
        :width="leftWidth"
      ></LCARSElement>
      <LCARSCol
        v-if="$slots.left"
        stretch
        :margin-top="(leftGap || gap || 0) / 10"
        :margin-bottom="(leftGap || gap || 0) / 10"
      >
        <slot name="left"></slot>
      </LCARSCol>
    </LCARSCol>
    <LCARSCol :fill="fillWidth" :margin-left="leftPad" :gap="leftGap ?? gap">
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
      :color="color"
      :width="leftWidth + innerRadX"
      :height="bottomHeight + innerRadY"
      :rad-x-bottom-left="outerRadX"
      :rad-y-bottom-left="outerRadY"
      :rad-x-inner-bottom-left="innerRadX"
      :rad-y-inner-bottom-left="innerRadY"
    ></LCARSElement>
    <LCARSRow :height="bottomHeight" :fill="fillWidth">
      <LCARSElement :fill="fillWidth" :color="color" :height="bottomHeight"></LCARSElement>
      <LCARSRow
        v-if="$slots.bottom"
        :margin-left="(leftGap || gap || 0) / 10"
        :margin-right="(leftGap || gap || 0) / 10"
        :gap="bottomGap ?? gap"
        :height="bottomHeight"
      >
        <slot name="bottom"></slot>
      </LCARSRow>
      <LCARSElement
        v-if="title"
        :textColor="color"
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
  </LCARSRow>
</template>

<style lang="sass">
@use '@/styles/main'
</style>
