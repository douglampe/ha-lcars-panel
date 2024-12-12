<script setup lang="ts">
import { computed, reactive, ref, useId, watch } from 'vue'
import gsap from 'gsap'
import DotLine from './DotLine.vue'
const id = useId()

const {
  hass,
  entity,
  attribute,
  title,
  cols,
  height,
  color,
  bgColor,
  stroke,
  min,
  max,
  tickInterval,
  minorTickInterval,
  decimalPlaces,
} = defineProps({
  hass: {
    type: Object,
    default() {
      return {}
    },
  },
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
  cols: {
    type: Number,
    default() {
      return 8
    },
  },
  height: {
    type: Number,
    default() {
      return 100
    },
  },
  color: {
    type: String,
    default() {
      return 'var(--color-periwinkle)'
    },
  },
  bgColor: {
    type: String,
    default() {
      return 'var(--color-golden-tanoi)'
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
const watchValue = ref(0)
const reactiveValue = reactive({ number: 0 })
const reactiveValueX = reactive({ number: 0 })
watch(watchValue, (n) => {
  const width = colSize() * (cols ?? 8)
  gsap.to(reactiveValue, { duration: 1, number: Number(n) ?? 0 })
  gsap.to(reactiveValueX, { duration: 1, number: ((Number(n) ?? 0) * width) / (max - min) })
})
watchValue.value = getValue()
const size = computed(() => {
  const value = getValue()
  const width = ((window.innerWidth ?? 1280) * (cols ?? 8) * 8) / 100
  const majorTicks = []
  for (
    let i = Number(min) + Number(tickInterval);
    i < Number(max) && majorTicks.length < 1000;
    i += Number(tickInterval)
  ) {
    majorTicks.push({
      value: i,
      x: ((i - min) * width) / (max - min),
    })
  }

  const minorTicks = []
  for (
    let i = Number(min) + Number(minorTickInterval);
    i < Number(max) && minorTicks.length < 1000;
    i += Number(minorTickInterval)
  ) {
    minorTicks.push({
      value: i,
      x: ((i - min) * width) / (max - min),
    })
  }

  return {
    width,
    majorTicks,
    minorTicks,
    valueX: ((value - min) * width) / (max - min),
    tickLength: (height ?? 50) * 0.3,
    fontSize: (height ?? 50) * 0.25,
    minorTickLength: (height ?? 50) * 0.15,
    middle: (height ?? 50) * 0.5,
  }
})

function getValue() {
  if (!hass || !hass.states) {
    return min
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entityObject: any = hass.states[entity]

  if (!entityObject || !entityObject.attributes) {
    return min
  }
  return entityObject.attributes[attribute]
}
</script>
<template>
  <div style="padding: 1vw">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      :width="size.width"
      :height="height"
      :viewBox="'0,0,' + size.width + ',' + height"
    >
      <defs>
        <linearGradient :id="'gradient-' + id">
          <stop offset="0" stop-opacity="0" :stop-color="bgColor" />
          <stop :offset="size.width" stop-opacity="1" :stop-color="bgColor" />
        </linearGradient>
      </defs>
      <rect
        x="0"
        y="0"
        rx="0.5vw"
        ry="0.5vw"
        id="Value Gradient"
        :width="reactiveValueX.number.toFixed(0)"
        :height="height"
        :fill="'url(#gradient-' + id + ')'"
      />
      <rect
        x="0"
        y="0"
        rx="0.5vw"
        ry="0.5vw"
        id="Border"
        :width="size.width"
        :height="height"
        :stroke="color"
        :stroke-width="stroke"
        fill="none"
      />
      <g
        id="Major Tick Group"
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
          v-for="tick in size.majorTicks"
          :key="'tick-upper-' + tick.value"
          :d="'M' + tick.x + ' 0 v' + size.tickLength"
          :id="'Major tick ' + tick.value"
          fill="none"
          :stroke="color"
          :stroke-width="stroke"
        />
        <path
          v-for="tick in size.minorTicks"
          :key="'minor-tick-upper-' + tick.value"
          :d="'M' + tick.x + ' 0 v' + size.minorTickLength"
          :id="'Minor tick ' + tick.value"
          fill="none"
          :stroke="color"
          :stroke-width="stroke"
        />
        <path
          v-for="tick in size.majorTicks"
          :key="'tick-lower-' + tick.value"
          :d="'M' + tick.x + ' ' + height + ' v-' + size.tickLength"
          :id="'Major tick lower' + tick.value"
          fill="none"
          :stroke="color"
          :stroke-width="stroke"
        />
        <path
          v-for="tick in size.minorTicks"
          :key="'minor-tick-lower-' + tick.value"
          :d="'M' + tick.x + ' ' + height + ' v-' + size.minorTickLength"
          :id="'Minor tick lower' + tick.value"
          fill="none"
          :stroke="color"
          :stroke-width="stroke"
        />
        <text
          v-for="tick in size.majorTicks"
          :x="tick.x"
          :key="'label-' + tick.value"
          :y="size.middle"
          id='1 "in. label no. 0'
          :fill="color"
          stroke="none"
          stroke-width="1"
          font-family="monospace"
          font-weight="bold"
          :font-size="size.fontSize"
          text-anchor="middle"
          dominant-baseline="middle"
        >
          {{ tick.value }}
        </text>
      </g>
    </svg>
    <div style="display: flex; flex-direction: row">
      <div class="lcars-text-element" :style="'color: ' + bgColor">{{ title }}</div>
      <div style="flex: 1; padding: 1vw; display: flex; flex-direction: row">
        <DotLine :color="bgColor" :stroke="stroke"></DotLine>
      </div>
      <div class="lcars-text-element" :style="'color: ' + color">
        {{ reactiveValue.number.toFixed(decimalPlaces) }}
      </div>
    </div>
  </div>
</template>
