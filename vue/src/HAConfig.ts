import { ref } from 'vue'

const defaultConfig = {
  vars: {
    lcars_unit: '3vw',
  },
  children: [
    {
      type: 'LCARSMenuPanel',
      showForNav: '/home',
      leftChildren: [
        {
          type: 'NumberedMenuItem',
          nav: '/cartography',
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
    {
      showForNav: '/cartography',
      props: {
        class: 'lcars-col',
      },
      children: [
        {
          type: 'LPanel',
          props: {
            fillWidth: true,
            fillHeight: true,
            color: 'var(--lcars-color-dodger-blue)',
            leftColor: 'var(--lcars-color-dodger-blue)',
            bottomHeight: 0.5,
            bottomOuterRadX: 3,
            bottomInnerRadX: 2,
            bottomInnerRadY: 1,
            class: 'lcars-margin-bottom-3',
          },
          leftChildren: [
            {
              nav: '/home',
              props: {
                class: 'lcars-el button lcars-lilac-bg lcars-h-1 relative lcars-margin-bottom-1',
              },
              children: [
                {
                  text: 'LCARS 23295',
                  class: 'lcars-black-color bottom-right',
                },
              ],
            },
            {
              text: '01-23564',
              props: {
                class: 'lcars-el lcars-dodger-blue-bg lcars-h-1 lcars-pad-4 lcars-black-color',
                style: 'text-align: right',
              },
            },
          ],
          bottomChildren: [
            {
              props: {
                class:
                  'lcars-el lcars-golden-tanoi-bg bottom lcars-margin-left-1 lcars-margin-right-1',
                style: 'height: calc(var(--lcars-unit) * .5);width: calc(var(--lcars-unit) * .75);',
              },
            },
            {
              props: {
                class: 'lcars-el lcars-lilac-bg lcars-w-1-plus bottom lcars-margin-right-1',
                style: 'height: calc(var(--lcars-unit) * .5);',
              },
            },
            {
              props: {
                class: 'lcars-el lcars-lilac-bg lcars-w-3 bottom lcars-margin-right-1',
                style: 'height: calc(var(--lcars-unit) * .5);',
              },
            },
            {
              props: {
                class: 'lcars-el lcars-indian-red-bg lcars-w-1 bottom lcars-margin-right-1',
                style: 'height: calc(var(--lcars-unit) * .5);',
              },
            },
          ],
        },
        {
          type: 'PPanel',
          props: {
            fillWidth: true,
            fillHeight: true,
            color: 'var(--lcars-color-indian-red)',
            leftColor: 'var(--lcars-color-indian-red)',
            topHeight: 0.5,
            topOuterRadX: 3,
            topInnerRadX: 2,
            topInnerRadY: 1,
          },
          topChildren: [
            {
              props: {
                class: 'lcars-el lcars-golden-tanoi-bg lcars-margin-left-1 lcars-margin-right-1',
                style: 'height: calc(var(--lcars-unit) * .5);width: calc(var(--lcars-unit) * .75);',
              },
            },
            {
              props: {
                class: 'lcars-el lcars-atomic-tangerine-bg lcars-w-1-plus lcars-margin-right-1',
                style: 'height: calc(var(--lcars-unit) * .25);',
              },
            },
            {
              props: {
                class: 'lcars-el lcars-lilac-bg lcars-w-3 lcars-margin-right-1',
                style: 'height: calc(var(--lcars-unit) * .5);',
              },
            },
            {
              props: {
                class: 'lcars-el lcars-indian-red-bg lcars-w-1 lcars-margin-right-1',
                style: 'height: calc(var(--lcars-unit) * .5);',
              },
            },
          ],
          leftChildren: [
            {
              props: {
                class: 'lcars-el lcars-indian-red-bg lcars-h-unit relative lcars-margin-bottom-1',
              },
              children: [
                {
                  text: '02-24156',
                  class: 'lcars-black-color bottom-right',
                },
              ],
            },
            {
              props: {
                class: 'lcars-el lcars-indian-red-bg lcars-h-1-plus relative lcars-margin-bottom-1',
              },
              children: [
                {
                  text: '03-41248',
                  class: 'lcars-black-color bottom-right',
                },
              ],
            },
            {
              props: {
                class: 'lcars-el lcars-golden-tanoi-bg lcars-h-unit relative lcars-margin-bottom-1',
              },
              children: [
                {
                  text: '04-14702',
                  class: 'lcars-black-color bottom-right',
                },
              ],
            },
            {
              props: {
                class:
                  'lcars-el lcars-atomic-tangerine-bg lcars-h-1-plus relative lcars-margin-bottom-1',
              },
              children: [
                {
                  text: '05-32456',
                  class: 'lcars-black-color bottom-right',
                },
              ],
            },
          ],
          children: [
            {
              props: { class: 'lcars-row' },
              children: [
                {
                  props: {
                    class: 'lcars-col lcars-margin-left-10',
                  },
                  children: [
                    {
                      text: 'Sun',
                      props: {
                        class: 'lcars-golden-tanoi-color lcars-font-10 lcars-margin-bottom-5',
                      },
                    },
                    {
                      type: 'EntityAttributeList',
                      props: {
                        entity: 'sun.sun',
                        scanning: true,
                        class: 'lcars-lilac-color',
                      },
                    },
                  ],
                },
                {
                  tag: 'img',
                  props: {
                    src: '/img/sun.webp',
                    class: 'lcars-margin-left-10',
                    style: 'width: calc(var(--lcars-unit) * 10)',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const haConfig = ref({} as any)

if (import.meta.env.DEV) {
  loadDefault()
}

export function setVariable(key: string, value: string) {
  const formattedKey = `--${key.replace('_', '-')}`
  document.documentElement?.style.setProperty(formattedKey, value)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function loadConfig(config: any) {
  haConfig.value = config

  loadVariables()
}

export function loadVariables() {
  if (haConfig.value?.vars) {
    Object.entries(haConfig.value?.vars).forEach(([key, value]) => {
      setVariable(key, value as string)
    })
  }
}

export function loadDefault() {
  loadConfig(defaultConfig)
}
