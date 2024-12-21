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
  topHeight: {
    type: Number,
    default() {
      return 1
    },
  },
  topOuterRadX: {
    type: Number,
    default() {
      return 2
    },
  },
  topOuterRadY: {
    type: Number,
    default() {
      return 2
    },
  },
  topInnerRadX: {
    type: Number,
    default() {
      return 1
    },
  },
  topInnerRadY: {
    type: Number,
    default() {
      return 1
    },
  },
  bottomCap: {
    type: Boolean,
  },
})
</script>

<template>
  <div class="lcars-col" :class="{ fill: fillWidth }">
    <div class="lcars-row">
      <div
        class="lcars-el"
        :class="[
          topOuterRadX > 0 && topOuterRadY > 0 ? 'rad-tl-' + topOuterRadX + '-' + topOuterRadY : '',
          topInnerRadX > 0 && topInnerRadY > 0
            ? 'rad-i-tl-' + topInnerRadX + '-' + topInnerRadY
            : '',
        ]"
        :style="{
          backgroundColor: color,
          width:
            'calc(var(--lcars-unit) * ' +
            leftWidth +
            ' + var(--lcars-unit) * ' +
            topInnerRadX +
            ')',
          height:
            'calc(var(--lcars-unit) * ' +
            topHeight +
            ' + var(--lcars-unit) * ' +
            topInnerRadY +
            ')',
        }"
      ></div>
      <div
        class="lcars-el"
        :class="{ fill: fillWidth }"
        :style="{
          backgroundColor: color,
          height: 'calc(var(--lcars-unit) * ' + topHeight + ')',
        }"
      ></div>
      <slot name="top"></slot>
      <div
        v-if="title"
        class="lcars-bar-text"
        :style="{
          color: color,
          fontSize: 'calc(var(--lcars-unit) * ' + topHeight + ')',
          lineHeight: 'calc(var(--lcars-unit) * ' + topHeight + ' * 0.8)',
        }"
      >
        {{ title }}
      </div>
      <div
        v-if="topCap"
        class="lcars-el"
        :class="'r-cap-' + topHeight * 5"
        :style="{ backgroundColor: color, height: 'calc(var(--lcars-unit) * ' + topHeight + ')' }"
      ></div>
    </div>
    <div class="lcars-row" :class="{ fill: fillHeight }">
      <div class="lcars-col">
        <slot name="left"></slot>
        <div
          class="lcars-el fill"
          :style="{
            backgroundColor: leftColor,
            width: 'calc(var(--lcars-unit) * ' + leftWidth + ')',
          }"
        ></div>
        <div
          v-if="bottomCap"
          class="lcars-el"
          :class="'b-cap-' + leftWidth * 5"
          :style="{ backgroundColor: color, height: 'calc(var(--lcars-unit) * ' + topHeight + ')' }"
        ></div>
      </div>
      <div class="lcars-col" :class="{ fill: fillWidth }">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
