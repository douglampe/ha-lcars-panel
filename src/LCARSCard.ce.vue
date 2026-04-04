<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { HAConfig } from './HAConfig'
import { haConfig, loadConfig } from './HAConfig'
import testConfig from '@/assets/config/welcome.yaml?raw'
import YAML from 'yaml'
import ParentComponent from './components/ParentComponent.vue'
import { loadTestState } from './HAState'
import ConfigEditor from './components/ConfigEditor.vue'

const { config, loadTest } = defineProps<{ config: HAConfig; loadTest: boolean }>()
const cardRef = ref()

function getTestConfig() {
  if (loadTest) {
    const testConfigParsed = YAML.parse(testConfig)
    loadConfig(testConfigParsed)
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
  const file = document.createElement('link')
  file.rel = 'stylesheet'
  file.href = href
  document.head.appendChild(file)
}

onMounted(async () => {
  if (loadTest && config.children.length === 0) {
    haConfig.value = getTestConfig()
    const ha = document.createElement('home-assistant') as any
    ha.connected = true
    ha.connection = { connected: true }
  }
  const cssRoot = getCssRoot()
  if (cssRoot) {
    addCssLink(`${cssRoot}ha-lcars-panel.css`)
  }

  const header = document.querySelector('div.header')
  if (header) {
    cardRef.value.style.paddingTop = `${header.clientHeight}px`
    cardRef.value.style.minHeight = `${cardRef.value.clientHeight - header.clientHeight}px`
  }
})
</script>

<template>
  <div class="lcars-height-wrapper" ref="cardRef">
    <div class="lcars-wrapper">
      <ParentComponent :children="haConfig.children" />
      <ConfigEditor v-if="haConfig.editorEnabled" />
    </div>
  </div>
</template>

<style lang="sass">
@use './styles/colors'
@use './styles/main'
@use './styles/table'

.lcars-height-wrapper
  background-color: var(--lcars-color-bg)
  color: var(--lcars-color-text)
  font-family: Antonio, "Arial", monospace
  font-size: var(--lcars-font-size)
  line-height: calc(var(--lcars-font-size) * 1.2)
  text-transform: var(--lcars-text-transform)
  min-height: 100vh
  display: flex
  flex-direction: row
  align-items: stretch

  & pre,
  & code
    margin: 0
    text-transform: none
    background-color: var(--lcars-color-code)

  & a
    color: var(--lcars-color-text)

  & h1, h2, h3, h4, h5
    color: var(--lcars-color-1)

.lcars-wrapper
  display: flex
  flex-direction: column
  align-items: stretch
  flex: 1

@media all and (orientation: landscape)
  .lcars-portrait-only
    display: none

@media all and (orientation: portrait)
  .lcars-landscape-only
    display: none
</style>
