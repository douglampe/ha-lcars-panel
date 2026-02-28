<script setup lang="ts">
import { computed, onMounted } from 'vue'
import type { HAConfig } from './HAConfig'
import { loadMixins, loadVariables } from './HAConfig'
import RecursiveComponent from './components/RecursiveComponent.vue'
import testConfig from '@/assets/config/demo.yaml?raw'
import YAML from 'yaml'
import { loadTestState } from './HAState'

const { config, loadTest } = defineProps<{ config: HAConfig; loadTest: boolean }>()

let testConfigParsed: any

if (loadTest) {
  testConfigParsed = YAML.parse(testConfig)
  loadMixins(testConfigParsed)
  loadTestState()
}

const children = computed(() => {
  const localConfig = testConfigParsed ?? config
  return localConfig.children
})

const isHacs = computed(() => {
  const scripts = document.querySelectorAll('script')

  scripts.forEach((script) => {
    if (script.src.indexOf('ha-lcars-panel.js?hacstag=') !== -1) {
      return true
    }
  })
  return false
})

function addCssLink(href: string) {
  console.log('Adding CSS link:', href)
  let file = document.createElement('link')
  file.rel = 'stylesheet'
  const cssRoot =
    testConfigParsed?.cssRoot ??
    config.cssRoot ??
    (isHacs.value ? '/hacsfiles/ha-lcars-panel/' : '/local')
  file.href = `${cssRoot}${href}`
  document.head.appendChild(file)
}

onMounted(() => {
  loadVariables(testConfigParsed ?? config)
  if (process.env.VITE_ENVIRONMENT === 'production') {
    addCssLink('ha-lcars-panel.css')
  }
})
</script>

<template>
  <div class="lcars-wrapper">
    <RecursiveComponent :children="children" />
  </div>
</template>

<style lang="sass">
@use './styles/colors'
@use './styles/main'
@use './styles/table'

.lcars-wrapper
  background-color: var(--lcars-color-bg)
  color: var(--lcars-color-text)
  font-family: Antonio, "Arial", monospace
  font-size: var(--lcars-font-size)
  line-height: calc(var(--lcars-font-size) * 1.2)
  text-transform: var(--lcars-text-transform)

  & pre,
  & code
    margin: 0
    text-transform: none
    background-color: var(--lcars-color-code)

  & a
    color: var(--lcars-color-text)
</style>
