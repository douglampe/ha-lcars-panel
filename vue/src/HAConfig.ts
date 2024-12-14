import { ref } from 'vue'

const defaultConfig = {
  menuItems: [
    {
      index: '01',
      title: 'Cartography',
      color: 'var(--lcars-color-chestnut-rose)',
      items: [
        {
          type: 'HorizontalPanel',
          props: { color: 'var(--lcars-color-neon-carrot)' },
          children: [
            {
              type: 'LCARSRow',
              children: [
                {
                  type: 'LCARSColumn',
                  children: [
                    {
                      type: 'HorizontalScale',
                      props: {
                        cols: 3,
                        bgColor: 'var(--lcars-color-neon-carrot)',
                        color: 'var(--lcars-color-anakiwa)',
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
                {
                  type: 'LCARSColumn',
                  children: [
                    {
                      type: 'VerticalScale',
                      props: {
                        color: 'var(--lcars-color-periwinkle)',
                        bgColor: 'var(--lcars-color-neon-carrot)',
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
      ],
    },
    { index: '02', title: 'Navigation', color: 'var(--lcars-color-neon-carrot)' },
    {
      index: '03',
      title: 'Sensors',
      color: 'var(--lcars-color-periwinkle)',
      items: [
        {
          type: 'LCARSColumn',
          children: [{ type: 'HAStateView' }],
        },
      ],
    },
    { index: '04', title: 'Communication', color: 'var(--lcars-color-dodger-blue)' },
    { index: '05', title: 'Engineering', color: 'var(--lcars-color-lilac)' },
    { index: '06', title: 'Holodeck', color: 'var(--lcars-color-periwinkle)' },
    { index: '07', title: 'Medical', color: 'var(--lcars-color-dodger-blue)' },
  ],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const haConfig = ref(import.meta.env.DEV ? defaultConfig : ({} as any))

export function loadDefault() {
  haConfig.value = defaultConfig
}

export function showDemo(demo: { main: string; sub?: string; fullScreen?: boolean }) {
  haConfig.value.demo = demo
}

export function isDemoVisible() {
  return typeof haConfig.value.demo != undefined && haConfig.value.demo?.main !== 'none'
}
