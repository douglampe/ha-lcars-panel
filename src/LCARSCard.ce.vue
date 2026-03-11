<script setup lang="ts">
import { onMounted } from 'vue'
import type { HAConfig } from './HAConfig'
import { haConfig, loadMixins } from './HAConfig'
import testConfig from '@/assets/config/demo.yaml?raw'
import YAML from 'yaml'
import { loadTestState } from './HAState'
import ParentComponent from './components/ParentComponent.vue'

const { config, loadTest } = defineProps<{ config: HAConfig; loadTest: boolean }>()

function getTestConfig() {
  if (loadTest) {
    const testConfigParsed = YAML.parse(testConfig)
    loadMixins(testConfigParsed)
    loadTestState()
    return testConfigParsed
  }
}

function getCssRoot() {
  const scripts = document.querySelectorAll('script')

  let cssRoot: string | undefined = undefined

  scripts.forEach((script) => {
    const index = script.src.indexOf('ha-lcars-panel.js')
    if (index > -1) {
      cssRoot = script.src.substring(0, index)
      return false
    }
  })
  return cssRoot
}

function addCssLink(href: string) {
  let file = document.createElement('link')
  file.rel = 'stylesheet'
  file.href = href
  document.head.appendChild(file)
}

onMounted(async () => {
  if (loadTest && config.children.length === 0) {
    haConfig.value = getTestConfig()
  }
  const cssRoot = getCssRoot()
  if (cssRoot) {
    addCssLink(`${cssRoot}ha-lcars-panel.css`)
  }
})
</script>

<template>
  <div class="lcars-wrapper">
    <ParentComponent :children="haConfig.children" />
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

@media all and (orientation: landscape)
  .lcars-portrait-only
    display: none

@media all and (orientation: portrait)
  .lcars-landscape-only
    display: none
</style>
