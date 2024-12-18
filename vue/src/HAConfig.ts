import { ref } from 'vue'

const defaultConfig = {
  children: [
    {
      type: 'LCARSMenuPanel',
      showForNav: '/home',
      leftChildren: [
        {
          type: 'NumberedMenuItem',
          nav: '/home/cartography',
          props: {
            index: '01',
            title: 'Cartography',
            color: 'var(--lcars-color-chestnut-rose)',
          },
        },
        {
          type: 'NumberedMenuItem',
          nav: '/home/navigation',
          props: {
            index: '02',
            title: 'Navigation',
            color: 'var(--lcars-color-neon-carrot)',
          },
        },
        {
          type: 'NumberedMenuItem',
          nav: '/home/sensors',
          props: {
            index: '03',
            title: 'Sensors',
            color: 'var(--lcars-color-periwinkle)',
          },
        },
        {
          type: 'NumberedMenuItem',
          nav: '/demo/layouts',
          props: { index: '04', title: 'Communication', color: 'var(--lcars-color-dodger-blue)' },
        },
        {
          type: 'NumberedMenuItem',
          props: { index: '05', title: 'Engineering', color: 'var(--lcars-color-lilac)' },
        },
        {
          type: 'NumberedMenuItem',
          props: { index: '06', title: 'Holodeck', color: 'var(--lcars-color-periwinkle)' },
        },
        {
          type: 'NumberedMenuItem',
          props: { index: '07', title: 'Medical', color: 'var(--lcars-color-dodger-blue)' },
        },
      ],
      children: [
        {
          type: 'HorizontalPanel',
          showForNav: '/home/cartography',
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
        {
          type: 'OPanel',
          showForNav: '/home/navigation',
          props: {
            fillWidth: true,
            fillHeight: true,
            class: 'lcars-w-5 lcars-h-4',
          },
          children: [
            {
              type: 'HAStateValue',
              props: {
                entity: 'sun.sun',
                attribute: 'azimuth',
              },
            },
          ],
        },
        {
          type: 'LCARSColumn',
          showForNav: '/home/sensors',
          children: [{ type: 'HAStateView' }],
        },
      ],
    },
    {
      showForNav: '/demo',
      props: {
        class: 'lcars-wrapper',
      },
      children: [
        {
          props: {
            class: 'lcars-row',
          },
          children: [
            {
              text: 'Layout',
              nav: '/demo/layout',
              props: {
                class:
                  'lcars-el rad-1 button lcars-w-1 lcars-h-unit lcars-neon-carrot-bg lcars-black-color centered lcars-pad-3 lcars-font-6',
              },
            },
            {
              text: 'Panels',
              nav: '/demo/panels',
              props: {
                class:
                  'lcars-el rad-1 button lcars-w-1 lcars-h-unit lcars-neon-carrot-bg lcars-black-color centered lcars-pad-3 lcars-font-6',
              },
            },
            {
              text: 'Elements',
              nav: '/demo/elements',
              props: {
                class:
                  'lcars-el rad-1 button lcars-w-1 lcars-h-unit lcars-neon-carrot-bg lcars-black-color centered lcars-pad-3 lcars-font-6',
              },
            },
            {
              text: 'Text',
              nav: '/demo/text',
              props: {
                class:
                  'lcars-el rad-1 button lcars-w-1 lcars-h-unit lcars-neon-carrot-bg lcars-black-color centered lcars-pad-3 lcars-font-6',
              },
            },
            {
              text: 'Replica',
              nav: '/demo/replica',
              props: {
                class:
                  'lcars-el rad-1 button lcars-w-1 lcars-h-unit lcars-neon-carrot-bg lcars-black-color centered lcars-pad-3 lcars-font-6',
              },
            },
            {
              text: 'Exit',
              nav: '/home',
              props: {
                class:
                  'lcars-el rad-1 button lcars-w-1 lcars-h-unit lcars-neon-carrot-bg lcars-black-color centered lcars-pad-3 lcars-font-6',
              },
            },
          ],
        },
        {
          children: [
            {
              type: 'LayoutsDemo',
              showForNav: '/demo/layout',
              props: { title: 'Layout' },
            },
            {
              type: 'PanelDemo',
              showForNav: '/demo/panels',
              props: { title: 'Panels' },
            },
            {
              type: 'ElementDemo',
              showForNav: '/demo/elements',
              props: { title: 'Elements' },
            },
            {
              type: 'TextDemo',
              showForNav: '/demo/text',
              props: { title: 'Text' },
            },
            {
              type: 'ReplicaDemo',
              showForNav: '/demo/replica',
              props: { title: 'Replica' },
            },
          ],
        },
      ],
    },
  ],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const haConfig = ref(import.meta.env.DEV ? defaultConfig : ({} as any))

export function loadDefault() {
  haConfig.value = defaultConfig
}
