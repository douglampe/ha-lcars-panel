<script setup lang="ts">
const { title, color } = defineProps({
  title: {
    type: String,
  },
  fillWidth: {
    type: Boolean,
  },
  fillHeight: {
    type: Boolean,
  },
  color: {
    type: String,
    default() {
      return 'var(--lcars-color-gray-blue)'
    },
  },
  leftWidth: {
    type: Number,
    default() {
      return 3
    },
  },
  leftColor: {
    type: String,
    default() {
      return 'var(--lcars-color-golden-tanoi)'
    },
  },
  topCap: {
    type: Boolean,
  },
  bottomCap: {
    type: Boolean,
  },
  bottomHeight: {
    type: Number,
    default() {
      return 1
    },
  },
  bottomOuterRadX: {
    type: Number,
    default() {
      return 2
    },
  },
  bottomOuterRadY: {
    type: Number,
    default() {
      return 2
    },
  },
  bottomInnerRadX: {
    type: Number,
    default() {
      return 1
    },
  },
  bottomInnerRadY: {
    type: Number,
    default() {
      return 1
    },
  },
})
</script>

<template>
  <div class="lcars-col" :class="{ fill: fillWidth }">
    <div class="lcars-row" :class="{ fill: fillHeight }">
      <div class="lcars-col">
        <div
          v-if="bottomCap"
          class="lcars-el"
          :class="'t-cap-' + leftWidth * 5"
          :style="{ backgroundColor: color }"
        ></div>
        <slot name="left"></slot>
        <div
          class="lcars-el fill"
          :style="{
            backgroundColor: leftColor,
            width: 'calc(var(--lcars-unit) * ' + leftWidth + ')',
          }"
        ></div>
      </div>
      <div class="lcars-col" :class="{ fill: fillWidth }">
        <slot></slot>
      </div>
    </div>
    <div class="lcars-row">
      <div
        class="lcars-el"
        :class="[
          bottomOuterRadX > 0 && bottomOuterRadY > 0
            ? 'rad-bl-' + bottomOuterRadX + '-' + bottomOuterRadY
            : '',
          bottomInnerRadX > 0 && bottomInnerRadY
            ? 'rad-i-bl-' + bottomInnerRadX + '-' + bottomInnerRadY
            : '',
        ]"
        :style="{
          backgroundColor: color,
          width:
            'calc(var(--lcars-unit) * ' +
            leftWidth +
            ' + var(--lcars-unit) * ' +
            bottomInnerRadX +
            ')',
          height: `calc(var(--lcars-unit) * ${bottomHeight} + var(--lcars-unit) * ${bottomInnerRadY}`,
        }"
      ></div>
      <div
        class="lcars-el bottom"
        :class="{ fill: fillWidth }"
        :style="{ backgroundColor: color, height: `calc(var(--lcars-unit) * ${bottomHeight}` }"
      ></div>
      <slot name="bottom"></slot>
      <div
        v-if="title"
        class="lcars-el lcars-bar-text bottom"
        :style="{
          color: color,
          fontSize: 'calc(var(--lcars-unit) * ' + bottomHeight + ')',
          lineHeight: 'calc(var(--lcars-unit) * ' + bottomHeight + ' * 0.8)',
        }"
      >
        {{ title }}
      </div>
      <div
        v-if="bottomCap"
        class="lcars-el bottom"
        :class="'r-cap-' + bottomHeight * 5"
        :style="{
          backgroundColor: color,
          height: 'calc(var(--lcars-unit) * ' + bottomHeight + ')',
        }"
      ></div>
    </div>
  </div>
</template>
