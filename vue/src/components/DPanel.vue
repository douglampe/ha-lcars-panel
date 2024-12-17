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
    <div class="lcars-row">
      <div
        v-if="topCap"
        class="lcars-el"
        :class="'l-cap-' + topHeight * 5"
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
        class="lcars-el"
        :class="[
          'rad-tr-' + topOuterRadX + '-' + topOuterRadY,
          'rad-i-tr-' + topInnerRadX + '-' + topInnerRadY,
        ]"
        :style="{
          backgroundColor: color,
          width:
            'calc(var(--lcars-unit) * ' +
            rightWidth +
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
    </div>
    <div class="lcars-row right" :class="{ fill: fillHeight }">
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
        v-if="bottomCap"
        class="lcars-el bottom l-cap"
        :class="'l-cap-' + topHeight * 5"
        :style="{
          backgroundColor: color,
          height: 'calc(var(--lcars-unit) * ' + bottomHeight + ')',
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
          bottomOuterRadX +
          '-' +
          bottomOuterRadY +
          ' rad-i-br-' +
          bottomInnerRadX +
          '-' +
          bottomInnerRadY
        "
        :style="{
          backgroundColor: color,
          width:
            'calc(var(--lcars-unit) * ' +
            rightWidth +
            ' + var(--lcars-unit) * ' +
            bottomInnerRadX +
            ')',
          height: 'calc(var(--lcars-unit) * ' + bottomHeight + ' + var(--lcars-unit))',
        }"
      ></div>
    </div>
  </div>
</template>
