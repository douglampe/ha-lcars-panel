<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { navigate } from '@/LocalNav'
import { alignStyle, colorVar, marginStyle, padStyle, removeUndefined, unitSize } from '@/Layout'
import { callService } from '@/HAState'
import type { ConfigItem } from '@/ConfigItem'
import { createRadiusSvg } from '@/props/RadiusProps'

const config = defineProps<ConfigItem>()
const elementRef = ref<HTMLElement | null>(null)

defineOptions({
  inheritAttrs: false,
})

function onClick() {
  if (config.tapAction?.action) {
    if (config.tapAction.action === 'call-service' && config.tapAction.service) {
      callService(config.tapAction.service, config.tapAction.data)
    }
  } else if (config.nav) {
    navigate(config.nav)
  }
}

const styleObject = computed(() => {
  const backgroundImageSvg = createRadiusSvg(
    config,
    elementRef.value?.offsetWidth,
    elementRef.value?.offsetHeight,
  )

  return removeUndefined({
    ...alignStyle(config.alignContent),
    width: unitSize(config.width),
    height: unitSize(config.height),
    fontSize: unitSize(config.fontSize),
    lineHeight: unitSize(
      config.lineHeight ?? (config.fontSize ? config.fontSize * 1.2 : undefined),
    ),
    backgroundImage: backgroundImageSvg
      ? `url("data:image/svg+xml;utf8,${encodeURIComponent(backgroundImageSvg)}")`
      : undefined,
    backgroundSize: backgroundImageSvg ? '100% 100%' : undefined,
    backgroundRepeat: backgroundImageSvg ? 'no-repeat' : undefined,
    backgroundColor: backgroundImageSvg ? undefined : colorVar(config.color),
    fill: config.color ? 'color' : undefined,
    color: colorVar(config.textColor),
    flex: config.fill ? 1 : undefined,
    margin: marginStyle(config),
    padding: padStyle(config),
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
    ...(config.style ?? {}),
  })
})
</script>

<template>
  <div
    :style="styleObject"
    :class="config.class ?? []"
    ref="elementRef"
    v-on="config.nav || config.tapAction ? { click: onClick } : {}"
  >
    <slot></slot>
  </div>
</template>
