<script setup lang="ts">
import type { MarginProps } from '@/props/MarginProps'
import LCARSCol from './LCARSCol.vue'
import LCARSElement from './LCARSElement.vue'
import LCARSRow from './LCARSRow.vue'
import type { AnimationConfig, Animations } from '@/AnimationConfig'
import TextComponent from './TextComponent.vue'

interface PanelTLProps extends MarginProps {
  title?: string
  color?: string | number
  fillWidth?: boolean
  fillHeight?: boolean
  fillRightTop?: boolean
  fillRightBottom?: boolean
  fillTopLeft?: boolean
  fillTopRight?: boolean
  gap?: number
  rightWidth?: number
  rightPad?: number
  rightColor?: string | number
  rightGap?: number
  rightStretch?: boolean
  topCap?: boolean
  topHeight?: number
  topGap?: number
  topStretch?: boolean
  bottomCap?: boolean
  outerRadX?: number
  outerRadY?: number
  innerRadX?: number
  innerRadY?: number
  titleAnimation?: AnimationConfig
  topCapAnimations?: Animations
  bottomCapAnimations?: Animations
  topLeftAnimations?: Animations
  topRightAnimations?: Animations
  rightTopAnimations?: Animations
  rightBottomAnimations?: Animations
  backgroundScale?: number
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
  titleAnimation,
  topCapAnimations,
  bottomCapAnimations,
  topLeftAnimations,
  topRightAnimations,
  rightTopAnimations,
  rightBottomAnimations,
  backgroundScale = 100,
} = defineProps<PanelTLProps>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <LCARSRow :margin-top="marginTop" :margin-left="marginLeft" :margin-right="marginRight">
    <LCARSRow
      :height="topHeight"
      :fill="fillWidth"
      :stretch="topStretch || fillTopLeft || fillTopRight || fillWidth"
    >
      <LCARSElement
        v-if="topCap"
        :height="topHeight"
        :width="topHeight / 2"
        :color="color"
        :cap-left="true"
        :animations="topCapAnimations"
      ></LCARSElement>
      <LCARSElement v-if="title" :textColor="color" :fontSize="topHeight" :lineHeight="topHeight">
        <TextComponent :text="title" :textAnimation="titleAnimation" />
      </LCARSElement>
      <LCARSElement
        v-if="fillTopLeft"
        :fill="true"
        :color="color"
        :height="topHeight"
        :animations="topLeftAnimations"
      ></LCARSElement>
      <slot name="top"></slot>
      <LCARSElement
        v-if="fillTopRight"
        :fill="true"
        :color="color"
        :height="topHeight"
        :animations="topRightAnimations"
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
      :backgroundScale="backgroundScale"
    ></LCARSElement>
  </LCARSRow>
  <LCARSRow
    :stretch="fillRightTop || fillRightBottom || fillHeight"
    :fill="fillWidth || fillTopLeft || fillTopRight"
    :margin-left="marginLeft"
    :margin-right="marginRight"
    :margin-bottom="marginBottom"
  >
    <LCARSCol :fill="fillWidth" :margin-right="rightPad">
      <slot></slot>
    </LCARSCol>
    <LCARSCol :stretch="fillRightTop || fillRightBottom">
      <LCARSElement
        v-if="fillRightTop"
        :fill="true"
        :color="rightColor ?? color"
        :width="rightWidth"
        :animations="rightTopAnimations"
      ></LCARSElement>
      <LCARSCol
        v-if="$slots.right"
        :margin-top="(rightGap || gap || 0) / 10"
        :margin-bottom="(rightGap || gap || 0) / 10"
        :stretch="rightStretch || fillRightTop || fillRightBottom || fillHeight"
        :gap="rightGap ?? gap"
      >
        <slot name="right"></slot>
      </LCARSCol>
      <LCARSElement
        v-if="fillRightBottom"
        :fill="true"
        :color="rightColor ?? color"
        :width="rightWidth"
        :animations="rightBottomAnimations"
      ></LCARSElement>
      <LCARSElement
        v-if="bottomCap"
        :width="rightWidth"
        :height="rightWidth / 2"
        :cap-bottom="true"
        :color="rightColor ?? color"
        :animations="bottomCapAnimations"
      ></LCARSElement>
    </LCARSCol>
  </LCARSRow>
</template>

<style lang="sass">
@use '@/styles/main'
</style>
