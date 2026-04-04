<script setup lang="ts">
import type { MarginProps } from '@/props/MarginProps'
import LCARSCol from './LCARSCol.vue'
import LCARSElement from './LCARSElement.vue'
import LCARSRow from './LCARSRow.vue'

interface PanelBLProps extends MarginProps {
  title?: string
  color?: string | number
  fillWidth?: boolean
  fillHeight?: boolean
  fillLeftTop?: boolean
  fillLeftBottom?: boolean
  fillBottomLeft?: boolean
  fillBottomRight?: boolean
  gap?: number
  leftWidth?: number
  leftPad?: number
  leftColor?: string | number
  leftGap?: number
  topCap?: boolean
  leftStretch?: boolean
  bottomCap?: boolean
  bottomHeight?: number
  bottomGap?: number
  bottomStretch?: boolean
  outerRadX?: number
  outerRadY?: number
  innerRadX?: number
  innerRadY?: number
  backgroundScale?: number
}

const {
  title,
  color = 'default',
  fillWidth = true,
  fillHeight = true,
  fillLeftTop,
  fillLeftBottom = true,
  fillBottomLeft = true,
  fillBottomRight,
  gap = 1,
  leftGap,
  leftWidth = 3,
  leftPad = 1,
  leftColor,
  leftStretch = true,
  bottomHeight = 1,
  bottomGap,
  bottomStretch = true,
  outerRadX = 2,
  outerRadY = 2,
  innerRadX = 1,
  innerRadY = 1,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  backgroundScale = 100,
} = defineProps<PanelBLProps>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <LCARSRow
    :stretch="leftStretch || fillLeftTop || fillLeftBottom || fillHeight"
    :margin-top="marginTop"
    :margin-left="marginLeft"
    :margin-right="marginRight"
  >
    <LCARSCol
      :stretch="leftStretch || fillLeftTop || fillLeftBottom || fillHeight"
      :width="leftWidth"
    >
      <LCARSElement
        v-if="topCap"
        :cap-top="true"
        :width="leftWidth"
        :height="leftWidth / 2"
        :color="leftColor ?? color"
      ></LCARSElement>
      <LCARSElement
        v-if="fillLeftTop"
        :fill="fillLeftTop"
        :color="leftColor ?? color"
        :width="leftWidth"
      ></LCARSElement>
      <LCARSCol
        v-if="$slots.left"
        :stretch="leftStretch"
        :gap="leftGap ?? gap"
        :margin-top="(leftGap || gap || 0) / 10"
        :margin-bottom="(leftGap || gap || 0) / 10"
      >
        <slot name="left"></slot>
      </LCARSCol>
      <LCARSElement
        v-if="fillLeftBottom"
        :fill="fillLeftBottom"
        :color="leftColor ?? color"
        :width="leftWidth"
      ></LCARSElement>
    </LCARSCol>
    <LCARSCol :fill="fillWidth" :margin-left="leftPad">
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
      :backgroundScale="backgroundScale"
    ></LCARSElement>
    <LCARSRow
      :height="bottomHeight"
      :fill="fillBottomLeft || fillBottomRight"
      :stretch="fillBottomLeft || fillBottomRight || fillWidth"
    >
      <LCARSElement
        v-if="fillBottomLeft"
        :fill="fillBottomLeft"
        :color="color"
        :height="bottomHeight"
      ></LCARSElement>
      <slot name="bottom"></slot>
      <LCARSElement
        v-if="fillBottomRight"
        :fill="fillBottomRight"
        :color="color"
        :height="bottomHeight"
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
