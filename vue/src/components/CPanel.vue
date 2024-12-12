<script setup lang="ts">
const { title, color } = defineProps({
  title: {
    type: String,
  },
  color: {
    type: String,
    default() {
      return 'var(--color-gray-blue)'
    },
  },
  leftColor: {
    type: String,
    default() {
      return 'var(--color-golden-tanoi)'
    },
  },
})
</script>

<template>
  <div class="lcars-column fill">
    <div class="lcars-row">
      <div class="lcars-u-1 lcars-elbow left-bottom" :style="{ backgroundColor: color }"></div>
      <div class="lcars-bar horizontal fill" :style="{ backgroundColor: color }"></div>
      <div class="lcars-bar-text" :style="{ color: color }">{{ title }}</div>
      <div
        class="lcars-bar horizontal right-end decorated"
        :style="{ backgroundColor: color }"
      ></div>
    </div>
    <div class="lcars-row fill">
      <div :style="{ backgroundColor: leftColor }" class="lcars-bar lcars-u-1-minus"></div>
      <div
        class="lcars-column fill"
        style="margin-top: -2vw; margin-bottom: -2vw; margin-left: 1vw"
      >
        <slot></slot>
      </div>
    </div>
    <div class="lcars-row">
      <div class="lcars-u-1 lcars-elbow left-top" :style="{ backgroundColor: color }"></div>
      <div class="lcars-bar horizontal bottom fill" :style="{ backgroundColor: color }"></div>
      <div
        class="lcars-bar horizontal right-end decorated bottom"
        :style="{ backgroundColor: color }"
      ></div>
    </div>
  </div>
</template>
