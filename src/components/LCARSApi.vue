<script setup lang="ts">
import LCARSElement from '@/components/LCARSElement.vue'
import LCARSMarkdown from '@/components/LCARSMarkdown.vue'
import LCARSRow from '@/components/LCARSRow.vue'
import { currentNav } from '@/LocalNav'
import { computed, useAttrs } from 'vue'
import LCARSTable from './LCARSTable.vue'
import LCARSPill from './LCARSPill.vue'
import LCARSModal from './LCARSModal.vue'
import PanelTL from './PanelTL.vue'

interface APIProperty {
  name: string
  description?: string
  category?: string
  action?: string
  modalContent?: string
  actionNav?: string
}

interface APITopic {
  topic: string
  key?: string
  content: string
  properties?: APIProperty[]
}

defineOptions({ inheritAttrs: false })

const { topics, properties } = useAttrs() as {
  topics?: Record<string, APITopic[]>
  properties?: Record<string, string>
}

const categories = computed(() => {
  if (!topics) return []
  return Object.keys(topics)
})

const topicContent = computed(() => {
  if (!topic.value) return ''

  const parts: string[] = [`# ${topic.value.topic}\n`]
  if (topic.value.key) {
    parts.push(`type: \`${topic.value.key}\`\n`)
  }
  if (topic.value.content) {
    parts.push(topic.value.content)
  }
  return parts.join('\n')
})

const topic = computed(() => {
  const parts = currentNav.value.split('/')
  if (parts.length < 3) return undefined
  const catName = parts[2]
  if (!topics) return undefined
  return topics[catName]?.find((t) => t.topic === parts[3])
})

function getTopics(category: string): APITopic[] {
  if (!topics) return []
  return topics[category] ?? []
}

function getPropertyDescription(property: APIProperty): string | undefined {
  if (!properties || !property) return undefined
  return property.description ?? properties[property.name]
}
</script>

<template>
  <LCARSRow v-for="(category, i) in categories" :key="i" :gap="1" :marginBottom="0.1">
    <LCARSElement :width="3" alignContent="middle-right">{{ category }}:</LCARSElement>
    <LCARSElement
      v-for="(t, index) in getTopics(category)"
      :key="index"
      :width="Math.floor(t.topic.length / 5) + 2"
      :height="1"
      :color="((index % 10) + 1).toString()"
      alignContent="middle-center"
      textColor="black"
      :nav="`/api/${category}/${t.topic}`"
      :button="true"
      >{{ t.topic }}</LCARSElement
    >
  </LCARSRow>
  <LCARSMarkdown :content="topicContent" :marginTop="1" />
  <LCARSTable v-if="topic?.properties">
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
    <tr v-for="(property, j) in topic.properties" :key="j">
      <td>
        <code>{{ property.name }}</code>
      </td>
      <td>
        <LCARSMarkdown :content="getPropertyDescription(property)" />
      </td>
      <td v-if="property.action">
        <LCARSModal v-if="property.modalContent" :text="property.action">
          <PanelTL :color="'golden-tainoi'" :fillWidth="true">
            <LCARSElement color="black">
              <LCARSMarkdown :content="property.modalContent" />
            </LCARSElement>
          </PanelTL>
        </LCARSModal>
        <LCARSPill :width="property.action.length / 6 + 2" :nav="property.actionNav" v-else>{{
          property.action
        }}</LCARSPill>
      </td>
    </tr>
  </LCARSTable>
</template>
