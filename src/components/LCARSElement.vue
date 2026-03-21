<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { navigate } from '@/LocalNav'
import { alignStyle, colorVar, marginStyle, padStyle, removeUndefined, unitSize } from '@/Layout'
import { callService } from '@/HAState'
import type { ConfigItem } from '@/ConfigItem'
import { createRadiusSvg } from '@/props/RadiusProps'
import { haConfig } from '@/HAConfig'
import gsap from 'gsap'

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
    removeUndefined({ ...config }),
    elementRef.value?.offsetWidth,
    elementRef.value?.offsetHeight,
  )

  return removeUndefined({
    ...alignStyle(config.alignContent),
    top: unitSize(config.top),
    left: unitSize(config.left),
    width: unitSize(config.width),
    height: unitSize(config.height),
    fontSize: unitSize(config.fontSize),
    lineHeight: unitSize(
      config.lineHeight ?? (config.fontSize ? config.fontSize * 1.2 : undefined),
    ),
    backgroundImage: backgroundImageSvg
      ? `url("data:image/svg+xml;utf8,${encodeURIComponent(backgroundImageSvg)}")`
      : undefined,
    backgroundSize: backgroundImageSvg ? '100.5% 100.5%' : undefined,
    backgroundRepeat: backgroundImageSvg ? 'no-repeat' : undefined,
    backgroundColor: backgroundImageSvg ? undefined : colorVar(config.color),
    fill: config.color ? 'color' : undefined,
    color: colorVar(config.textColor),
    flex: config.fill ? 1 : undefined,
    margin: marginStyle(config),
    padding: padStyle(config),
    cursor: config.button || config.nav || config.tapAction ? 'pointer' : undefined,
    position: config.positioning ?? haConfig.value.positioning ?? undefined,
    textTransform: config.textTransform,
    ...(config.style ?? {}),
  })
})

onMounted(() => {
  if (config.animation?.in) {
    let from = {}
    let to = {}
    switch (config.animation.in.type) {
      case 'grow':
        from = {
          scale: 0,
          transformOrigin: config.animation?.in?.transformOrigiin,
        }
        to = {
          scale: 1,
          duration: config.animation.in.duration ?? 0.5,
          delay: config.animation.in.delay,
          transformOrigin: config.animation?.in?.transformOrigiin,
        }
        break
      case 'grow-down':
        from = {
          percentX: 0,
          percentY: 0,
          scaleY: 0,
          transformOrigin: '0 0',
        }
        to = {
          scaleY: 1,
          duration: config.animation.in.duration ?? 0.5,
          delay: config.animation.in.delay,
          transformOrigin: config.animation?.in?.transformOrigiin,
        }
        break
      case 'grow-up':
        from = {
          scaleY: 0,
          transformOrigin: '0 100%',
        }
        to = {
          scaleY: 1,
          duration: config.animation.in.duration ?? 0.5,
          delay: config.animation.in.delay,
          transformOrigin: config.animation?.in?.transformOrigiin,
        }
        break
      case 'grow-right':
        from = {
          scaleX: 0,
          transformOrigin: '0 100%',
        }
        to = {
          scaleX: 1,
          duration: config.animation.in.duration ?? 0.5,
          delay: config.animation.in.delay,
          transformOrigin: config.animation?.in?.transformOrigiin,
        }
        break
      case 'grow-left':
        from = {
          scaleX: 0,
          transformOrigin: '100% 100%',
        }
        to = {
          scaleX: 1,
          duration: config.animation.in.duration ?? 0.5,
          delay: config.animation.in.delay,
          transformOrigin: config.animation?.in?.transformOrigiin,
        }
        break
    }
    gsap.fromTo(elementRef.value, from, to)
  }
})
</script>

<template>
  <div :style="styleObject" :class="config.class ?? []" ref="elementRef" @click.self="onClick">
    <slot></slot>
  </div>
</template>
