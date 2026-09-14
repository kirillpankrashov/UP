<template>
  <div
    data-name="debug-obs-websocket"
    class="max-w-xl"
  >
    <div v-if="!hasConnection">
      <div class="_text-m-regular text-gray-500 mb-4">
        Socket not connected
      </div>
      <ElButton
        size="small"
        type="primary"
        :loading="pending"
        @click="connect"
      >
        <span class="_text-s-bold">Connect</span>
      </ElButton>
      <div class="mt-8">
        <ElAlert
          class="mt-8"
          title="Socket not connected"
          description="OBS WebSocket works directly with the streamer widget through the Pusher channel. The widget must be connected to the Pusher channel to work. In order to see information about streamers widget, make sure the widget is live at the moment and streamer provided correct createntials to connect to OBS WebSocket."
          type="warning"
        />
      </div>
    </div>

    <div v-else>
      <div class="mb-2 flex gap-2">
        <ElButton
          size="small"
          type="primary"
          :loading="pending"
          @click="setDefaults"
        >
          <span class="_text-s-bold">Set Defaults</span>
        </ElButton>
        <ElButton
          size="small"
          @click="drawerVisible = true"
        >
          <span class="_text-s-bold">Set custom</span>
        </ElButton>
      </div>

      <ElDrawer
        v-model="drawerVisible"
        title="OBS WebSocket custom settings"
        size="400px"
        @open="initFormFromObsData"
      >
        <ElForm
          ref="formRef"
          :model="formModel"
          label-position="top"
        >
          <ElFormItem label="Width">
            <ElInputNumber
              v-model="formModel.width"
              :min="1"
              class="w-full"
            />
          </ElFormItem>
          <ElFormItem label="Height">
            <ElInputNumber
              v-model="formModel.height"
              :min="1"
              class="w-full"
            />
          </ElFormItem>
          <ElFormItem label="Position X">
            <ElInputNumber
              v-model="formModel.positionX"
              class="w-full"
            />
          </ElFormItem>
          <ElFormItem label="Position Y">
            <ElInputNumber
              v-model="formModel.positionY"
              class="w-full"
            />
          </ElFormItem>
          <ElFormItem label="Scale X">
            <ElInputNumber
              v-model="formModel.scaleX"
              :min="0.01"
              :step="0.1"
              class="w-full"
            />
          </ElFormItem>
          <ElFormItem label="Scale Y">
            <ElInputNumber
              v-model="formModel.scaleY"
              :min="0.01"
              :step="0.1"
              class="w-full"
            />
          </ElFormItem>
          <ElFormItem label="FPS">
            <ElInputNumber
              v-model="formModel.fps"
              :min="1"
              class="w-full"
            />
          </ElFormItem>
          <ElFormItem label="FPS Override">
            <ElSwitch v-model="formModel.fps_override" />
          </ElFormItem>
          <ElFormItem label="FPS Custom">
            <ElSwitch v-model="formModel.fps_custom" />
          </ElFormItem>
          <ElFormItem label="Webpage Control Level">
            <ElInputNumber
              v-model="formModel.webpage_control_level"
              :min="0"
              :max="5"
              class="w-full"
            />
          </ElFormItem>
          <ElFormItem label="Reroute Audio">
            <ElSwitch v-model="formModel.reroute_audio" />
          </ElFormItem>
          <ElFormItem label="Restart When Active">
            <ElSwitch v-model="formModel.restart_when_active" />
          </ElFormItem>
          <ElFormItem label="Shutdown">
            <ElSwitch v-model="formModel.shutdown" />
          </ElFormItem>
          <ElFormItem label="CSS">
            <ElInput
              v-model="formModel.css"
              type="textarea"
              :rows="6"
            />
          </ElFormItem>
          <ElButton
            type="primary"
            :loading="pending"
            class="w-full"
            @click="submitCustom"
          >
            Apply
          </ElButton>
        </ElForm>
      </ElDrawer>
      <ElTable
        :data="tableData"
        size="small"
        class="_text-s-regular"
      >
        <ElTableColumn
          prop="label"
          min-width="140"
        >
          <template #default="{ row }">
            <span class="font-semibold">
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
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

import { PusherDebuggerEventName } from '@/core/types'
import { Logger, wait } from '@/core/helpers'
import {
	ElAlert,
	ElButton,
	ElDrawer,
	ElForm,
	ElFormItem,
	ElInput,
	ElInputNumber,
	ElSwitch,
	ElTable,
	ElTableColumn,
} from '@/components/element-plus'
import type { IObsData } from '@/modules/Debug/types'
import type { ILayerSettings } from '@/modules/Widget/types'

const defaultFormModel = (): ILayerSettings => ({
	css: 'body { background-color: rgba(0, 0, 0, 0); margin: 0px auto; overflow: hidden; }',
	fps: 60,
	fps_custom: true,
	fps_override: true,
	height: 1080,
	positionX: 0,
	positionY: 0,
	reroute_audio: true,
	restart_when_active: true,
	scaleX: 1,
	scaleY: 1,
	shutdown: true,
	webpage_control_level: 5,
	width: 1920,
})

const props = defineProps<{
  obsData: IObsData | null
  privateChannel: { whisper: (eventName: string, data: any) => unknown } | null
  logger: { handleEvent: (event: any, payload: any) => void } | null
}>()

const pending = ref(false)
const drawerVisible = ref(false)
const formRef = ref()
const formModel = reactive<ILayerSettings>(defaultFormModel())

const hasConnection = computed(() => props.obsData?.connected ?? false)

function initFormFromObsData () {
	const settings = props.obsData?.userSettings
	if (settings) {
		Object.assign(formModel, {
			css: String(settings.css ?? defaultFormModel().css),
			fps: Number(settings.fps ?? 60),
			fps_custom: Boolean(settings.fps_custom ?? true),
			fps_override: Boolean(settings.fps_override ?? true),
			height: Number(settings.height ?? 1080),
			positionX: Number(settings.positionX ?? 0),
			positionY: Number(settings.positionY ?? 0),
			reroute_audio: Boolean(settings.reroute_audio ?? true),
			restart_when_active: Boolean(settings.restart_when_active ?? true),
			scaleX: Number(settings.scaleX ?? 1),
			scaleY: Number(settings.scaleY ?? 1),
			shutdown: Boolean(settings.shutdown ?? true),
			webpage_control_level: Number(settings.webpage_control_level ?? 5),
			width: Number(settings.width ?? 1920),
		})
	}
	else {
		Object.assign(formModel, defaultFormModel())
	}
}

async function submitCustom () {
	try {
		pending.value = true
		props.privateChannel?.whisper(PusherDebuggerEventName.OBS_SETTINGS_CUSTOM, {
			settings: { ...formModel },
		})
		props.logger?.handleEvent(PusherDebuggerEventName.OBS_SETTINGS_CUSTOM, { settings: formModel })

		drawerVisible.value = false
		await wait(2000)
	}
	catch (error) {
		Logger.warning('Error applying custom OBS settings', true, error)
	}
	finally {
		pending.value = false
	}
}

const tableData = computed(() => {
	const data = props.obsData
	if (!data?.connected) return []

	const baseRows = [
		{
			label: 'Status',
			value: 'Connected',
			status: true as boolean,
		},
		{
			label: 'Scene',
			value: data.sceneName ?? '—',
		},
		{
			label: 'Source',
			value: data.sourceName ?? '—',
		},
		{
			label: 'Scene Item ID',
			value: data.sceneItemId?.toString() ?? '—',
		},
	]

	if (!data.userSettings || !Object.keys(data.userSettings).length) {
		return baseRows
	}

	const orderedKeys = [
		'width', 'height',
		'fps', 'fps_override', 'fps_custom',
		'positionX', 'positionY', 'scaleX', 'scaleY',
		'reroute_audio', 'restart_when_active', 'shutdown', 'webpage_control_level',
		'css',
	]

	const knownKeys = new Set(orderedKeys)
	const settingRows = [
		...orderedKeys
			.filter(key => key in data.userSettings!)
			.map(key => ({
				label: formatLabel(key),
				value: formatValue(data.userSettings![key]),
			})),
		...Object.entries(data.userSettings!)
			.filter(([key]) => !knownKeys.has(key))
			.map(([key, val]) => ({
				label: formatLabel(key),
				value: formatValue(val),
			})),
	]

	return [...baseRows, ...settingRows]
})

function formatLabel (key: string): string {
	const dict = new Map([
		['width', 'Width'],
		['height', 'Height'],
		['fps', 'FPS'],
		['fps_override', 'FPS Override'],
		['fps_custom', 'FPS Custom'],
		['positionX', 'Position X'],
		['positionY', 'Position Y'],
		['scaleX', 'Scale X'],
		['scaleY', 'Scale Y'],
		['reroute_audio', 'Reroute Audio'],
		['restart_when_active', 'Restart When Active'],
		['shutdown', 'Shutdown'],
		['webpage_control_level', 'Webpage Control Level'],
		['css', 'CSS'],
		['url', 'URL'],
	])


	return dict.get(key) ?? key
}

function formatValue (val: unknown): string {
	if (val === null || val === undefined) return '—'
	if (typeof val === 'object') return JSON.stringify(val)
	return String(val)
}

async function connect () {
	if (pending.value) return

	try {
		pending.value = true

		props.privateChannel?.whisper(PusherDebuggerEventName.DEBUGGER_CONNECTION, {})
		props.logger?.handleEvent(PusherDebuggerEventName.DEBUGGER_CONNECTION, {})

		await wait(2000)
	}
	catch (error) {
		Logger.warning('Error connecting to OBS WebSocket', true, error)
	}
	finally {
		pending.value = false
	}
}

async function setDefaults () {
	if (pending.value) return

	try {
		pending.value = true
		props.privateChannel?.whisper(PusherDebuggerEventName.OBS_SETTINGS_DEFAULTS, {})
		props.logger?.handleEvent(PusherDebuggerEventName.OBS_SETTINGS_DEFAULTS, {})

		await wait(2000)
	}
	catch (error) {
		Logger.warning('Error setting OBS defaults', true, error)
	}
	finally {
		pending.value = false
	}
}
</script>
