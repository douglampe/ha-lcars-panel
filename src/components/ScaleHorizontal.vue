<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import gsap from 'gsap'

import { callService, getStateValue, haState } from '../HAState'
import { colorVar, removeUndefined, unitSize } from '@/Layout'
import { useGesture } from '@vueuse/gesture'
import { useMotionProperties, useSpring } from '@vueuse/motion'
import LCARSRow from './LCARSRow.vue'
import LCARSElement from './LCARSElement.vue'
import { createScaleHSVG } from '@/SVGUtils'
import type { ScaleProps } from '@/props/ScaleProps'

const {
  entity,
  attribute,
  title,
  titleColor,
  titleWidth,
  titleTapAction,
  width = 10,
  height = 3,
  barThickness,
  barOffset,
  color = 'golden-tainoi',
  borderColor = 1,
  gridColor = 'dim-gray',
  stroke = 2,
  min = 0,
  max = 100,
  tickInterval = 10,
  tickLabelFontSize = 1,
  tickLabelMin,
  tickLabelMax,
  minorTickInterval = 2.5,
  decimalPlaces,
  showGrid = true,
  showTickLabels,
  service,
  serviceKey,
  data,
  topBorder,
  bottomBorder,
  leftBorder,
  rightBorder,
  config,
} = defineProps<ScaleProps>()

const scale = ref()
const touchLayer = ref()

defineOptions({
  inheritAttrs: false,
})

function getData(state: any) {
  const value = getValue(state)
  return {
    width: unitSize(width),
    height: unitSize(height),
    value,
    valueX: ((value - min) * width) / (max - min),
  }
}

function getTicks() {
  const tickWidth = (scale.value?.offsetWidth * tickInterval) / (max - min)
  const tickCount = showGrid ? (max - min) / tickInterval : 0

  const ticks = []
  for (let i = 1; i <= tickCount; i++) {
    ticks.push(tickWidth * i)
  }
  return ticks
}

function getMinorTicks() {
  if (minorTickInterval ?? 0 <= 0) {
    return [] as number[]
  }

  const tickWidth = (scale.value?.offsetWidth * minorTickInterval) / (max - min)
  const tickCount = showGrid ? (max - min) / minorTickInterval : 0

  const ticks = []
  for (let i = 1; i <= tickCount; i++) {
    ticks.push(tickWidth * i)
  }
  return ticks
}

function getLabels() {
  if (!showTickLabels) {
    return []
  }
  const tickCount = showGrid ? (max - min) / tickInterval : 0
  const labelMin = tickLabelMin ?? min
  const labelMax = tickLabelMax ?? max

  const ticks = []
  for (let i = 0; i <= tickCount; i++) {
    ticks.push((labelMin + ((i + 1) / tickCount) * (labelMax - labelMin)).toFixed(decimalPlaces))
  }
  return ticks
}

const scaleConfig = computed(() => {
  return getData(haState.value)
})

function getValue(state: any) {
  return entity ? (getStateValue(state, entity, attribute) ?? min) : min
}

const reactiveValueX = reactive({ number: 0 })

function animateValue(newData: any) {
  gsap.to(reactiveValueX, { duration: 1, number: newData.valueX })
}

if (!config?.disableWatchers) {
  watch(
    () => getValue(haState.value),
    (v) => {
      if (v) {
        const newData = getData(haState.value)
        animateValue(newData)
      }
    },
  )
}

animateValue(scaleConfig.value)

if (service) {
  const { motionProperties } = useMotionProperties(scale, {
    cursor: 'grab',
    x: 0,
    y: 0,
  })

  const { set } = useSpring(motionProperties as any)

  useGesture(
    {
      onDrag: ({ dragging }) => {
        if (!dragging) {
          set({ x: 0, y: 0, cursor: 'grab' })
          return
        }

        set({
          cursor: 'grabbing',
          x: 0,
          y: 0,
        })
      },
      onDragEnd: ({ movement: [x, _y], tap, xy: [tapX, _tapY] }) => {
        if (tap) {
          const bounds = scale.value.getBoundingClientRect()
          const newValue = ((tapX - bounds.x) / scale.value.clientWidth) * (max - min) + min
          setValue(newValue)
        } else {
          setValue(scaleConfig.value.value + (x / scale.value.clientWidth) * (max - min))
        }
      },
    },
    {
      domTarget: touchLayer,
    },
  )
}

function setValue(val: number) {
  let checkedValue = val

  if (checkedValue < min) {
    checkedValue = min
  } else if (checkedValue > max) {
    checkedValue = max
  }

  if (decimalPlaces) {
    checkedValue = Number(checkedValue.toFixed(decimalPlaces))
  }

  if (service && serviceKey && entity) {
    const serviceData = { ...data, entity_id: entity } as any
    serviceData[serviceKey] = checkedValue
    callService(service, serviceData)
  }
}

const scaleData = computed(() => getData(haState.value))

const styleObject = computed(() => {
  const backgroundImageSvg = showGrid
    ? createScaleHSVG(
        removeUndefined({ ...config }),
        gridColor,
        stroke,
        scale.value?.offsetWidth,
        scale.value?.offsetHeight,
        getTicks(),
        getLabels(),
        unitSize(tickLabelFontSize),
        getMinorTicks(),
      )
    : undefined

  return removeUndefined({
    position: 'relative',
    top: 0,
    left: 0,
    width: unitSize(width),
    height: unitSize(height),
    backgroundImage: backgroundImageSvg
      ? `url("data:image/svg+xml;utf8,${encodeURIComponent(backgroundImageSvg)}")`
      : undefined,
    backgroundSize: '100% 100%',
    backgroundRepeat: backgroundImageSvg ? 'no-repeat' : undefined,
  })
})

const barStyle = computed(() => {
  if (!scaleData.value) return {}

  return removeUndefined({
    top: 0,
    left: 0,
    position: 'absolute',
    width: scaleData.value.valueX ? unitSize(scaleData.value.valueX) : 0,
    height: unitSize(barThickness) ?? unitSize(height),
    marginTop: unitSize(barOffset),
    backgroundColor: colorVar(color),
  })
})
</script>
<template>
  <LCARSRow v-if="topBorder">
    <LCARSElement v-if="topBorder" :color="borderColor" :fill="true" :height="topBorder" />
  </LCARSRow>
  <LCARSRow :stretch="true">
    <LCARSElement
      v-if="title"
      :color="borderColor"
      :textColor="titleColor"
      :tapAction="titleTapAction"
      :width="titleWidth"
      :pad="0.2"
      alignContent="middle-right"
      >{{ title }}</LCARSElement
    >
    <LCARSElement v-if="leftBorder" :color="borderColor" :width="leftBorder"></LCARSElement>
    <div style="position: relative">
      <div v-if="!barThickness" :style="barStyle"></div>
      <div ref="scale" :style="styleObject"></div>
      <div v-if="barThickness" :style="barStyle"></div>
      <div style="position: absolute; top: 0; bottom: 0; left: 0; right: 0" ref="touchLayer"></div>
    </div>
    <LCARSElement v-if="rightBorder" :color="borderColor" :width="rightBorder"></LCARSElement>
  </LCARSRow>
  <LCARSRow v-if="bottomBorder">
    <LCARSElement v-if="bottomBorder" :color="borderColor" :fill="true" :height="bottomBorder" />
  </LCARSRow>
</template>
