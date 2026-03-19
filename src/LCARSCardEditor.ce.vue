<template>
  <div class="lcars-wrapper">
    This component includes an integrated editor. To use the editor, set `editorEnabled: true` in
    the YAML config.
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
