<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { components } from '@/ComponentRegistry'
import { currentNav } from '@/LocalNav'
import { applyMixin, applyOrientationClass, applyState, type ConfigItem } from '@/ConfigItem'
import { computed, onMounted, reactive, ref, useAttrs, watch } from 'vue'
import { removeUndefined } from '@/Layout'
import { applyTemplates, haState } from '@/HAState'
import HTMLComponent from './HTMLComponent.vue'
import ParentComponent from './ParentComponent.vue'
import LoadingComponent from './LoadingComponent.vue'
import LCARSMarkdown from './LCARSMarkdown.vue'
import { applyStepAnimation, type AnimationConfig } from '@/AnimationConfig'
import TextComponent from './TextComponent.vue'

const props = useAttrs()

const processedProps = ref<ConfigItem>()
const renderKey = ref(0)
const isVisible = ref(false)
const animated = reactive<{
  top?: number
  bottom?: number
  left?: number
  right?: number
  children?: number
}>({
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  children: 0,
})

defineOptions({
  inheritAttrs: false,
})

function onStateUpdated() {
  if (props.stateMap || Object.keys(props).some((key) => key.endsWith('_template'))) {
    const processedItem = { ...processedProps.value } as ConfigItem

    if (applyState(processedItem) || applyTemplates(processedItem)) {
      processedProps.value = processedItem
      // renderKey.value++
    }
  }
}

function processItem(item: ConfigItem) {
  const processedItem = { ...item }

  removeUndefined(processedItem)

  applyMixin(processedItem)

  applyState(processedItem)

  applyTemplates(processedItem)

  applyOrientationClass(processedItem)

  if (processedItem.tag) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { showForNav, stateMap, children, mixin, ...rest } = processedItem
    return { ...rest }
  }

  if (
    processedItem.children &&
    !processedItem.type?.endsWith('-container') &&
    processedItem.type !== 'modal'
  ) {
    delete processedItem.children
  }

  renderKey.value++

  return processedItem
}

function getComponentType(cmps: Record<string, any>) {
  if (!cmps) {
    return LoadingComponent
  }

  if (props.type) {
    const cmpType = cmps[props.type as any as string]
    if (cmpType) {
      return cmpType
    }
  }

  return props.tag ? HTMLComponent : 'div'
}

function checkVisibility() {
  if (!components) {
    setVisibility(false)
    return
  }
  if (!processedProps.value?.showForNav) {
    setVisibility(true)
    return
  }
  if (currentNav.value === '/') {
    setVisibility(processedProps.value?.showForNav === '/')
  } else {
    setVisibility(currentNav.value?.startsWith(processedProps.value?.showForNav))
  }
}

function setVisibility(visible: boolean) {
  if (isVisible.value != visible) {
    isVisible.value = visible
    if (visible) {
      triggerAnimations()
    }
  }
}

function triggerAnimations() {
  const config = (props as ConfigItem).config
  if (config?.disableAnimations) {
    return
  }
  if (props.children) {
    const children = props.children as ConfigItem[]
    if (props.childrenAnimation) {
      const animation = props.childrenAnimation as AnimationConfig
      if (animation.type === 'build') {
        applyStepAnimation(animation, animated, 'children', children.length)
      }
    } else {
      animated.children = children.length
    }
  }
  if (props.topChildren) {
    const topChildren = props.topChildren as ConfigItem[]
    if (props.topChildrenAnimation) {
      const animation = props.topChildrenAnimation as AnimationConfig
      if (animation.type === 'build') {
        applyStepAnimation(animation, animated, 'top', topChildren.length)
      }
    } else {
      animated.top = topChildren.length
    }
  }
  if (props.bottomChildren) {
    const bottomChildren = props.bottomChildren as ConfigItem[]
    if (props.bottomChildrenAnimation) {
      const animation = props.bottomChildrenAnimation as AnimationConfig
      if (animation.type === 'build') {
        applyStepAnimation(animation, animated, 'bottom', bottomChildren.length)
      }
    } else {
      animated.bottom = bottomChildren.length
    }
  }
  if (props.leftChildren) {
    const leftChildren = props.leftChildren as ConfigItem[]
    if (props.leftChildrenAnimation) {
      const animation = props.leftChildrenAnimation as AnimationConfig
      if (animation.type === 'build') {
        applyStepAnimation(animation, animated, 'left', leftChildren.length)
      }
    } else {
      animated.left = leftChildren.length
    }
  }
  if (props.rightChildren) {
    const rightChildren = props.rightChildren as ConfigItem[]
    if (props.rightChildrenAnimation) {
      const animation = props.rightChildrenAnimation as AnimationConfig
      if (animation.type === 'build') {
        applyStepAnimation(animation, animated, 'right', rightChildren.length)
      }
    } else {
      animated.right = rightChildren.length
    }
  }
}

const visibleTopChildren = computed(() => {
  if (props.topChildren) {
    return (props.topChildren as any).slice(0, animated.top)
  }
  return undefined
})

const visibleBottomChildren = computed(() => {
  if (props.bottomChildren) {
    return (props.bottomChildren as any).slice(0, animated.bottom)
  }
  return undefined
})

const visibleLeftChildren = computed(() => {
  if (props.leftChildren) {
    return (props.leftChildren as any).slice(0, animated.left)
  }
  return undefined
})

const visibleRightChildren = computed(() => {
  if (props.rightChildren) {
    return (props.rightChildren as any).slice(0, animated.right)
  }
  return undefined
})

const visibleChildren = computed(() => {
  if (props.children) {
    return (props.children as any).slice(0, animated.children)
  }
  return undefined
})

if (!(props as ConfigItem).config?.disableWatchers) {
  watch(
    () => haState.value,
    () => {
      onStateUpdated()
    },
    { deep: true },
  )

  watch(
    () => currentNav.value,
    () => {
      checkVisibility()
      onStateUpdated()
    },
    { deep: true },
  )
}

onMounted(() => {
  if (props.type === 'menu-vertical') {
    console.log(props)
  }
  if (!processedProps.value) {
    processedProps.value = processItem(props as ConfigItem)
  }

  checkVisibility()
})
</script>

<template>
  <component
    v-if="isVisible"
    :is="getComponentType(components)"
    v-bind="processedProps"
    :key="renderKey"
    :style="processedProps?.style ?? {}"
    :class="processedProps?.class ?? []"
  >
    <TextComponent
      v-if="processedProps?.text"
      :text="processedProps.text"
      :textAnimation="processedProps.textAnimation"
    />
    <LCARSMarkdown v-if="processedProps?.md" :content="processedProps.md" />
    <a v-if="props.showForNav" :name="props.showForNav"></a>
    <template #left v-if="visibleLeftChildren">
      <ParentComponent
        :children="visibleLeftChildren as Array<ConfigItem>"
        :config="(props as ConfigItem).config ?? ({} as any)"
      />
    </template>
    <template #top v-if="visibleTopChildren">
      <ParentComponent
        :children="visibleTopChildren as Array<ConfigItem>"
        :config="(props as ConfigItem).config ?? ({} as any)"
      />
    </template>
    <template #bottom v-if="visibleBottomChildren">
      <ParentComponent
        :children="visibleBottomChildren as Array<ConfigItem>"
        :config="(props as ConfigItem).config ?? ({} as any)"
      />
    </template>
    <template #right v-if="visibleRightChildren">
      <ParentComponent
        :children="visibleRightChildren as Array<ConfigItem>"
        :config="(props as ConfigItem).config ?? ({} as any)"
      />
    </template>
    <ParentComponent
      v-if="visibleChildren"
      :children="visibleChildren as Array<ConfigItem>"
      :config="(props as ConfigItem).config ?? ({} as any)"
    />
  </component>
</template>
