<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import gsap from 'gsap'

import { callService, getStateValue, haState } from '../HAState'
import { colorVar, unitSize } from '@/Layout'
import LCARSElement from './LCARSElement.vue'
import LCARSRow from './LCARSRow.vue'
import { useGesture } from '@vueuse/gesture'
import { useMotionProperties, useSpring } from '@vueuse/motion'

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
} = defineProps<{
  entity: string
  attribute: string
  width?: number
  height?: number
  color?: string
  bgColor?: string
  gridColor?: string
  stroke?: number
  min?: number
  max?: number
  tickInterval?: number
  decimalPlaces?: number
  showGrid?: boolean
  service?: string
  serviceKey?: string
  data?: any
}>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getValue(state: any) {
  return getStateValue(state, entity, attribute) ?? min
}

const reactiveValueX = reactive({ number: 0 })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function animateValue(newData: any) {
  gsap.to(reactiveValueX, { duration: 1, number: newData.valueX })
}

watch(
  () => getValue(haState.value),
  (v) => {
    if (v) {
      const newData = getData(haState.value)
      animateValue(newData)
    }
  },
)

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
      onDragStart: (state) => {
        console.log(state)
      },
      onDragEnd: ({ movement: [x, y], tap, xy: [tapX, tapY] }) => {
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
    checkedValue
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
</script>
<template>
  <div ref="scale">
    <LCARSRow style="align-content: space-between; position: relative">
      <LCARSElement
        :color="bgColor ?? color"
        style="position: absolute; top: 0; left: 0"
        :width="reactiveValueX.number"
        :height="height"
      />
      <LCARSElement
        v-for="n in scaleConfig.tickCount"
        :width="scaleConfig.tickWidth"
        :height="height"
        :style="{
          borderStyle: 'solid',
          borderWidth: `${stroke}px`,
          borderColor: colorVar(gridColor),
          boxSizing: 'border-box',
          position: 'absolotue',
          zIndex: 1,
        }"
      />
    </LCARSRow>
  </div>
</template>
