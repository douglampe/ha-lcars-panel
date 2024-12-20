<script setup lang="ts">
import { computed, reactive, useId, watch } from 'vue'
import gsap from 'gsap'

import { haState } from '../HAState'
import VDotLine from './VDotLine.vue'

const id = useId()

const {
  entity,
  attribute,
  title,
  rows,
  cols,
  color,
  bgColor,
  stroke,
  min,
  max,
  tickInterval,
  minorTickInterval,
  decimalPlaces,
} = defineProps({
  entity: {
    type: String,
    default() {
      return 'Sensor'
    },
  },
  attribute: {
    type: String,
    default() {
      return 'Sensor'
    },
  },
  title: {
    type: String,
    default() {
      return 'Sensor'
    },
  },
  rows: {
    type: Number,
    default() {
      return 3
    },
  },
  cols: {
    type: Number,
    default() {
      return 1
    },
  },
  color: {
    type: String,
    default() {
      return 'var(--lcars-color-periwinkle)'
    },
  },
  bgColor: {
    type: String,
    default() {
      return 'var(--lcars-color-golden-tanoi)'
    },
  },
  stroke: {
    type: Number,
    default() {
      return 2
    },
  },
  min: {
    type: Number,
    default() {
      return 0
    },
  },
  max: {
    type: Number,
    default() {
      return 100
    },
  },
  tickInterval: {
    type: Number,
    default() {
      return 10
    },
  },
  minorTickInterval: {
    type: Number,
    default() {
      return 2
    },
  },
  decimalPlaces: {
    type: Number,
    default() {
      return 0
    },
  },
})

function colSize() {
  return ((window.innerWidth ?? 1280) * 8) / 100
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getData(state: any) {
  const value = getValue(state)
  const width = colSize() * (cols ?? 1)
  const height = colSize() * (rows ?? 6)
  const majorTicks = []
  for (let i = min + tickInterval; i < max && majorTicks.length < 1000; i += tickInterval) {
    majorTicks.push({
      value: i,
      y: ((max - i) * height) / (max - min),
    })
  }

  const minorTicks = []
  for (
    let i = min + minorTickInterval;
    i < max && minorTicks.length < 1000;
    i += minorTickInterval
  ) {
    minorTicks.push({
      value: i,
      y: ((max - i) * height) / (max - min),
    })
  }

  return {
    width,
    height,
    majorTicks,
    minorTicks,
    value,
    valueY: ((max - value) * height) / (max - min),
    valueHeight: ((max - min - value) * height) / (max - min),
    tickLength: width * 0.3,
    fontSize: width * 0.15,
    minorTickLength: width * 0.15,
    middle: width * 0.5,
  }
}

const data = computed(() => {
  return getData(haState.value)
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getValue(state: any) {
  if (!state?.states) {
    return min
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entityObject: any = state.states[entity]

  if (!entityObject?.attributes) {
    return min
  }

  return entityObject.attributes[attribute]
}

const reactiveValue = reactive({ number: min })
const reactiveValueY = reactive({ number: colSize() * (rows ?? 6) })
const reactiveValueHeight = reactive({ number: colSize() * (rows ?? 6) })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function animateValue(newData: any) {
  gsap.to(reactiveValue, { duration: 1, number: newData.value })
  gsap.to(reactiveValueY, { duration: 1, number: newData.valueY })
  gsap.to(reactiveValueHeight, { duration: 1, number: newData.valueHeight })
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

animateValue(data.value)
</script>

<template>
  <div class="lcars-row" style="padding: 1vw">
    <div class="lcars-col">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        :width="data.width"
        :height="data.height"
        :viewBox="'0,0,' + data.width + ',' + data.height"
      >
        <defs>
          <linearGradient :id="'vertical-gradient-' + id">
            <stop offset="0" stop-opacity="0" :stop-color="bgColor" />
            <stop :offset="data.width" stop-opacity="1" :stop-color="bgColor" />
          </linearGradient>
        </defs>
        <rect
          x="0"
          :y="(reactiveValueY.number ?? 0).toFixed(0)"
          rx="0.5vw"
          ry="0.5vw"
          id="Value Gradient"
          :width="data.width"
          :height="(reactiveValueHeight.number ?? 0).toFixed(0)"
          :fill="'url(#vertical-gradient-' + id + ')'"
        />
        <rect
          x="0"
          y="0"
          rx="0.5vw"
          ry="0.5vw"
          id="Border"
          :width="data.width"
          :height="data.height"
          :stroke="color"
          :stroke-width="stroke"
          fill="none"
        />
        <g
          id="Tick Group"
          fill="none"
          fill-rule="nonzero"
          stroke="none"
          stroke-width="none"
          stroke-linecap="butt"
          stroke-linejoin="miter"
          stroke-miterlimit="10"
          stroke-dasharray=""
          stroke-dashoffset="0"
          font-family="none"
          font-weight="none"
          font-size="none"
          text-anchor="none"
          style="mix-blend-mode: normal"
        >
          <path
            v-for="tick in data.majorTicks"
            :key="'tick-left-' + tick.value"
            :d="'M0 ' + tick.y + ' h' + data.tickLength"
            :id="'Major tick ' + tick.value"
            fill="none"
            :stroke="color"
            :stroke-width="stroke"
          />
          <path
            v-for="tick in data.minorTicks"
            :key="'minor-tick-left-' + tick.value"
            :d="'M0 ' + tick.y + ' h' + data.minorTickLength"
            :id="'Minor tick ' + tick.value"
            fill="none"
            :stroke="color"
            :stroke-width="stroke"
          />
          <path
            v-for="tick in data.majorTicks"
            :key="'tick-right-' + tick.value"
            :d="'M' + data.width + ' ' + tick.y + ' h-' + data.tickLength"
            :id="'Major tick right' + tick.value"
            fill="none"
            :stroke="color"
            :stroke-width="stroke"
          />
          <path
            v-for="tick in data.minorTicks"
            :key="'minor-tick-right-' + tick.value"
            :d="'M' + data.width + ' ' + tick.y + ' h-' + data.minorTickLength"
            :id="'Minor tick lower' + tick.value"
            fill="none"
            :stroke="color"
            :stroke-width="stroke"
          />
          <text
            v-for="tick in data.majorTicks"
            :x="data.middle"
            :y="tick.y"
            :key="'label-' + tick.value"
            id='1 "in. label no. 0'
            :fill="color"
            stroke="none"
            stroke-width="1"
            font-family="monospace"
            font-weight="bold"
            :font-size="data.fontSize"
            text-anchor="middle"
            dominant-baseline="middle"
          >
            {{ tick.value }}
          </text>
        </g>
      </svg>
    </div>
    <div class="lcars-col">
      <div
        class="lcars-text-element"
        style="transform: rotate(-90deg) translate(2vw, -2vw)"
        :style="{ color: color }"
      >
        {{ reactiveValue.number.toFixed(decimalPlaces) }}
      </div>
      <div
        style="flex: 1; padding: 1vw; padding-bottom: 5vw; display: flex; flex-direction: column"
      >
        <VDotLine :color="bgColor" :stroke="stroke"></VDotLine>
      </div>
      <div
        class="lcars-text-element"
        style="transform: rotate(-90deg) translate(2vw, -2vw)"
        :style="'color: ' + bgColor"
      >
        {{ title }}
      </div>
    </div>
  </div>
</template>
