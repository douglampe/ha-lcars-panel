import testConfig from '@/assets/config/test.yaml?raw'
import { haConfig } from '@/HAConfig'
import YAML from 'yaml'

export function loadTestConfig() {
  haConfig.value = YAML.parse(testConfig)
}
