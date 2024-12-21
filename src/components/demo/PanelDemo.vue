<script setup lang="ts">
import SevenPanel from '../SevenPanel.vue'
import CPanel from '../CPanel.vue'
import DPanel from '../DPanel.vue'
import LPanel from '../LPanel.vue'
import PPanel from '../PPanel.vue'
import JPanel from '../JPanel.vue'
import OPanel from '../OPanel.vue'
</script>
<template>
  <div class="lcars-wmax">
    <h1>Panels</h1>
    <h2>C and D Panels</h2>
    <p>
      CPanels and DPanels are panels with borders shaped (somewhat) like the letters C and D
      respectively.
    </p>
    <div class="lcars-wmax lcars-margin-bottom-10">
      <CPanel
        class="lcars-w-4 lcars-h-4"
        :fill-width="true"
        :fill-height="true"
        title="Title"
        :top-cap="true"
        :bottom-cap="true"
      >
        <template #top
          ><div class="lcars-h-unit lcars-golden-tanoi-bg lcars-black-color centered">
            Top
          </div></template
        >
        <template #left
          ><div class="lars-w-1 lcars-golden-tanoi-bg lcars-black-color centered">
            Left
          </div></template
        >
        <template #bottom
          ><div
            class="lcars-el lcars-h-unit bottom lcars-golden-tanoi-bg lcars-black-color centered"
          >
            Bottom
          </div></template
        >
        <div class="centered">CPanel<br />Content</div>
      </CPanel>
    </div>
    <div class="lcars-wmax">
      <DPanel
        class="lcars-w-4 lcars-h-4"
        :fill-width="true"
        :fill-height="true"
        title="Title"
        :top-cap="true"
        :bottom-cap="true"
      >
        <template #top
          ><div class="lcars-h-unit lcars-golden-tanoi-bg lcars-black-color centered">
            Top
          </div></template
        >
        <template #right
          ><div class="lcars-w-1 lcars-golden-tanoi-bg lcars-black-color centered fill">
            Right
          </div></template
        >
        <template #bottom
          ><div
            class="lcars-el lcars-h-unit bottom lcars-golden-tanoi-bg lcars-black-color centered"
          >
            Bottom
          </div></template
        >
        <div class="centered">DPanel<br />Content</div>
      </DPanel>
    </div>
    <h2>P, 7, L, and J Panels</h2>
    <p>
      PPanels, SevenPanel, LPanels, and JPanels are panels with borders shaped (somewhat) like the
      letters/numbers P, 7, L, and J respectively. In other words, the "elbows" of the panels are as
      follows:
    </p>
    <ul>
      <li>P - Top-Left</li>
      <li>7 - Top-Right</li>
      <li>L - Bottom-Left</li>
      <li>J - Bottom-Right</li>
    </ul>
  </div>
  <div class="lcars-wmax lcars-margin-bottom-10">
    <PPanel
      class="lcars-w-4 lcars-h-4"
      :fill-width="true"
      :fill-height="true"
      title="Title"
      :top-cap="true"
      :bottom-cap="true"
    >
      <template #top
        ><div class="lcars-h-unit lcars-golden-tanoi-bg lcars-black-color centered">
          Top
        </div></template
      >
      <template #left
        ><div class="lars-w-1 lcars-golden-tanoi-bg lcars-black-color centered">Left</div></template
      >

      <div class="centered">PPanel<br />Content</div>
    </PPanel>
  </div>
  <div class="lcars-wmax lcars-margin-bottom-10">
    <LPanel
      class="lcars-w-4 lcars-h-4"
      :fill-width="true"
      :fill-height="true"
      title="Title"
      :top-cap="true"
      :bottom-cap="true"
    >
      <template #left>
        <div
          class="lcars-el lcars-wmax lcars-h-unit lcars-golden-tanoi-bg lcars-black-color bottom centered"
        >
          Left
        </div>
      </template>
      <template #bottom
        ><div class="lcars-el lcars-h-unit bottom lcars-golden-tanoi-bg lcars-black-color centered">
          Bottom
        </div>
      </template>

      <div class="centered">LPanel<br />Content</div>
    </LPanel>
  </div>
  <div class="lcars-wmax lcars-margin-bottom-10">
    <SevenPanel
      class="lcars-w-4 lcars-h-4"
      :fill-width="true"
      :fill-height="true"
      title="Title"
      :top-cap="true"
      :bottom-cap="true"
    >
      <template #top
        ><div class="lcars-h-unit lcars-golden-tanoi-bg lcars-black-color centered">
          Top
        </div></template
      >
      <template #right
        ><div
          class="lcars-el lcars-wmax lcars-h-unit lcars-golden-tanoi-bg lcars-black-color bottom centered"
        >
          Right
        </div></template
      >

      <div class="centered">SevenPanel<br />Content</div>
    </SevenPanel>
  </div>
  <div class="lcars-wmax lcars-margin-bottom-10">
    <JPanel
      class="lcars-w-4 lcars-h-4"
      :fill-width="true"
      :fill-height="true"
      title="Title"
      :top-cap="true"
      :bottom-cap="true"
    >
      <template #right
        ><div
          class="lcars-el lcars-wmax lcars-h-unit lcars-golden-tanoi-bg lcars-black-color bottom centered"
        >
          Right
        </div></template
      >
      <template #bottom
        ><div class="lcars-el bottom lcars-h-unit lcars-golden-tanoi-bg lcars-black-color centered">
          Bottom
        </div></template
      >

      <div class="centered">JPanel<br />Content</div>
    </JPanel>
  </div>
  <h2>O Panel</h2>
  <p>The OPanel has 4 corners (or "elbows")</p>
  <div class="lcars-wmax lcars-margin-bottom-10">
    <OPanel class="lcars-w-4 lcars-h-4" :fill-width="true" :fill-height="true" title="Title">
      <template #top>
        <div class="lcars-el lcars-h-unit lcars-golden-tanoi-bg lcars-black-color centered">
          Top
        </div>
      </template>

      <template #left
        ><div
          class="lcars-el lcars-wmax lcars-h-unit lcars-golden-tanoi-bg lcars-black-color bottom centered"
        >
          Left
        </div></template
      >

      <div class="centered">OPanel<br />Content</div>

      <template #right
        ><div
          class="lcars-el lcars-wmax lcars-h-unit lcars-golden-tanoi-bg lcars-black-color bottom centered"
        >
          Right
        </div></template
      >
      <template #bottom
        ><div class="lcars-el bottom lcars-h-unit lcars-golden-tanoi-bg lcars-black-color centered">
          Bottom
        </div></template
      >
    </OPanel>
  </div>
  <div>
    <OPanel
      class="lcars-w-4 lcars-h-4"
      color="var(--lcars-color-eggplant)"
      :fill-width="true"
      :fill-height="true"
      left-color="var(--lcars-color-eggplant)"
      right-color="var(--lcars-color-eggplant)"
    ></OPanel>
  </div>
</template>
