<script setup lang="ts">
import type { ElementProps } from '../props/ElementProps'
import LCARSCol from './LCARSCol.vue'
import LCARSElement from './LCARSElement.vue'
import LCARSRow from './LCARSRow.vue'

interface PanelBLProps extends ElementProps {
  title?: string
  fillWidth?: boolean
  fillHeight?: boolean
  leftWidth?: number
  leftColor?: string
  topCap?: boolean
  bottomCap?: boolean
  bottomHeight?: number
  outerRadX?: number
  outerRadY?: number
  innerRadX?: number
  innerRadY?: number
}

const {
  title,
  fillWidth,
  fillHeight,
  color,
  leftWidth = 3,
  bottomHeight = 1,
  outerRadX = 2,
  outerRadY = 2,
  innerRadX = 1,
  innerRadY = 1,
} = defineProps<PanelBLProps>()
</script>

<template>
  <LCARSCol :fill="fillWidth">
    <LCARSRow :fill="fillHeight">
      <LCARSCol>
        <LCARSElement v-if="topCap" :cap-top="true" :color="color"></LCARSElement>
        <slot name="left"></slot>
        <LCARSElement :fill="fillHeight" :color="leftColor" :width="leftWidth"></LCARSElement>
      </LCARSCol>
      <LCARSCol :fill="fillWidth">
        <slot></slot>
      </LCARSCol>
    </LCARSRow>
    <LCARSRow>
      <LCARSElement
        :rad-x-bottom-left="outerRadX"
        :rad-y-bottom-left="outerRadY"
        :color="color"
        :width="leftWidth + innerRadX"
        :height="bottomHeight + innerRadY"
      ></LCARSElement>
      <LCARSElement
        :fill="fillWidth"
        class="lcars-el bottom"
        :color="color"
        :height="bottomHeight"
      ></LCARSElement>
      <slot name="bottom"></slot>
      <LCARSElement
        v-if="title"
        class="lcars-el lcars-bar-text bottom"
        :color="color"
        :fontSize="bottomHeight"
        :lineHeight="bottomHeight * 0.8"
      >
        {{ title }}
      </LCARSElement>
      <LCARSElement
        v-if="bottomCap"
        :height="bottomHeight"
        :color="color"
        :cap-right="true"
        class="lcars-el bottom"
      ></LCARSElement>
    </LCARSRow>
  </LCARSCol>
</template>

<style lang="sass">
@use '@/styles/main'
</style>
