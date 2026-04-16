<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import gsap from 'gsap'

import { callService, getStateValue, haState } from '../HAState'
import { colorVar, removeUndefined, unitSize } from '@/Layout'
import { useGesture } from '@vueuse/gesture'
import { useMotionProperties, useSpring } from '@vueuse/motion'
import LCARSRow from './LCARSRow.vue'
import LCARSElement from './LCARSElement.vue'
import { createScaleVSVG } from '@/SVGUtils'
import type { ScaleProps } from '@/props/ScaleProps'
import LCARSCol from './LCARSCol.vue'

const {
  entity,
  attribute,
  title,
  titleColor,
  titleHeight,
  titleTapAction,
  width = 3,
  height = 10,
  barThickness,
  barOffset,
  color = 'golden-tainoi',
  borderColor = 1,
  gridColor = 'dim-gray',
  stroke = 2,
  min = 0,
  max = 100,
  tickInterval = 10,
  tickFontSize = 1,
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

defineOptions({
  inheritAttrs: false,
})

function getData(state: any) {
  const value = getValue(state)
  return {
    width: unitSize(width),
    height: unitSize(height),
    value,
    valueY: ((value - min) * height) / (max - min),
  }
}

function getTicks() {
  const tickHeight = (scale.value?.offsetHeight * tickInterval) / (max - min)
  const tickCount = showGrid ? (max - min) / tickInterval : 0

  const ticks = []
  for (let i = 1; i <= tickCount; i++) {
    ticks.push(tickHeight * i)
  }
  return ticks
}

function getMinorTicks() {
  if (minorTickInterval ?? 0 <= 0) {
    return [] as number[]
  }

  const tickHeight = (scale.value?.offsetHeight * minorTickInterval) / (max - min)
  const tickCount = showGrid ? (max - min) / minorTickInterval : 0

  const ticks = []
  for (let i = 1; i <= tickCount; i++) {
    ticks.push(tickHeight * i)
  }
  return ticks
}

function getLabels() {
  if (!showTickLabels) {
    return []
  }
  const tickCount = showGrid ? (max - min) / tickInterval : 0

  const ticks = []
  for (let i = 0; i <= tickCount; i++) {
    ticks.push((min + tickInterval * (i + 1)).toFixed(decimalPlaces))
  }
  return ticks
}

const scaleConfig = computed(() => {
  return getData(haState.value)
})

function getValue(state: any) {
  return entity ? (getStateValue(state, entity, attribute) ?? min) : min
}

const reactiveValueY = reactive({ number: 0 })

function animateValue(newData: any) {
  gsap.to(reactiveValueY, { duration: 1, number: newData.valueY })
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
    ? createScaleVSVG(
        removeUndefined({ ...config }),
        gridColor,
        stroke,
        scale.value?.offsetWidth,
        scale.value?.offsetHeight,
        getTicks(),
        getLabels(),
        unitSize(tickFontSize),
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
    bottom: 0,
    left: 0,
    position: 'absolute',
    width: unitSize(barThickness) ?? unitSize(width),
    height: scaleData.value.valueY ? unitSize(scaleData.value.valueY) : 0,
    marginLeft: unitSize(barOffset),
    backgroundColor: colorVar(color),
  })
})

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
      onDragEnd: ({ movement: [_x, y], tap, xy: [_tapX, tapY] }) => {
        if (tap) {
          const bounds = scale.value.getBoundingClientRect()
          const newValue =
            ((scale.value.clientHeight - (tapY - bounds.y)) / scale.value.clientHeight) *
              (max - min) +
            min
          setValue(newValue)
        } else {
          setValue(scaleConfig.value.value - (y / scale.value.clientHeight) * (max - min))
        }
      },
    },
    {
      domTarget: scale,
    },
  )
}
</script>
<template>
  <LCARSRow :stretch="true">
    <LCARSCol>
      <LCARSElement
        v-if="leftBorder"
        :color="borderColor"
        :width="leftBorder"
        :fill="true"
      ></LCARSElement>
    </LCARSCol>
    <LCARSCol :stretch="true">
      <LCARSElement v-if="topBorder" :color="borderColor" :fill="true" :height="topBorder" />
      <LCARSRow>
        <div style="position: relative">
          <div v-if="!barThickness" :style="barStyle"></div>
          <div ref="scale" :style="styleObject"></div>
          <div v-if="barThickness" :style="barStyle"></div>
        </div>
      </LCARSRow>
      <LCARSElement v-if="bottomBorder" :color="borderColor" :fill="true" :height="bottomBorder" />
      <LCARSElement
        v-if="title"
        :color="borderColor"
        :textColor="titleColor"
        :tapAction="titleTapAction"
        :height="titleHeight"
        :pad="0.2"
        alignContent="middle-right"
        >{{ title }}</LCARSElement
      >
    </LCARSCol>
    <LCARSCol>
      <LCARSElement v-if="rightBorder" :color="borderColor" :width="rightBorder"></LCARSElement>
    </LCARSCol>
  </LCARSRow>
</template>
