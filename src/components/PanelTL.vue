<script setup lang="ts">
import type { MarginProps } from '@/props/MarginProps'
import LCARSCol from './LCARSCol.vue'
import LCARSElement from './LCARSElement.vue'
import LCARSRow from './LCARSRow.vue'
import type { ConfigItem } from '@/ConfigItem'
import type { AnimationConfig, Animations } from '@/AnimationConfig'
import TextComponent from './TextComponent.vue'

interface PanelTLProps extends ConfigItem, MarginProps {
  title?: string
  color?: string | number
  fillWidth?: boolean
  fillHeight?: boolean
  fillLeftTop?: boolean
  fillLeftBottom?: boolean
  fillTopLeft?: boolean
  fillTopRight?: boolean
  gap?: number
  leftWidth?: number
  leftPad?: number
  leftColor?: string | number
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
  titleAnimation?: AnimationConfig
  topLeftAnimations?: Animations
  topRightAnimations?: Animations
  topCapAnimations?: Animations
  bottomCapAnimations?: Animations
  leftTopAnimations?: Animations
  leftBottomAnimations?: Animations
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
  topLeftAnimations,
  topRightAnimations,
  leftTopAnimations,
  leftBottomAnimations,
  bottomCapAnimations,
  titleAnimation,
} = defineProps<PanelTLProps>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <LCARSRow :margin-top="marginTop" :margin-left="marginLeft" :margin-right="marginRight">
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
        :animations="topLeftAnimations"
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
        :animations="topRightAnimations"
      ></LCARSElement>
      <LCARSElement v-if="title" :textColor="color" :fontSize="topHeight" :lineHeight="topHeight">
        <TextComponent :text="title" :textAnimation="titleAnimation" />
      </LCARSElement>
      <LCARSElement
        v-if="topCap"
        :height="topHeight"
        :width="topHeight / 2"
        :color="color"
        :cap-right="true"
        :animations="topCapAnimations"
      ></LCARSElement>
    </LCARSRow>
  </LCARSRow>
  <LCARSRow
    :fill="fillWidth || fillTopLeft || fillTopRight"
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
        :animations="leftTopAnimations"
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
        :fill="fillLeftBottom"
        :color="leftColor ?? color"
        :width="leftWidth"
        :animations="leftBottomAnimations"
      ></LCARSElement>
      <LCARSElement
        v-if="bottomCap"
        :width="leftWidth"
        :height="leftWidth / 2"
        :cap-bottom="true"
        :color="leftColor ?? color"
        :animations="bottomCapAnimations"
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
