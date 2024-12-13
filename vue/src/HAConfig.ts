import { ref } from 'vue'

const defaultConfig = {
  menuItems: [
    {
      index: '01',
      title: 'Cartography',
      color: 'var(--color-chestnut-rose)',
      items: [
        {
          type: 'HorizontalPanel',
          props: { color: 'var(--color-neon-carrot)' },
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
                {
                  type: 'LCARSColumn',
                  children: [
                    {
                      type: 'VerticalScale',
                      props: {
                        color: 'var(--color-periwinkle)',
                        bgColor: 'var(--color-neon-carrot)',
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
    { index: '02', title: 'Navigation', color: 'var(--color-neon-carrot)' },
    {
      index: '03',
      title: 'Sensors',
      color: 'var(--color-periwinkle)',
      items: [
        {
          type: 'LCARSColumn',
          children: [{ type: 'HAStateView' }],
        },
      ],
    },
    { index: '04', title: 'Communication', color: 'var(--color-dodger-blue)' },
    { index: '05', title: 'Engineering', color: 'var(--color-lilac)' },
    { index: '06', title: 'Holodeck', color: 'var(--color-periwinkle)' },
    { index: '07', title: 'Medical', color: 'var(--color-dodger-blue)' },
  ],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const haConfig = ref(import.meta.env.DEV ? defaultConfig : ({} as any))
