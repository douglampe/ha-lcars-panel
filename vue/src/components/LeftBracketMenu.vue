<script setup lang="ts">
import type { MenuItem } from '../MenuItem'
import NumberedMenuItem from './NumberedMenuItem.vue'
import { haConfig } from '../HAConfig'

const exitItem: MenuItem = {
  index: '99',
  icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>exit-to-app</title><path fill="currentColor" d="M19,3H5C3.89,3 3,3.89 3,5V9H5V5H19V19H5V15H3V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M10.08,15.58L11.5,17L16.5,12L11.5,7L10.08,8.41L12.67,11H3V13H12.67L10.08,15.58Z" /></svg>',
  title: 'Transporter',
  color: 'var(--color-neon-carrot)',
  href: '/',
}

defineEmits<{
  (e: 'select', item: MenuItem): void
}>()
</script>

<template>
  <div class="lcars-column">
    <!-- TOP BRACKETS -->
    <div class="lcars-row">
      <div class="lcars-bar bar horizontal" style="width: 2vw"></div>
      <div class="lcars-u-2-plus lcars-elbow right-bottom"></div>
    </div>
    <div class="lcars-row">
      <div class="lcars-u-1 half"></div>
      <div class="lcars-u-2 lcars-elbow right-bottom square-outer lcars-gray-bg"></div>
    </div>
    <!-- /TOP BRACKETS -->
    <!-- MENU ITEMS -->
    <NumberedMenuItem
      v-for="item in haConfig.menuItems"
      :key="item.index"
      v-bind="item"
      @select="$emit('select', item)"
    />
    <NumberedMenuItem v-bind="exitItem" />
    <!-- /MENU ITEMS -->
    <!-- BOTTOM BRACKETS -->
    <div class="lcars-row">
      <div class="lcars-u-1 half"></div>
      <div class="lcars-u-2 lcars-elbow right-top square-outer lcars-gray-bg"></div>
    </div>
    <div class="lcars-row">
      <div class="lcars-bar bar horizontal bottom" style="width: 2vw"></div>
      <div class="lcars-u-2-plus lcars-elbow right-top"></div>
    </div>
    <!-- /BOTTOM BRACKETS -->
  </div>
</template>
