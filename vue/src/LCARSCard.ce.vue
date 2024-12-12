<script setup lang="ts">
import { ref } from 'vue'

import type { MenuItem } from './MenuItem'
import LCARSMenuPanel from './components/LCARSMenuPanel.vue'
import RecursiveComponent from './components/RecursiveComponent.vue'

const { config, hass } = defineProps({
  config: {
    type: Object,
    default() {
      return {
        menuItems: [
          {
            index: '01',
            title: 'Cartography',
            color: 'var(--color-chestnut-rose)',
            items: [
              {
                type: 'LCARSColumn',
                children: [
                  {
                    type: 'HorizontalPanel',
                    props: { color: 'var(--color-neon-carrot)' },
                    children: [
                      {
                        type: 'HorizontalScale',
                        props: {
                          cols: 3,
                          bgColor: 'var(--color-neon-carrot)',
                          color: 'var(--color-anakiwa)',
                          title: 'Azimuth',
                          entity: 'sun.sun',
                          attribute: 'azimuth',
                          min: 0,
                          max: 360,
                          tickInterval: 45,
                          minorTickInterval: 5,
                          decimalPlaces: 1,
                        },
                      },
                    ],
                  },
                ],
              },
              {
                type: 'LCARSColumn',
                children: [
                  {
                    type: 'VerticalPanel',
                    props: {
                      hollow: true,
                      rotated: true,
                      color: 'var(--color-red-alert)',
                      class: 'lcars-u-2-plus',
                    },
                    children: [
                      {
                        type: 'VerticalScale',
                        props: {
                          color: 'var(--color-periwinkle)',
                          bgColor: 'var(--color-red-alert)',
                          title: 'Elevation',
                          entity: 'sun.sun',
                          attribute: 'elevation',
                          min: -180,
                          max: 180,
                          tickInterval: 45,
                          minorTickInterval: 5,
                          decimalPlaces: 1,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          { index: '02', title: 'Navigation', color: 'var(--color-neon-carrot)' },
          { index: '03', title: 'Sensors', color: 'var(--color-periwinkle)' },
          { index: '04', title: 'Communication', color: 'var(--color-dodger-blue)' },
          { index: '05', title: 'Engineering', color: 'var(--color-lilac)' },
          { index: '06', title: 'Holodeck', color: 'var(--color-periwinkle)' },
          { index: '07', title: 'Medical', color: 'var(--color-dodger-blue)' },
        ],
      }
    },
  },
  hass: {
    type: Object,
    default() {
      return {
        states: {
          'sun.sun': {
            entity_id: 'sun.sun',
            state: 'below_horizon',
            attributes: {
              next_dawn: '2024-12-12T11:42:38.177020+00:00',
              next_dusk: '2024-12-11T22:55:34.369372+00:00',
              next_midnight: '2024-12-12T05:19:17+00:00',
              next_noon: '2024-12-12T17:18:57+00:00',
              next_rising: '2024-12-12T12:09:01.800111+00:00',
              next_setting: '2024-12-12T22:29:29.027793+00:00',
              elevation: -1.63,
              azimuth: 244.56,
              rising: false,
              friendly_name: 'Sun',
            },
            context: {
              id: '01JEVXQSG1GWXGNE95K5HTBTK7',
              parent_id: null,
              user_id: null,
            },
            last_changed: '2024-12-11T22:34:22.081Z',
            last_updated: '2024-12-11T22:34:22.081Z',
          },
        },
      }
    },
  },
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reactiveMenuItem = ref({} as any)

function onSelect(item: MenuItem) {
  reactiveMenuItem.value = item
}
</script>

<template>
  <div class="lcars-card lcars-wrapper">
    <div class="lcars-row fill">
      <LCARSMenuPanel :items="config.menuItems" @select="onSelect">
        <RecursiveComponent :hass="hass" :items="reactiveMenuItem.items" />
      </LCARSMenuPanel>
    </div>
  </div>
</template>

<style lang="sass">
@use './styles/main'
</style>
