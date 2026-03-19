<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import type { ConfigItem } from '@/ConfigItem'
import { ref, useAttrs } from 'vue'
import ParentComponent from './ParentComponent.vue'
import LCARSPill from './LCARSPill.vue'
import LCARSElement from './LCARSElement.vue'

defineOptions({
  inheritAttrs: false,
})

const visible = ref(false)
const attrs = useAttrs()

const { children } = defineProps<{
  children?: ConfigItem[]
}>()
</script>

<template>
  <div @click="visible = true" style="cursor: pointer">
    <LCARSPill v-bind="attrs">{{ attrs.text }}</LCARSPill>
  </div>
  <div
    v-if="visible"
    @click.self="visible = false"
    style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
    "
  >
    <div
      style="
        position: absolute;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "
    >
      <div style="position: relative">
        <ParentComponent v-if="children" :children="children" />
        <slot></slot>
        <LCARSElement alignContent="middle-center">
          <div @click="visible = false" style="cursor: pointer">
            <LCARSPill>Close</LCARSPill>
          </div>
        </LCARSElement>
      </div>
    </div>
  </div>
</template>
