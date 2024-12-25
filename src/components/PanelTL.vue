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
  fillLeftTop?: boolean
  fillLeftBottom?: boolean
  fillTopLeft?: boolean
  fillTopRight?: boolean
  gap?: number
  leftWidth?: number
  leftPad?: number
  leftColor?: string
  leftGap?: number
  leftStretch?: boolean
  topCap?: boolean
  topGap?: number
  topStretch?: boolean
  topHeight?: number
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
  fillLeftTop,
  fillLeftBottom = true,
  fillTopLeft = true,
  fillTopRight,
  gap = 1,
  topHeight = 1,
  topCap,
  topGap = 1,
  topStretch = true,
  bottomCap,
  leftWidth = 3,
  leftColor,
  leftPad = 1,
  leftGap = 1,
  leftStretch = true,
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
    :fill="fillHeight || fillLeftTop || fillLeftBottom"
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
    <LCARSRow :height="topHeight" :fill="fillTopLeft || fillTopRight">
      <LCARSElement
        v-if="fillTopLeft"
        :fill="fillTopLeft"
        :height="topHeight"
        :color="color"
      ></LCARSElement>
      <LCARSRow
        v-if="$slots.top"
        :margin-left="(gap || topGap || 0) / 10"
        :margin-right="(gap || topGap || 0) / 10"
        :gap="topGap ?? gap"
        :height="topHeight"
        :stretch="topStretch"
      >
        <slot name="top"></slot>
      </LCARSRow>
      <LCARSElement
        v-if="fillTopRight"
        :fill="fillTopRight"
        :height="topHeight"
        :color="color"
      ></LCARSElement>
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
    :fill="fillHeight || fillTopLeft || fillTopRight"
    :margin-left="marginLeft"
    :margin-right="marginRight"
    :margin-bottom="marginBottom"
  >
    <LCARSCol>
      <LCARSElement
        v-if="fillLeftTop"
        :fill="fillLeftTop"
        :height="topHeight"
        :color="color"
      ></LCARSElement>
      <LCARSCol
        v-if="$slots.left"
        :margin-top="(leftGap || gap || 0) / 10"
        :margin-bottom="(leftGap || gap || 0) / 10"
        :stretch="leftStretch"
        :gap="leftGap ?? gap"
      >
        <slot name="left"></slot>
      </LCARSCol>
      <LCARSElement
        v-if="fillLeftBottom"
        :fill="fillLeftBottom"
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
