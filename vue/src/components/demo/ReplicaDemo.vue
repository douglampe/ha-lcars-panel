<script setup lang="ts">
import { computed } from 'vue'
import { haConfig, setVariable } from '@/HAConfig'
import CPanel from '../CPanel.vue'
import DPanel from '../DPanel.vue'
import PPanel from '../PPanel.vue'
import OPanel from '../OPanel.vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootStyle: any = computed(() => {
  if (haConfig.value.showLayout) {
    return {
      backgroundImage: 'url("/img/sample.jpg")',
      backgroundPositionY: '-67px',
    }
  }
  return {}
})

function setLayoutVisible(visible: boolean) {
  haConfig.value.showLayout = visible
  setVariable('--global-outline', visible ? 'solid' : 'none')
}
</script>

<template>
  <div class="lcars-row lcars-wmax" :style="rootStyle">
    <DPanel
      :top-outer-rad-x="1"
      :top-outer-rad-y="3"
      :top-height="6"
      :right-width="1"
      :color="haConfig.showLayout ? 'transparent' : 'var(--lcars-color-mule-fawn)'"
      :right-color="haConfig.showLayout ? 'transparent' : 'var(--lcars-color-mule-fawn)'"
    >
      <template #top>
        <div
          :class="{ 'lcars-mule-fawn-bg': !haConfig.showLayout }"
          class="lcars-h-3"
          style="
            width: calc(var(--lcars-unit) * 4.3);
            margin-left: calc(var(--lcars-unit) * 4);
            margin-right: -40px;
            transform: skew(25deg);
            border-top-left-radius: calc(var(--lcars-unit) * 2);
            border-bottom-left-radius: var(--lcars-unit);
          "
        ></div>
        <div
          :class="{ 'lcars-mule-fawn-bg': !haConfig.showLayout }"
          class="lcars-h-3 relative lcars-margin-right-5"
          style="width: calc(var(--lcars-unit) * 5.3)"
        >
          <p class="lcars-black-color lcars-font-2 bold bottom-right">Course Select</p>
        </div>
        <div
          :class="{ 'lcars-cowboy-bg': !haConfig.showLayout }"
          class="lcars-w-0-half lcars-h-3 relative lcars-margin-right-5"
        >
          <p class="lcars-black-color lcars-font-2 bold bottom-right">524</p>
        </div>
        <div
          :class="{ 'lcars-cowboy-bg': !haConfig.showLayout }"
          class="lcars-h-3 relative lcars-margin-right-5"
          style="width: calc(var(--lcars-unit) * 4.15)"
        >
          <p class="lcars-black-color lcars-font-2 bold bottom-right">Navigational</p>
        </div>
        <div
          :class="{ 'lcars-paarl-bg': !haConfig.showLayout }"
          class="lcars-h-3 relative lcars-margin-right-5"
          style="width: calc(var(--lcars-unit) * 8.62)"
        >
          <p class="lcars-black-color lcars-font-2 bold bottom-right">Flight Control</p>
        </div>
        <div
          :class="{ 'lcars-mule-fawn-bg': !haConfig.showLayout }"
          class="lcars-h-3 relative lcars-margin-right-5"
          style="width: calc(var(--lcars-unit) * 2.45)"
        >
          <p class="lcars-black-color lcars-font-2 bold bottom-right">837</p>
        </div>
        <div
          :class="{ 'lcars-mule-fawn-bg': !haConfig.showLayout }"
          class="lcars-w-1 lcars-h-3"
        ></div>
      </template>

      <template #right>
        <div
          :class="{ 'lcars-mule-fawn-bg': !haConfig.showLayout }"
          class="lcars-el lcars-w-unit lcars-h-3-plus lcars-margin-bottom-6"
        ></div>
        <div
          :class="{ 'lcars-mule-fawn-bg': !haConfig.showLayout }"
          class="lcars-el lcars-w-unit fill"
        ></div>
      </template>

      <div class="lcars-row">
        <div class="lcars-col">
          <div class="lcars-row lcars-margin-bottom-7">
            <div
              :class="{ 'lcars-mountbatten-pink-bg': !haConfig.showLayout }"
              class="lcars-el r-cap-5 lcars-w-1 lcars-h-unit lcars-font-3 lcars-black-color lcars-margin-right-5 lcars-pad-4"
              style="padding-top: calc(var(--lcars-gap) * 1.5) !important"
            >
              AV BRK
            </div>
            <div
              :class="{ 'lcars-eggplant-bg': !haConfig.showLayout }"
              class="lcars-el rad-5 lcars-h-unit lcars-font-3 lcars-black-color lcars-pad-4"
              style="width: calc(var(--lcars-unit) * 2.5)"
            >
              30 391
            </div>
          </div>
          <div class="lcars-row">
            <div
              :class="{ 'lcars-mule-fawn-bg': !haConfig.showLayout }"
              class="lcars-el r-cap-5 lcars-w-1 lcars-h-unit lcars-font-3 lcars-black-color lcars-margin-right-5 lcars-pad-4"
              style="padding-top: calc(var(--lcars-gap) * 1.5) !important"
            >
              TE FAB
            </div>
            <div
              :class="{ 'lcars-cowboy-bg': !haConfig.showLayout }"
              class="lcars-el rad-5 lcars-h-unit lcars-font-3 lcars-black-color lcars-pad-4"
              style="width: calc(var(--lcars-unit) * 2.5)"
            >
              NO BES
            </div>
          </div>
          <div class="lcars-row" style="height: calc(var(--lcars-unit) * 1.8)"></div>
          <div class="lcars-row lcars-margin-bottom-7">
            <div
              :class="{ 'lcars-mule-fawn-bg': !haConfig.showLayout }"
              class="lcars-el r-cap-5 lcars-w-1 lcars-h-unit lcars-font-3 lcars-black-color lcars-margin-right-5 lcars-pad-4"
              style="padding-top: calc(var(--lcars-gap) * 1.5) !important"
            >
              AR Sensor
            </div>
            <div
              :class="{ 'lcars-fiery-orange-bg': !haConfig.showLayout }"
              class="lcars-el rad-5 lcars-h-unit lcars-font-3 lcars-black-color lcars-pad-4"
              style="width: calc(var(--lcars-unit) * 2.5)"
            >
              DI OVE
            </div>
          </div>
          <div class="lcars-row lcars-margin-bottom-7">
            <div
              :class="{ 'lcars-smoky-bg': !haConfig.showLayout }"
              class="lcars-el r-cap-5 lcars-w-1 lcars-h-unit lcars-font-3 lcars-black-color lcars-margin-right-5 lcars-pad-4"
              style="padding-top: calc(var(--lcars-gap) * 1.5) !important"
            >
              SB ELF
            </div>
            <div
              :class="{ 'lcars-fierly-orange-bg': !haConfig.showLayout }"
              class="lcars-el rad-5 lcars-h-unit lcars-font-3 lcars-black-color lcars-pad-4"
              style="width: calc(var(--lcars-unit) * 2.5)"
            >
              JE FLE
            </div>
          </div>
          <div class="lcars-row lcars-margin-bottom-7">
            <div
              :class="{ 'lcars-eggplant-bg': !haConfig.showLayout }"
              class="lcars-el r-cap-5 lcars-w-1 lcars-h-unit lcars-font-3 lcars-black-color lcars-margin-right-5 lcars-pad-4"
              style="padding-top: calc(var(--lcars-gap) * 1.5) !important"
            >
              RE AUB
            </div>
            <div class="lcars-el lcars-h-unit" style="width: calc(var(--lcars-unit) * 2.5)"></div>
          </div>
          <div class="lcars-row lcars-margin-bottom-7">
            <div
              :class="{ 'lcars-mule-fawn-bg': !haConfig.showLayout }"
              class="lcars-el r-cap-5 lcars-w-1 lcars-h-unit lcars-font-3 lcars-black-color lcars-margin-right-5 lcars-pad-4"
              style="padding-top: calc(var(--lcars-gap) * 1.5) !important"
            >
              PF MLG
            </div>
            <div
              :class="{ 'lcars-paarl-bg': !haConfig.showLayout }"
              class="lcars-el rad-5 lcars-h-unit lcars-font-3 lcars-black-color lcars-pad-4"
              style="width: calc(var(--lcars-unit) * 2.5)"
            >
              AB FOX
            </div>
          </div>
          <div class="lcars-row right lcars-margin-bottom-7">
            <div
              :class="{ 'lcars-paarl-bg': !haConfig.showLayout }"
              class="lcars-el rad-5 lcars-h-unit lcars-font-3 lcars-black-color lcars-pad-4"
              style="width: calc(var(--lcars-unit) * 2.5)"
            >
              BA TRB
            </div>
          </div>
          <div class="lcars-row lcars-margin-bottom-7">
            <div
              :class="{ 'lcars-cowboy-bg': !haConfig.showLayout }"
              class="lcars-el r-cap-5 lcars-w-1 lcars-h-unit lcars-font-3 lcars-black-color lcars-margin-right-5 lcars-pad-4"
              style="padding-top: calc(var(--lcars-gap) * 1.5) !important"
            >
              IG MCE
            </div>
            <div
              :class="{ 'lcars-fiery-orange-bg': !haConfig.showLayout }"
              class="lcars-el rad-5 lcars-h-unit lcars-font-3 lcars-black-color lcars-pad-4"
              style="width: calc(var(--lcars-unit) * 2.5)"
            >
              CD MEM
            </div>
          </div>
          <div class="lcars-row lcars-margin-bottom-7">
            <div
              :class="{ 'lcars-cowboy-bg': !haConfig.showLayout }"
              class="lcars-el r-cap-5 lcars-w-1 lcars-h-unit lcars-font-3 lcars-black-color lcars-margin-right-5 lcars-pad-4"
              style="padding-top: calc(var(--lcars-gap) * 1.5) !important"
            >
              BE EOH
            </div>
            <div class="lcars-el lcars-h-unit" style="width: calc(var(--lcars-unit) * 2.5)"></div>
          </div>
          <div class="lcars-row lcars-margin-bottom-7">
            <div
              :class="{ 'lcars-eggplant-bg': !haConfig.showLayout }"
              class="lcars-el r-cap-5 lcars-w-1 lcars-h-unit lcars-font-3 lcars-black-color lcars-margin-right-5 lcars-pad-4"
              style="padding-top: calc(var(--lcars-gap) * 1.5) !important"
            >
              BA SHA
            </div>
            <div class="lcars-el lcars-h-unit" style="width: calc(var(--lcars-unit) * 2.5)"></div>
          </div>
          <div class="lcars-row lcars-margin-bottom-7">
            <div
              :class="{ 'lcars-paarl-bg': !haConfig.showLayout }"
              class="lcars-el r-cap-5 lcars-w-1 lcars-h-unit lcars-font-3 lcars-black-color lcars-margin-right-5 lcars-pad-4"
              style="padding-top: calc(var(--lcars-gap) * 1.5) !important"
            >
              LD FAT
            </div>
            <div
              :class="{ 'lcars-smoky-bg': !haConfig.showLayout }"
              class="lcars-el rad-5 lcars-h-unit lcars-font-3 lcars-black-color lcars-pad-4"
              style="width: calc(var(--lcars-unit) * 2.5)"
            >
              BA TRO
            </div>
          </div>
          <div class="lcars-row lcars-margin-bottom-7">
            <div
              :class="{ 'lcars-paarl-bg': !haConfig.showLayout }"
              class="lcars-el r-cap-5 lcars-w-1 lcars-h-unit lcars-font-3 lcars-black-color lcars-margin-right-5 lcars-pad-4"
              style="padding-top: calc(var(--lcars-gap) * 1.5) !important"
            >
              KE HCC
            </div>
            <div
              :class="{ 'lcars-eggplant-bg': !haConfig.showLayout }"
              class="lcars-el rad-5 lcars-h-unit lcars-font-3 lcars-black-color lcars-pad-4"
              style="width: calc(var(--lcars-unit) * 2.5)"
            >
              CD GEN
            </div>
          </div>
        </div>
        <div class="lcars-col lcars-w-unit"></div>
      </div>

      <template #bottom>
        <div class="lcars-el fill"></div>
        <div
          :class="{ 'lcars-mule-fawn-bg': !haConfig.showLayout }"
          class="lcars-el bottom lcars-h-unit"
          style="width: calc(var(--lcars-unit) * 1); margin-right: -10px; transform: skew(25deg)"
        ></div>
        <div
          :class="{ 'lcars-mule-fawn-bg': !haConfig.showLayout }"
          class="lcars-el bottom lcars-w-4-minus lcars-h-unit lcars-font-3 lcars-black-color relative lcars-margin-right-3"
          style="text-align: right"
        >
          <p class="lcars-black-color lcars-font-2 bold bottom-right">2435</p>
        </div>
        <div
          :class="{ 'lcars-cowboy-bg': !haConfig.showLayout }"
          class="lcars-el bottom lcars-h-unit lcars-w-1 lcars-margin-right-3 rlative"
        >
          <p class="lcars-black-color lcars-font-2 bold absolute-bottom centered">8785</p>
        </div>
        <div
          :class="{ 'lcars-mule-fawn-bg': !haConfig.showLayout }"
          class="lcars-el bottom lcars-w-1 lcars-h-unit"
        >
          <p class="lcars-black-color lcars-font-2 bold bottom-left">3453</p>
        </div>
      </template>
    </DPanel>

    <div class="lcars-w-unit"></div>

    <div class="lcars-col">
      <CPanel
        :top-outer-rad-x="2"
        :top-outer-rad-y="3"
        :top-inner-rad-x="3"
        :top-inner-rad-y="2"
        :top-height="6"
        :bottom-inner-rad-x="0"
        :bottom-inner-rad-y="0"
        :bottom-outer-rad-x="0"
        :bottom-outer-rad-y="0"
        :bottom-height="1"
        :left-width="2"
        color="var(--lcars-color-mule-fawn)"
        left-color="var(--lcars-color-mule-fawn)"
        class="lcars-margin-bottom-4"
      >
        <template #top>
          <div
            :class="{ 'lcars-mule-fawn-bg': !haConfig.showLayout }"
            class="lcars-h-3 relative lcars-margin-right-7"
            style="width: calc(var(--lcars-unit) * 5.5)"
          >
            <p class="lcars-black-color lcars-font-2 bold bottom-right">Warp Drive Systems</p>
          </div>
          <div
            :class="{ 'lcars-fiery-orange-bg': !haConfig.showLayout }"
            class="lcars-w-1-plus lcars-h-3 relative lcars-margin-right-9"
          >
            <p class="lcars-black-color lcars-font-2 bold bottom-right">Impulse</p>
          </div>
          <div
            :class="{ 'lcars-smoky-bg': !haConfig.showLayout }"
            class="lcars-h-3 relative lcars-margin-right-8"
            style="width: calc(var(--lcars-unit) * 3.5)"
          >
            <p class="lcars-black-color lcars-font-2 bold bottom-right">Warp Factor</p>
          </div>
          <div class="lcars-row">
            <div
              :class="{ 'lcars-mule-fawn-bg': !haConfig.showLayout }"
              class="lcars-h-3 relative"
              style="width: calc(var(--lcars-unit) * 6.3)"
            >
              <p class="lcars-black-color lcars-font-2 bold bottom-left">Emergency Override</p>
            </div>
            <div
              :class="{ 'lcars-mule-fawn-bg': !haConfig.showLayout }"
              class="lcars-h-3"
              style="
                width: calc(var(--lcars-unit) * 4);
                margin-left: -40px;
                transform: skew(-25deg);
                border-top-right-radius: calc(var(--lcars-unit) * 2);
                border-bottom-right-radius: var(--lcars-unit);
              "
            ></div>
          </div>
        </template>

        <template #left>
          <div
            :class="{ 'lcars-mule-fawn-bg': !haConfig.showLayout }"
            class="lcars-el lcars-w-1-minus lcars-h-3-minus"
          ></div>
          <div
            :class="{ 'lcars-mule-fawn-bg': !haConfig.showLayout }"
            class="lcars-black-color lcars-font-2 bold centered lcars-margin-bottom-7"
          >
            8453
          </div>
          <div
            :class="{ 'lcars-mule-fawn-bg': !haConfig.showLayout }"
            class="cars-el lcars-w-1-minus lcars-h-1-minus"
          >
            <p class="lcars-black-color lcars-font-2 bold centered">1728</p>
          </div>
        </template>

        <PPanel
          color="var(--lcars-color-mule-fawn)"
          left-color="var(--lcars-color-mule-fawn)"
          :top-height="1"
          :left-width="2"
          style="z-index: 2; margin-left: calc(var(--lcars-unit) * 2); margin-top: -27.5px"
        >
          <template #left>
            <div class="lcars-col">
              <div
                :class="{ 'lcars-mule-fawn-bg': !haConfig.showLayout }"
                class="lcars-el lcars-w-1-minus lcars-h-1 lcars-margin-bottom-6"
              ></div>
              <div
                :class="{ 'lcars-fiery-orange-bg': !haConfig.showLayout }"
                class="lcars-el lcars-w-1-minus lcars-h-1"
              ></div>
            </div>
          </template>

          <template #top>
            <div
              :class="{ 'lcars-mule-fawn-bg': !haConfig.showLayout }"
              class="lcars-el lcars-h-unit lcars-margin-bottom-6 lcars-margin-right-6"
              style="width: calc(var(--lcars-unit) * 8.2)"
            ></div>
            <div
              :class="{ 'lcars-paarl-bg': !haConfig.showLayout }"
              class="clars-el lcars-margin-right-6"
              style="
                width: calc(var(--lcars-unit) * 3.5);
                height: calc(var(--lcars-unit) * 1.5);
                margin-top: -12px;
              "
            ></div>
            <div
              :class="{ 'lcars-cowboy-bg': !haConfig.showLayout }"
              class="lcars-el lcars-w-2 lcars-h-unit lcars-margin-bottom-6"
            ></div>
            <div
              :class="{ 'lcars-cowboy-bg': !haConfig.showLayout }"
              class="lcars-el lcars-h-unit"
              style="
                width: calc(var(--lcars-unit) * 1);
                margin-left: -10px;
                transform: skew(-25deg);
              "
            ></div>
          </template>

          <OPanel
            color="var(--lcars-color-eggplant)"
            :fill-width="true"
            :left-width="1"
            :bottom-height="2"
            left-color="var(--lcars-color-eggplant)"
            right-color="var(--lcars-color-eggplant)"
            style="
              margin-left: calc(var(--lcars-unit) * 2);
              transform: scale(50%) translate(-50%, -50%);
            "
          >
            <template #left>
              <div
                class="lcars-el lcars-eggplant-bg lcars-w-unit lcars-h-1 lcars-margin-bottom-2"
              ></div>
              <div
                class="lcars-el lcars-eggplant-bg lcars-w-unit lcars-h-1 lcars-margin-bottom-2"
              ></div>
              <div class="lcars-el lcars-eggplant-bg lcars-w-unit lcars-h-1"></div>
            </template>

            <template #bottom>
              <div class="lcars-el lcars-eggplant-bg lcars-w-unit lcars-h-1 bottom"></div>
              <div class="lcars-el lcars-font-20 lcars-eggplant-color lcars-margin-top-20">
                00800
              </div>
              <div class="lcars-el lcars-eggplant-bg lcars-w-2 lcars-h-1 bottom"></div>
            </template>
          </OPanel>
        </PPanel>

        <template #bottom>
          <div
            :class="{ 'lcars-mule-fawn-bg': !haConfig.showLayout }"
            class="lcars-el bottom lcars-w-4-plus lcars-margin-right-6"
            style="height: calc(var(--lcars-gap) * 2)"
          ></div>
          <div
            :class="{ 'lcars-cowboy-bg': !haConfig.showLayout }"
            class="lcars-el bottom lcars-w-1-minus lcars-margin-right-6"
            style="height: calc(var(--lcars-gap) * 2)"
          ></div>
          <div
            :class="{ 'lcars-cowboy-bg': !haConfig.showLayout }"
            class="lcars-el bottom lcars-w-1-plus"
            style="height: calc(var(--lcars-gap) * 2)"
          ></div>
          <div
            :class="{ 'lcars-cowboy-bg': !haConfig.showLayout }"
            class="lcars-el bottom"
            style="
              width: calc(var(--lcars-unit) * 1);
              height: calc(var(--lcars-gap) * 2);
              margin-left: -10px;
              transform: skew(-25deg);
            "
          ></div>
        </template>
      </CPanel>

      <CPanel
        :top-outer-rad-x="0"
        :top-outer-rad-y="0"
        :top-inner-rad-x="0"
        :top-inner-rad-y="0"
        :top-height="0.5"
        :bottom-inner-rad-x="2"
        :bottom-inner-rad-y="1"
        :bottom-outer-rad-x="2"
        :bottom-outer-rad-y="1"
        :bottom-height="0.5"
        :left-width="2"
        :fill-height="true"
        color="var(--lcars-color-mule-fawn)"
      >
        <template #top>
          <div
            :class="{ 'lcars-mule-fawn-bg': !haConfig.showLayout }"
            class="lcars-el lcars-w-4-plus lcars-margin-right-6"
            style="height: calc(var(--lcars-gap) * 2)"
          ></div>
          <div
            :class="{ 'lcars-cowboy-bg': !haConfig.showLayout }"
            class="lcars-el lcars-w-1-minus lcars-margin-right-6"
            style="height: calc(var(--lcars-gap) * 2)"
          ></div>
          <div
            :class="{ 'lcars-cowboy-bg': !haConfig.showLayout }"
            class="lcars-el"
            style="width: calc(var(--lcars-unit) * 3.7); height: calc(var(--lcars-gap) * 2)"
          ></div>
          <div
            :class="{ 'lcars-cowboy-bg': !haConfig.showLayout }"
            class="lcars-el"
            style="
              width: calc(var(--lcars-unit) * 1);
              height: calc(var(--lcars-gap) * 2);
              margin-left: -10px;
              transform: skew(-25deg);
            "
          ></div>
        </template>

        <template #left>
          <div
            :class="{ 'lcars-mule-fawn-bg': !haConfig.showLayout }"
            class="lcars-el lcars-w-1-minus lcars-h-1"
          ></div>
        </template>
        <div class="clars-row lcars-h-unit"></div>
        <div class="lcars-row">
          <div class="lcars-w-1 lcars-h-unit"></div>
          <div
            :class="{ 'lcars-smoky-bg': !haConfig.showLayout }"
            class="lcars-el rad-5 lcars-h-unit lcars-font-3 lcars-black-color lcars-pad-4 lcars-margin-left-2 lcars-margin-right-5"
            style="width: calc(var(--lcars-unit) * 2.5)"
          >
            ED C00
          </div>
          <div
            :class="{ 'lcars-smoky-bg': !haConfig.showLayout }"
            class="lcars-el l-cap-5 lcars-w-1 lcars-h-unit lcars-font-3 lcars-black-color lcars-margin-right-5 lcars-pad-4"
            style="padding-top: calc(var(--lcars-gap) * 1.5) !important; text-align: right"
          >
            TI RDL
          </div>
          <div
            :class="{ 'lcars-eggplant-bg': !haConfig.showLayout }"
            class="lcars-el lcars-h-unit lcars-margin-right-3"
            style="width: calc(var(--lcars-unit) * 0.5)"
          ></div>
          <div class="lcars-el lcars-font-12 lcars-eggplant-color lcars-margin-right-3">30</div>
          <div
            :class="{ 'lcars-eggplant-bg': !haConfig.showLayout }"
            class="lcars-el lcars-w-1-minus lcars-h-unit lcars-font-3 lcars-black-color lcars-margin-right-5 lcars-pad-4"
            style="padding-top: calc(var(--lcars-gap) * 1.5) !important; text-align: right"
          >
            CB CEW
          </div>
          <div
            :class="{ 'lcars-smoky-bg': !haConfig.showLayout }"
            class="lcars-el lcars-w-1-minus lcars-h-unit lcars-font-3 lcars-black-color lcars-margin-right-5 lcars-pad-4"
            style="padding-top: calc(var(--lcars-gap) * 1.5) !important; text-align: right"
          >
            54835
          </div>
          <div
            :class="{ 'lcars-eggplant-bg': !haConfig.showLayout }"
            class="lcars-el lcars-h-unit lcars-margin-right-3"
            style="width: calc(var(--lcars-unit) * 0.4)"
          ></div>
        </div>

        <template #bottom>
          <div
            :class="{ 'lcars-mule-fawn-bg': !haConfig.showLayout }"
            class="lcars-el bottom"
            style="width: calc(var(--lcars-unit) * 16); height: calc(var(--lcars-unit) * 0.5)"
          ></div>
          <div
            :class="{ 'lcars-mule-fawn-bg': !haConfig.showLayout }"
            class="lcars-el bottom"
            style="
              width: calc(var(--lcars-unit) * 1);
              height: calc(var(--lcars-unit) * 0.5);
              margin-left: -10px;
              transform: skew(-25deg);
            "
          ></div>
        </template>
      </CPanel>
    </div>
  </div>
  <div
    class="lcars-el lcars-w-2 lcars-h-unit button centered lcars-black-color lcars-golden-tanoi-bg rad-1"
    @click="setLayoutVisible(!haConfig.showLayout)"
  >
    <span v-if="haConfig.showLayout">Hide</span><span v-else>Show</span> Layout
  </div>
</template>
