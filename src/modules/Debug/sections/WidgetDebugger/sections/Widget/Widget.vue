<template>
  <div
    data-name="debug-widget"
    class="max-w-xl"
  >
    <div class="mb-2">
      <ElButton
        size="small"
        type="primary"
        :loading="pending"
        :disabled="!widget?.enabled"
        @click="reloadWidget"
      >
        <span class="_text-s-bold">Reload widget</span>
      </ElButton>
    </div>

    <ElTable
      :data="states"
      size="small"
      class="_text-s-regular"
    >
      <ElTableColumn
        prop="label"
        min-width="140"
      >
        <template #default="{ row }">
          <span
            class="font-semibold"
            :class="{ 'before:content[\'*\'] before:absolute before:-left-2.5 relative': row.changed }"
          >
            {{ row.label }}
          </span>
        </template>
      </ElTableColumn>
      <ElTableColumn
        prop="value"
        min-width="120"
      >
        <template #default="{ row }">
          <span
            :class="{
              'text-success': row.status === true,
              'text-danger': row.status === false,
            }"
          >
            {{ row.value }}
          </span>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { get } from 'lodash'

import { PusherDebuggerEventName } from '@/core/types'
import { Logger, wait } from '@/core/helpers'
import { useDictStore } from '@/core/store'
import { ElButton, ElTable, ElTableColumn } from '@/components/element-plus'
import type { IDebugWidget } from '@/modules/Debug/types'

interface IStateItem {
	label: string
	value: string
	status?: boolean
	changed: boolean
}

const props = withDefaults(defineProps<{
  widget: IDebugWidget | null
  oldWidget?: IDebugWidget | null
  logger?: { handleEvent: (event: any, payload: any) => void } | null
  privateChannel?: { whisper: (eventName: string, data: any) => unknown } | null
}>(), {
	oldWidget: null,
	logger: null,
	privateChannel: null,
})

const pending = ref(false)

const dictStore = useDictStore()

const categories = computed(() => dictStore.all?.campaignsCategories ?? [])

const states = computed<IStateItem[]>(() => {
	const { widget } = props

	if (!widget) return []

	const ignored = widget.ignoreCategories?.map(ignoredCategory => {
		const category = categories.value.find(category => category.id.toString() === ignoredCategory.toString())

		return category?.title
	}).filter(Boolean)

	return [
		{
			label: 'Slug',
			value: widget.slug,
			changed: false,
		},
		{
			label: 'Widget',
			value: widget.enabled ? 'active' : 'not active',
			status: widget.enabled,
			changed: checkChanging('enabled'),
		},
		{
			label: 'Stream',
			value: widget.stream?.enabled ? 'active' : 'not active',
			status: widget.stream?.enabled,
			changed: checkChanging('stream.enabled'),
		},
		{
			label: 'Manual ad button',
			value: widget.adManualEnabled ? 'active' : 'not active',
			status: widget.adManualEnabled,
			changed: checkChanging('adManualEnabled'),
		},
		{
			label: 'Chatbot',
			value: widget.botEnabled ? 'active' : 'not active',
			status: widget.botEnabled,
			changed: checkChanging('botEnabled'),
		},
		{
			label: 'Chatbot connected',
			value: get(widget, `nightbot.${widget.platform}.connected`) ? 'yes' : 'no',
			status: get(widget, `nightbot.${widget.platform}.connected`),
			changed: checkChanging(`nightbot.${widget.platform}.connected`),
		},
		{
			label: 'Chatbot moderator',
			value: get(widget, `nightbot.${widget.platform}.moderator`) ? 'yes' : 'no',
			status: get(widget, `nightbot.${widget.platform}.moderator`),
			changed: checkChanging(`nightbot.${widget.platform}.moderator`),
		},
		{
			label: 'Mode',
			value: widget.advertising?.mode || '—',
			changed: checkChanging('advertising.mode'),
		},
		{
			label: 'Stream delay',
			value: `${widget.stream?.delay}s` || '—',
			changed: checkChanging('stream.delay'),
		},
		{
			label: 'Frequency',
			value: `${widget.advertising?.frequency || '0'} mins`,
			changed: checkChanging('advertising.frequency'),
		},
		{
			label: 'PIP position',
			value: widget.advertising?.position || '—',
			changed: checkChanging('advertising.position'),
		},
		{
			label: 'Ignore categories',
			value: ignored?.join(', ') || 'none',
			changed: checkChanging('ignoreCategories'),
		},
		// {
		// 	label: 'Subscribes status',
		// 	value: widget.subscribes?.status ? 'active' : widget.subscribes?.reason ? `not active (${widget.subscribes.reason})` : 'not active',
		// 	status: widget.subscribes?.status,
		// 	changed: checkChanging('subscribes'),
		// },
		// {
		// 	label: 'Subscribes',
		// 	value: widget.subscribes?.subscribes?.length ? widget.subscribes.subscribes.join(', ') : 'none',
		// 	changed: checkChanging('subscribes_list'),
		// },
		// {
		// 	label: 'Application',
		// 	value: widget.subscribes?.application_name || 'none',
		// 	changed: checkChanging('subscribes'),
		// },
	]
})

function checkChanging(param: string): boolean {
	const { widget, oldWidget } = props

	if (!widget || !oldWidget) return false

	if (param === 'ignoreCategories') {
		const newValue = JSON.stringify(get(widget, param))
		const oldValue = JSON.stringify(get(oldWidget, param))
		return newValue !== oldValue
	}

	if (param === 'subscribes_list') {
		const newValue = JSON.stringify(widget.subscribes?.subscribes)
		const oldValue = JSON.stringify(oldWidget.subscribes?.subscribes)
		return newValue !== oldValue
	}

	return get(widget, param) !== get(oldWidget, param)
}

async function reloadWidget() {
	try {
		pending.value = true

		props.privateChannel?.whisper(PusherDebuggerEventName.WIDGET_REFRESH, {})
		props.logger?.handleEvent(PusherDebuggerEventName.WIDGET_REFRESH, {})

		await wait(2000)
	}
	catch (error) {
		Logger.error('Error reloading widget', true, error)
	}
	finally {
		pending.value = false
	}
}
</script>
