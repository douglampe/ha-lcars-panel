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
  rightWidth: {
    type: Number,
    default() {
      return 3
    },
  },
  rightColor: {
    type: String,
    default() {
      return 'var(--lcars-color-golden-tanoi)'
    },
  },
  topHeight: {
    type: Number,
    default() {
      return 1
    },
  },
  topLeftOuterRadX: {
    type: Number,
    default() {
      return 2
    },
  },
  topLeftOuterRadY: {
    type: Number,
    default() {
      return 2
    },
  },
  topLeftInnerRadX: {
    type: Number,
    default() {
      return 1
    },
  },
  topLeftInnerRadY: {
    type: Number,
    default() {
      return 1
    },
  },
  topRightOuterRadX: {
    type: Number,
    default() {
      return 2
    },
  },
  topRightOuterRadY: {
    type: Number,
    default() {
      return 2
    },
  },
  topRightInnerRadX: {
    type: Number,
    default() {
      return 1
    },
  },
  topRightInnerRadY: {
    type: Number,
    default() {
      return 1
    },
  },
  bottomHeight: {
    type: Number,
    default() {
      return 1
    },
  },
  bottomLeftOuterRadX: {
    type: Number,
    default() {
      return 2
    },
  },
  bottomLeftOuterRadY: {
    type: Number,
    default() {
      return 2
    },
  },
  bottomLeftInnerRadX: {
    type: Number,
    default() {
      return 1
    },
  },
  bottomLeftInnerRadY: {
    type: Number,
    default() {
      return 1
    },
  },
  bottomRightOuterRadX: {
    type: Number,
    default() {
      return 2
    },
  },
  bottomRightOuterRadY: {
    type: Number,
    default() {
      return 2
    },
  },
  bottomRightInnerRadX: {
    type: Number,
    default() {
      return 1
    },
  },
  bottomRightInnerRadY: {
    type: Number,
    default() {
      return 1
    },
  },
})
</script>

<template>
  <div class="lcars-col" :class="{ fill: fillWidth }">
    <div class="lcars-row">
      <div
        class="lcars-el"
        :class="[
          topLeftOuterRadX > 0 && topLeftOuterRadY > 0
            ? 'rad-tl-' + topLeftOuterRadX + '-' + topLeftOuterRadY
            : '',
          topLeftInnerRadX > 0 && topLeftInnerRadY > 0
            ? 'rad-i-tl-' + topLeftInnerRadX + '-' + topLeftInnerRadY
            : '',
        ]"
        :style="{
          backgroundColor: color,
          width:
            'calc(var(--lcars-unit) * ' +
            leftWidth +
            ' + var(--lcars-unit) * ' +
            topLeftInnerRadX +
            ')',
          height:
            'calc(var(--lcars-unit) * ' +
            topHeight +
            ' + var(--lcars-unit) * ' +
            topLeftInnerRadY +
            ')',
        }"
      ></div>
      <slot name="top"></slot>
      <div
        class="lcars-el"
        :class="{ fill: fillWidth }"
        :style="{
          backgroundColor: color,
          height: 'calc(var(--lcars-unit) * ' + topHeight + ')',
        }"
      ></div>
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
        class="lcars-el"
        :class="[
          'rad-tr-' + topRightOuterRadX + '-' + topRightOuterRadY,
          'rad-i-tr-' + topRightInnerRadX + '-' + topRightInnerRadY,
        ]"
        :style="{
          backgroundColor: color,
          width:
            'calc(var(--lcars-unit) * ' +
            rightWidth +
            ' + var(--lcars-unit) * ' +
            topRightInnerRadX +
            ')',
          height:
            'calc(var(--lcars-unit) * ' +
            topHeight +
            ' + var(--lcars-unit) * ' +
            topRightInnerRadY +
            ')',
        }"
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
      </div>
      <div class="lcars-col" :class="{ fill: fillWidth }">
        <slot></slot>
      </div>
      <div class="lcars-col right">
        <slot name="right"></slot>
        <div
          class="lcars-el fill"
          :style="{
            backgroundColor: rightColor,
            width: 'calc(var(--lcars-unit) * ' + rightWidth + ')',
          }"
        ></div>
      </div>
    </div>
    <div class="lcars-row">
      <div
        class="lcars-el"
        :class="[
          bottomLeftOuterRadX > 0 && bottomLeftOuterRadY > 0
            ? 'rad-bl-' + bottomLeftOuterRadX + '-' + bottomLeftOuterRadY
            : '',
          bottomLeftInnerRadX > 0 && bottomLeftInnerRadY
            ? 'rad-i-bl-' + bottomLeftInnerRadX + '-' + bottomLeftInnerRadY
            : '',
        ]"
        :style="{
          backgroundColor: color,
          width:
            'calc(var(--lcars-unit) * ' +
            leftWidth +
            ' + var(--lcars-unit) * ' +
            bottomLeftInnerRadX +
            ')',
          height: 'calc(var(--lcars-unit) * ' + bottomHeight + ' + var(--lcars-unit))',
        }"
      ></div>
      <slot name="bottom"></slot>
      <div
        class="lcars-el bottom lcars-h-unit"
        :class="{ fill: fillWidth }"
        :style="{ backgroundColor: color }"
      ></div>
      <div
        class="lcars-el"
        :class="
          'rad-br-' +
          bottomRightOuterRadX +
          '-' +
          bottomRightOuterRadY +
          ' rad-i-br-' +
          bottomRightInnerRadX +
          '-' +
          bottomRightInnerRadY
        "
        :style="{
          backgroundColor: color,
          width:
            'calc(var(--lcars-unit) * ' +
            rightWidth +
            ' + var(--lcars-unit) * ' +
            bottomRightInnerRadX +
            ')',
          height: 'calc(var(--lcars-unit) * ' + bottomHeight + ' + var(--lcars-unit))',
        }"
      ></div>
    </div>
  </div>
</template>
