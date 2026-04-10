<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import gsap from 'gsap'

import { callService, getStateValue, haState } from '../HAState'
import { colorVar, removeUndefined, unitSize } from '@/Layout'
import { useGesture } from '@vueuse/gesture'
import { useMotionProperties, useSpring } from '@vueuse/motion'
import type { HAConfig } from '@/HAConfig'

const {
  entity,
  attribute,
  width = 10,
  height = 3,
  color = 'golden-tainoi',
  gridColor = 'periwinkle',
  stroke = 2,
  min = 0,
  max = 100,
  tickInterval = 10,
  decimalPlaces,
  showGrid = true,
  service,
  serviceKey,
  data,
  config,
} = defineProps<{
  entity?: string
  attribute?: string
  width?: number
  height?: number
  color?: string | number
  bgColor?: string | number
  gridColor?: string | number
  stroke?: number
  min?: number
  max?: number
  tickInterval?: number
  decimalPlaces?: number
  showGrid?: boolean
  service?: string
  serviceKey?: string
  data?: any
  config?: HAConfig
}>()

defineOptions({
  inheritAttrs: false,
})

function getData(state: any) {
  const value = getValue(state)
  return {
    width: unitSize(width),
    height: unitSize(height),
    tickWidth: (width * tickInterval) / (max - min),
    tickCount: showGrid ? (max - min) / tickInterval : 0,
    value,
    valueX: ((value - min) * width) / (max - min),
  }
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

const scale = ref()

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
      domTarget: scale,
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
  return removeUndefined({
    position: 'relative',
    width: unitSize(width),
    height: unitSize(height),
  })
})

const barStyle = computed(() => {
  if (!scaleData.value) return {}

  return removeUndefined({
    top: `${stroke ?? 0}px`,
    left: 0,
    position: 'absolute',
    width: scaleData.value.valueX ? unitSize(scaleData.value.valueX) : 0,
    height: unitSize(height),
    backgroundColor: colorVar(color),
  })
})

const ticks = computed(() => {
  if (!scaleData.value || !showGrid) return []

  const { tickCount, tickWidth } = scaleData.value
  const ticksArray = []
  for (let i = 0; i < tickCount; i++) {
    ticksArray.push({
      top: 0,
      left: unitSize(i * tickWidth),
      width: unitSize(tickWidth),
      height: unitSize(height),
      borderColor: colorVar(gridColor),
      borderStyle: 'solid',
      borderWidth: `${stroke}px ${stroke}px ${stroke}px ${i === 0 ? stroke : 0}px`,
      position: 'absolute',
    })
  }
  return ticksArray
})
</script>
<template>
  <div ref="scale" :style="styleObject">
    <div :style="barStyle"></div>
    <div v-for="(tick, index) in ticks" :key="index" :style="tick as any"></div>
  </div>
</template>
