<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { computed } from 'vue'
import { navigate } from '@/LocalNav'
import type { ElementProps } from '../props/ElementProps'
import {
  alignStyle,
  borderStyle,
  colorVar,
  marginStyle,
  padStyle,
  removeUndefined,
  unitSize,
} from '@/Layout'
import { callService } from '@/HAState'

const config = defineProps<ElementProps>()

function onClick() {
  if (config.tapAction) {
    if (config.tapAction.action === 'call-service' && config.tapAction.service) {
      callService(config.tapAction.service, config.tapAction.data)
    }
  } else if (config.nav) {
    navigate(config.nav)
  }
}

const styleObject = computed(() => {
  return removeUndefined({
    ...alignStyle(config.alignContent),
    width: unitSize(config.width),
    height: unitSize(config.height),
    fontSize: unitSize(config.fontSize),
    lineHeight: unitSize(
      config.lineHeight ?? (config.fontSize ? config.fontSize * 1.2 : undefined),
    ),
    backgroundColor: colorVar(config.color),
    fill: config.color ? 'color' : undefined,
    color: colorVar(config.textColor),
    flex: config.fill ? 1 : undefined,
    margin: marginStyle(config),
    padding: padStyle(config),
    borderTopLeftRadius:
      borderStyle(config.radXTopLeft, config.radYTopLeft) ??
      (config.capTop || config.capLeft ? unitSize(config.height ?? 1 / 2) : undefined),
    borderTopRightRadius:
      borderStyle(config.radXTopRight, config.radYTopRight) ??
      (config.capTop || config.capRight ? unitSize(config.height ?? 1 / 2) : undefined),
    borderBottomLeftRadius:
      borderStyle(config.radXBottomLeft, config.radYBottomLeft) ??
      (config.capBottom || config.capLeft ? unitSize(config.height ?? 1 / 2) : undefined),
    borderBottomRightRadius:
      borderStyle(config.radXBottomRight, config.radYBottomRight) ??
      (config.capBottom || config.capRight ? unitSize(config.height ?? 1 / 2) : undefined),
    cursor: config.button || config.nav || config.tapAction ? 'pointer' : undefined,
    position:
      config.radXInnerTopLeft ||
      config.radYInnerTopLeft ||
      config.radXInnerTopRight ||
      config.radYInnerTopRight ||
      config.radXInnerBottomLeft ||
      config.radYInnerBottomLeft ||
      config.radXInnerBottomRight ||
      config.radYInnerBottomRight
        ? 'relative'
        : undefined,
    textTransform: config.textTransform,
  })
})
</script>

<template>
  <div :style="styleObject" v-on="config.nav || config.tapAction ? { click: onClick } : {}">
    <slot></slot>
    <div
      v-if="config.radXInnerTopLeft || config.radYInnerTopLeft"
      style="
        position: absolute;
        background-color: var(--lcars-color-inner-rad-bg);
        bottom: 0;
        right: 0;
      "
      :style="{
        borderTopLeftRadius: borderStyle(config.radXInnerTopLeft, config.radXInnerTopLeft),
        width: unitSize(config.radXInnerTopLeft),
        height: unitSize(config.radYInnerTopLeft),
      }"
    ></div>
    <div
      v-if="config.radXInnerTopRight || config.radYInnerTopRight"
      style="
        position: absolute;
        background-color: var(--lcars-color-inner-rad-bg);
        bottom: 0;
        left: 0;
      "
      :style="{
        borderTopRightRadius: borderStyle(config.radXInnerTopRight, config.radXInnerTopRight),
        width: unitSize(config.radXInnerTopRight),
        height: unitSize(config.radYInnerTopRight),
      }"
    ></div>
    <div
      v-if="config.radXInnerBottomLeft || config.radYInnerBottomLeft"
      style="
        position: absolute;
        background-color: var(--lcars-color-inner-rad-bg);
        top: 0;
        right: 0;
      "
      :style="{
        borderBottomLeftRadius: borderStyle(config.radXInnerBottomLeft, config.radXInnerBottomLeft),
        width: unitSize(config.radXInnerBottomLeft),
        height: unitSize(config.radYInnerBottomLeft),
      }"
    ></div>
    <div
      v-if="config.radXInnerBottomRight || config.radYInnerBottomRight"
      style="position: absolute; background-color: var(--lcars-color-inner-rad-bg); top: 0; left: 0"
      :style="{
        borderBottomRightRadius: borderStyle(
          config.radXInnerBottomRight,
          config.radXInnerBottomRight,
        ),
        width: unitSize(config.radXInnerBottomRight),
        height: unitSize(config.radYInnerBottomRight),
      }"
    ></div>
  </div>
</template>
