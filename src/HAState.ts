import { ref } from 'vue'
import type { ConfigItem } from './ConfigItem'
// import { renderTemplate } from 'ha-nunjucks'

export interface HAState {
  states: Record<string, any>
  user: any
  // eslint-disable-next-line no-unused-vars
  callService: (domain: string, service: string, data?: any) => Promise<any>
  // eslint-disable-next-line no-unused-vars
  callWS: (message: any) => Promise<any>
  // eslint-disable-next-line no-unused-vars
  callApi: (method: string, path: string, data?: any) => Promise<any>
}

export const haState = ref({} as HAState)

export function getStateValue(state: any, entity: string, attribute?: string) {
  if (!state.states) {
    return
  }

  const entityObject: any = state.states[entity]

  if (!attribute) {
    return entityObject?.state
  }

  if (!entityObject?.attributes) {
    return
  }

  return entityObject.attributes[attribute]
}

export function callService(serviceName: string, data: any) {
  if (!haState.value) {
    throw new Error('State not set')
  }

  if (serviceName.indexOf('.') === -1) {
    throw new Error('Value for serviceName ust be in format domain.service')
  }

  const [domain, service] = serviceName.split('.')

  haState.value.callService(domain, service, data)
}

export function getAllStateValues() {
  if (!haState.value) {
    return [] as { entity: string; key: string; value: string }[]
  }

  const stateValues = [] as { entity: string; key: string; value: string }[]
  for (const entityId in haState.value.states) {
    pushStateValue(stateValues, entityId, 'state', haState.value.states[entityId].state)
    for (const attrKey in haState.value.states[entityId].attributes) {
      pushStateValue(
        stateValues,
        entityId,
        attrKey,
        haState.value.states[entityId].attributes[attrKey],
      )
    }
  }

  return stateValues
}

function pushStateValue(
  stateValues: { entity: string; key: string; value: string }[],
  entity: string,
  key: string,
  entityObject: any,
) {
  if (typeof entityObject === 'string') {
    stateValues.push({ entity, key, value: entityObject })
    return
  }
  for (const key in entityObject) {
    const val = entityObject[key]
    if (typeof val === 'object') {
      pushStateValue(stateValues, entity, key, val)
    } else {
      stateValues.push({ entity, key, value: val.toString() })
    }
  }
}

export function applyTemplates(_configItem: ConfigItem) {
  const applied = false
  // for (const key in configItem) {
  //   if (key.endsWith('_template')) {
  //     const valueKey = key.substring(0, key.length - 9)
  //     const oldValue = configItem[valueKey as keyof ConfigItem]
  //     const newValue = renderTemplate(haState.value as any, configItem[key as keyof ConfigItem])
  //     if (newValue !== oldValue) {
  //       configItem[valueKey as keyof ConfigItem] = newValue
  //       applied = true
  //     }
  //   }
  // }

  return applied
}

export function loadTestState() {
  haState.value = {
    callService: (domain: string, service: string, data?: any) => {
      if (domain === 'light') {
        if (service === 'turn_on') {
          haState.value.states['light.test'].attributes.brightness = data.brightness
          return Promise.resolve('OK')
        } else if (service === 'toggle') {
          haState.value.states['light.test'].state =
            haState.value.states['light.test'].state === 'on' ? 'off' : 'on'
          return Promise.resolve('OK')
        }
      }

      alert(`Service called: ${domain}.${service} with data\n${JSON.stringify(data, null, 2)}`)
      return Promise.resolve('OK')
    },
    callWS: (_message: any) => Promise.reject('Thisis a test state.'),
    callApi: (_method: string, _path: string, _data?: any) =>
      Promise.reject('Thisis a test state.'),
    user: {
      id: '758186e6a1854ee2896efbd593cb542c',
      name: 'Doug',
      is_owner: true,
      is_admin: true,
      credentials: [
        {
          auth_provider_type: 'homeassistant',
          auth_provider_id: null,
        },
      ],
    },
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
      'light.test': {
        entity_id: 'light.test',
        state: 'on',
        attributes: {
          brightness: 50,
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
      'sensor.denon_avr': {
        entity_id: 'sensor.denon_avr',
        state: 'ON',
        attributes: {
          friendly_name: 'Denon AVR',
          channel_volume: { FL: '50', FR: '50', SW: '50' },
          digital_input: 'AUTO',
          main_power: 'ON',
          max_volume: 98,
          mute: 'OFF',
          parameters: {
            DRC: 'OFF',
            LFE: '00',
            BAS: '50',
            TRE: '50',
            TONE_CTRL: 'OFF',
            CLV: '50',
            SWL: '50',
            CEN: '03',
            DIM: '03',
          },
          power: 'ON',
          sd: 'AUTO',
          sleep: 'OFF',
          source: 'SAT/CBL',
          ss_levels: {
            C: '50',
            FL: '50',
            FR: '50',
            SL: '50',
            SR: '50',
            SBL: '50',
            SBR: '50',
            SB: '50',
            FHL: '50',
            FHR: '50',
            TFL: '50',
            TFR: '50',
            TML: '50',
            TMR: '50',
            FDL: '50',
            FDR: '50',
            SDL: '50',
            SDR: '50',
            FWL: '50',
            FWR: '50',
            TRL: '50',
            TRR: '50',
            RHL: '50',
            RHR: '50',
            BDL: '50',
            BDR: '50',
            SHL: '50',
            SHR: '50',
            TS: '50',
            SW: '50',
            SW2: '50',
          },
          ss_speakers: {
            FRO: 'SMA',
            CEN: 'SMA',
            SUA: 'SMA',
            SBK: '2SP',
            FRH: 'NON',
            TFR: 'NON',
            TPM: 'NON',
            FRD: 'NON',
            SUD: 'NON',
            TPR: 'NON',
            RHE: 'NON',
            BKD: 'NON',
            SHE: 'NON',
            TPS: 'NON',
            SWF: '1SP',
          },
          standby: 'OFF',
          surround_mode: 'DOLBY AUDIO-DSUR',
          video_select: 'OFF',
          volume: 48,
        },
      },
    },
  }
}
