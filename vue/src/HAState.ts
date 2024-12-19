import { ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const haState = ref({} as any)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getStateValue(state: any, entity: string, attribute: string = 'state') {
  if (!state.states) {
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entityObject: any = state.states[entity]

  if (!entityObject?.attributes) {
    return
  }

  return entityObject.attributes[attribute]
}

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
      'weather.forecast_home': {
        entity_id: 'weather.forecast_home',
        state: 'cloudy',
        attributes: {
          temperature: 71,
          dew_point: 66,
          temperature_unit: '°F',
          humidity: 82,
          cloud_coverage: 87.5,
          uv_index: 3.8,
          pressure: 30.11,
          pressure_unit: 'inHg',
          wind_bearing: 59.6,
          wind_speed: 3.6,
          wind_speed_unit: 'mph',
          visibility_unit: 'mi',
          precipitation_unit: 'in',
          attribution:
            'Weather forecast from met.no, delivered by the Norwegian Meteorological Institute.',
          friendly_name: 'Forecast Home',
          supported_features: 3,
        },
        context: {
          id: '01JFG0KECHT4MWRP4K8VR3VFFR',
          parent_id: null,
          user_id: null,
        },
        last_changed: '2024-12-19T17:49:14.001Z',
        last_updated: '2024-12-19T17:49:14.001Z',
      },
    },
  }
}
