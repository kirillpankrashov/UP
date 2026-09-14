<template>
  <div
    data-name="debug-pusher-log"
    v-loading="loading"
  >
    <ElTabs
      v-if="streamer"
      v-model="activeTab"
    >
      <ElTabPane
        label="Widget"
        name="widget"
      >
        <Widget
          :widget="widget"
          :private-channel="privateChannel"
          :logger="logger"
        />
      </ElTabPane>

      <ElTabPane
        label="OBS WebSocket"
        name="obs-websocket"
      >
        <ObsWebSocket
          :obs-data="obsData"
          :private-channel="privateChannel"
          :logger="logger"
        />
      </ElTabPane>

      <ElTabPane
        label="Sessions"
        name="sessions"
      >
        <Sessions
          :widget="widget"
          :sessions="sessions"
          :logger="logger"
          :private-channel="privateChannel"
          @clear-sessions="sessions = []"
        />
      </ElTabPane>

      <ElTabPane
        label="Logs"
        name="logs"
      >
        <div class="">
          <div class="flex gap-2 justify-start mb-4">
            <SendPreview
              :slug="slug"
              :widget="widget"
            />
            <SendChatbotMessage
              v-show="chatbotConnected && appStore.auth.role === Role.STREAMER"
              :widget="widget"
            />
          </div>

          <div>
            <div
              v-if="!hasStreamer"
              class="mt-12 w-full text-center"
            >
              <div class="mb-3">
                <span class="_text-m-bold">Streamer not found</span>
              </div>
              <ElButton
                size="large"
                type="danger"
                @click="close"
              >
                <span class="_text-m-bold">Remove</span>
              </ElButton>
            </div>
            <div
              v-if="streamer"
              ref="debugLogRef"
              class="relative"
            >
              <div class="relative">
                <div class="mb-2">
                  <span
                    v-if="log.length"
                    class="mr-5 inline-block cursor-pointer text-primary"
                    @click="copyLog"
                  >
                    Copy log
                  </span>

                  <ElPopover
                    v-model="visiblePopover"
                    trigger="click"
                  >
                    <template #reference>
                      <span class="inline-block cursor-pointer text-primary">
                        Paste log
                      </span>
                    </template>
                    <div>
                      <ElInput
                        v-model="inputLog"
                        size="large"
                        ref="inputLogRef"
                        type="textarea"
                        @keyup.enter.prevent="pasteLog"
                      />
                    </div>
                  </ElPopover>
                </div>
                <template v-if="log.length">
                  <div
                    ref="logEventsRef"
                    class="max-w-[680px] max-h-[500px] overflow-y-auto"
                  >
                    <ElTable
                      :data="logWithIndex"
                      size="small"
                      class="_text-s-regular"
                      row-key="_index"
                    >
                      <ElTableColumn
                        label="Time"
                        prop="dateTime"
                        width="80"
                      />
                      <ElTableColumn
                        label="Event"
                        min-width="180"
                      >
                        <template #default="{ row }">
                          {{ getEventLabel(row) }}
                        </template>
                      </ElTableColumn>
                      <ElTableColumn
                        label=""
                        width="140"
                        align="right"
                      >
                        <template #default="{ row }">
                          <LogEventActions :event="omitIndex(row)" />
                        </template>
                      </ElTableColumn>
                    </ElTable>
                  </div>
                </template>

                <div
                  v-else
                  class="text-gray"
                >
                  There were no events yet
                </div>
              </div>
            </div>
          </div>
        </div>
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick,onMounted, onUnmounted, ref, watch } from 'vue'
import type { TabPaneName } from 'element-plus'
import type { PusherPrivateChannel } from 'laravel-echo/dist/channel'

import type { ILogEvent } from '@/core/types'
import { PusherDebugEventName, PusherDebuggerEventName, PusherEventName, Role } from '@/core/types'
import { Logger, WidgetLogger } from '@/core/helpers'
import { pusher } from '@/core/pusher'
import { useAppStore } from '@/core/store/app'
import { ElButton, ElInput, ElPopover, ElTable, ElTableColumn, ElTabPane, ElTabs } from '@/components/element-plus'
import * as DebugApi from '@/modules/Debug/api'
import type { IDebugWidget, IObsData, ISession } from '@/modules/Debug/types'
import {
	type ICreativesResponse,
	type IWidgetResponse,
	type IWidgetStreamer,
	type PusherEvent,
} from '@/modules/Widget/types'
import { type IPromoCreativeResponse } from '@/modules/Widget/types'
import { type IDemoCreativeResponse } from '@/modules/Widget/types'

import { getEventLabel } from './sections/LogEvent/log-event-labels'
import {
	LogEventActions,
	ObsWebSocket,
	SendChatbotMessage,
	SendPreview,
	Sessions,
	Widget,
} from './sections'

const props = defineProps<{
	slug: string
	widgets: IDebugWidget[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
	(e: 'fetched-streamer', streamer: any): void
}>()

const activeTab = ref<TabPaneName>('widget')

const appStore = useAppStore()

const hasStreamer = ref(true)
const loading = ref(true)
const logEventsRef = ref<HTMLElement>()

const widget = ref<IDebugWidget | null>(null)
const streamer = ref<IWidgetStreamer | null>(null)

const inputLog = ref('')
const visiblePopover = ref(false)

const logger = ref<WidgetLogger | null>(null)
const log = ref<ILogEvent[]>([])

const inputLogRef = ref<HTMLElement>()

const privateChannel = ref<PusherPrivateChannel | null>(null)

const sessions = ref<ISession[]>([])
const obsData = ref<IObsData | null>(null)

const mode = computed(() => widget.value?.advertising?.mode)
const chatbotConnected = computed(() => widget.value?.nightbot?.[widget.value.platform as keyof typeof widget.value.nightbot]?.connected || false)

const fetchDebug = async () => {
	try {
		const res = await DebugApi.getDebugWidget(props.slug)

		widget.value = res

		streamer.value = res.streamer

		emit('fetched-streamer', {
			...streamer.value,
			widget: { slug: props.slug },
		})

		initPusher()
	}
	catch (error) {
		Logger.error('Error fetching debug widget', true, error)
	}
}

const initPusher = () => {
	const { echo } = pusher(props.slug)
	const channelName = `uplify.ads.${props.slug}`

	privateChannel.value = echo.private(channelName)

	privateChannel.value
		.listen(PusherEventName.SUBSCRIPTION_SUCCEEDED, (payload: PusherEvent<null>) => {
			privateChannel.value?.whisper(PusherDebuggerEventName.DEBUGGER_CONNECTION, {
				message: PusherDebuggerEventName.DEBUGGER_CONNECTION,
			})
		})
		.listen(PusherEventName.WIDGET_UPDATED, (payload: IWidgetResponse) => {
			if (logger.value) {
				logger.value.handleEvent(PusherEventName.WIDGET_UPDATED, payload)
			}
		})
		.listen(PusherEventName.WIDGET_REFRESH, (payload: PusherEvent<null>) => {
			if (logger.value) {
				logger.value.handleEvent(PusherEventName.WIDGET_REFRESH, payload)
			}
		})
		.listen(PusherEventName.MANUAL_LAUNCH, async (payload: PusherEvent<null>) => {
			if (logger.value) {
				logger.value.handleEvent(PusherEventName.MANUAL_LAUNCH, payload)
			}
		})
		.listen(PusherEventName.AUTO_LAUNCH, (payload: PusherEvent<ICreativesResponse>) => {
			if (logger.value) {
				logger.value.handleEvent(PusherEventName.AUTO_LAUNCH, payload)
			}
		})
		.listen(PusherEventName.REFERRAL_LAUNCH, (payload: PusherEvent<IPromoCreativeResponse[]>) => {
			if (logger.value) {
				logger.value.handleEvent(PusherEventName.REFERRAL_LAUNCH, payload)
			}
		})
		.listen(PusherEventName.DEMO_LAUNCH, (payload: PusherEvent<IDemoCreativeResponse[]>) => {
			if (logger.value) {
				logger.value.handleEvent(PusherEventName.DEMO_LAUNCH, payload)
			}
		})
		.listen(PusherEventName.CHATBOT_MESSAGE_SENT, (payload: PusherEvent<null>) => {
			if (logger.value) {
				logger.value.handleEvent(PusherEventName.CHATBOT_MESSAGE_SENT, payload)
			}
		})
		.listen(PusherEventName.CHATBOT_DISCONNECT, (payload: PusherEvent<number>) => {
			if (logger.value) {
				logger.value.handleEvent(PusherEventName.CHATBOT_DISCONNECT, payload)
			}
		})
		.listen(PusherEventName.FETCHING_AD, (payload: PusherEvent<null>) => {
			if (logger.value) {
				logger.value.handleEvent(PusherEventName.FETCHING_AD, payload)
			}
		})
		.listen(`.client-${PusherDebugEventName.OBS_SETTINGS}`, (payload: typeof obsData.value) => {
			obsData.value = payload ?? null
			if (logger.value) {
				logger.value.handleEvent(PusherDebugEventName.OBS_SETTINGS, payload)
			}
		})
		.listen(`.client-${PusherDebugEventName.SESSION_INIT}`, (payload: ISession) => {
			const session = sessions.value.find((session: ISession) => session.uuid === payload.uuid)
			if (session) {
				session.location = payload.location
				session.browser = payload.browser
				session.device = payload.device
			}
			else {
				sessions.value.push(payload)
			}
			if (logger.value) {
				logger.value.handleEvent(PusherDebugEventName.SESSION_INIT, payload)
			}
		})
}

const onPushLog = () => {
	nextTick(() => {
		logEventsRef.value?.scrollTo({
			top: logEventsRef.value?.scrollHeight,
			behavior: 'smooth',
		})
	})
}

const close = () => {
	if (logger.value) {
		logger.value.deleteLog()
	}
}

const copyLog = () => {
	const encodedLog = JSON.stringify(log.value)

	navigator.clipboard.writeText(encodedLog)
}

const logWithIndex = computed(() =>
	log.value.map((item, index) => ({ ...item, _index: index })),
)

function omitIndex (row: ILogEvent & { _index?: number }) {
	const { _index, ...event } = row
	return event as ILogEvent
}

const pasteLog = () => {
	try {
		const logData = JSON.parse(inputLog.value.replace(/\s+/i, ''))
		visiblePopover.value = false
		inputLog.value = ''

		log.value = logData
		if (logger.value) {
			logger.value.log = logData
		}
	}
	catch (error) {
		Logger.error('Invalid JSON format', true, error)
	}
}

watch(visiblePopover, (val) => {
	if (val) {
		nextTick(() => {
			inputLogRef.value?.focus()
		})
	}
})

watch(mode, (val) => {
	if (val && logger.value) {
		logger.value.setMode(val)
	}
})

onMounted(() => {
	init()
})

onUnmounted(() => {
	privateChannel.value?.unsubscribe()

	const foundWidget = props.widgets.find(w => w.slug === props.slug)
	if (!foundWidget) {
		close()
	}
})

const init = async () => {
	try {
		logger.value = new WidgetLogger(props.slug, { onPushLog })

		log.value = logger.value.value

		await fetchDebug()
	}
	catch {
		hasStreamer.value = false
	}
	finally {
		loading.value = false
	}
}
</script>
