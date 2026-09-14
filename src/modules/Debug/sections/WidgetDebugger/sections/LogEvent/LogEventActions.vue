<template>
  <div class="flex items-center gap-1">
    <ElPopover
      trigger="click"
      popper-class="log-event-popover-code"
      width="50vw"
    >
      <template #reference>
        <span class="text-primary-light-3 bg-primary-light-8 inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded text-xs">
          &lbrace;...&rbrace;
        </span>
      </template>
      <pre class="font-mono text-xs leading-tight">{{ event }}</pre>
    </ElPopover>

    <ElPopover
      v-if="isWidgetSettings"
      trigger="click"
      popper-class="log-event-popover"
      width="300px"
    >
      <template #reference>
        <GearIcon class="hover:fill-primary-light-2 h-4 w-4 cursor-pointer fill-primary transition-all" />
      </template>
      <Widget
        v-if="widget && oldWidget"
        :widget="widget"
        :old-widget="oldWidget"
      />
    </ElPopover>

    <ElPopover
      v-if="hasMessages"
      trigger="click"
      popper-class="log-event-popover"
      width="200px"
    >
      <template #reference>
        <DialogBubblesIcon
          class="h-4 w-4 cursor-pointer transition-all"
          :class="{
            'hover:fill-primary-light-2 fill-primary': status,
            'fill-red-500 hover:fill-red-400': !status,
          }"
        />
      </template>
      <div class="_text-s-regular">
        {{ getMessages(event) }}
      </div>
    </ElPopover>

    <ElPopover
      v-if="hasCreatives"
      popper-class="log-event-popover"
    >
      <template #reference>
        <CreativeIcon class="hover:fill-primary-light-2 h-4 w-4 cursor-pointer fill-primary transition-all" />
      </template>
      <div class="space-y-2">
        <div
          v-for="item in getCreatives(event)"
          :key="item.slug"
          class="border-gray-300 border-b pb-2 last:border-b-0 last:pb-0"
        >
          <a
            :href="`https://www.uplify.${isProduction ? 'us' : 'live'}/backend/resources/ads/${item.id}`"
            target="_blank"
            class="hover:text-primary-light-3 whitespace-nowrap text-primary"
          >
            <span class="inline-block max-w-[200px] truncate">
              ({{ item.slug || 'without slug' }})
            </span>
          </a>
        </div>
        <span
          class="hover:text-primary-light-3 active:text-primary-dark cursor-pointer text-primary"
          @click="copyLinkToCreatives(event)"
        >
          Copy preview link
        </span>
      </div>
    </ElPopover>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { ILogEvent } from '@/core/types'
import { LogEvents } from '@/core/types'
import { ElPopover } from '@/components/element-plus'
import type { IDebugWidget } from '@/modules/Debug/types'

import Widget from '../Widget/Widget.vue'

import CreativeIcon from '@/assets/img/icons/creative.svg'
import DialogBubblesIcon from '@/assets/img/icons/dialog-bubbles.svg'
import GearIcon from '@/assets/img/icons/gear.svg'

const props = defineProps<{
  event: ILogEvent
}>()

const status = computed(() => 'status' in props.event.payload ? props.event.payload.status : false)
const widget = computed(() => props.event.payload as IDebugWidget)
const oldWidget = computed(() => 'oldWidget' in props.event ? props.event.oldWidget : null)

const isWidgetSettings = computed(() => props.event.event === LogEvents.UPDATE_WIDGET)
const isFetchedCreatives = computed(() =>
	props.event.event === LogEvents.FETCHED_CREATIVES || props.event.event === LogEvents.FETCHED_REFERRAL_CREATIVES,
)
const hasCreatives = computed(() => isFetchedCreatives.value && getCreatives(props.event).length > 0)
const hasMessages = computed(() =>
	props.event.payload
		&& typeof props.event.payload === 'object'
		&& 'messages' in props.event.payload,
)

const isProduction = computed(() => import.meta.env.BUILD_ENV === 'production')

function getMessages (event: ILogEvent) {
	if ('reason' in event.payload) return event.payload.reason
	if ('messages' in event.payload) return event.payload.messages?.map(item => item.text).join(', ')
	return ''
}

function getCreatives (event: ILogEvent) {
	if ('data' in event.payload) return event.payload.data || []
	return []
}

function copyLinkToCreatives (event: ILogEvent) {
	const creativesSlugs = getCreatives(event).map(item => item.slug)
	const url = new URL(window.location.origin + '/creative-preview')
	url.searchParams.append('creatives', creativesSlugs.join(','))
	url.searchParams.append('streamer', '')
	navigator.clipboard.writeText(url.href)
}
</script>

<style>
.log-event-popover {
  padding: 10px;
}

.log-event-popover-code {
  width: 50vw;
  max-height: 90vh;
  padding: 8px 10px;
  overflow: auto;
}
</style>
