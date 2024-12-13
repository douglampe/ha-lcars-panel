import { ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const haState = ref({} as any)

export function loadTestState() {
  haState.value = {
    states: {
      'person.doug': {
        entity_id: 'person.doug',
        state: 'unknown',
        attributes: {
          editable: true,
          id: 'doug',
          device_trackers: [],
          user_id: '123',
          friendly_name: 'Doug',
        },
      },
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
}
