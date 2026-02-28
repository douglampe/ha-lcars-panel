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

function getCssRoot() {
  const scripts = document.querySelectorAll('script')

  scripts.forEach((script) => {
    const index = script.src.indexOf('ha-lcars-panel.js')
    if (index > -1) {
      return script.src.substring(0, index)
    }
  })
  return false
}

function addCssLink(href: string) {
  let file = document.createElement('link')
  file.rel = 'stylesheet'
  file.href = `${getCssRoot()}${href}`
  document.head.appendChild(file)
}

onMounted(() => {
  loadVariables(testConfigParsed ?? config)
  const cssRoot = getCssRoot()
  if (cssRoot) {
    addCssLink(`${cssRoot}ha-lcars-panel.css`)
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
