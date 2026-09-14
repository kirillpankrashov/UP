<template>
  <div data-name="panel">
    <ReloginMessage v-if="widget?.relogin" />

    <div class="absolute inset-0 flex flex-col overflow-y-auto bg-[#1f1e1f] p-5 text-white">
      <div
        v-if="authError"
        class="absolute left-0 top-1/2 w-full -translate-y-1/2 text-center"
      >
        <ErrorIcon class="mx-auto h-[36px] w-[148px]" />

        <div class="_headline-2 mb-4 mt-6">
          {{ t('panel.error.title') }}
        </div>
        <div class="_text-l-regular">
          {{ t('panel.error.text') }}
        </div>
      </div>

      <div
        v-else-if="!loaded"
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <AppLogo />
      </div>

      <div
        v-else
        class="relative mx-auto flex w-full max-w-[428px] flex-1 flex-col"
      >
        <ElTabs
          v-model="activeTab"
          stretch
        >
          <ElTabPane :name="Tab.WIDGET">
            <template #label>
              <div class="_text-m-bold flex items-center gap-2 pb-4">
                <GearIcon
                  class="h-[18px] w-[18px]"
                  :class="activeTab === Tab.WIDGET ? 'fill-primary' : 'fill-white'"
                />
                {{ t('panel.tabs.widget') }}
              </div>
            </template>
            <h2 class="_text-m-bold mb-6">
              {{ t('panel.states.title') }}
            </h2>

            <Statuses />

            <div class="border-gray-500 my-6 border-t border-[#4d4d4d]" />

            <h2 class="_text-m-bold mb-6">
              {{ t('panel.params.title') }}
            </h2>

            <ElForm :label-position="'top'">
              <AdPlaybackMode />
              <ManualPlayback />
              <BannerTimeout />
              <BoxSize />
              <WidgetPreview />

              <div class="border-gray-500 my-6 border-t border-[#4d4d4d]" />

              <h2 class="_text-m-bold mb-6">
                {{ t('panel.params.locationCaption') }}
              </h2>

              <AdvertisingPosition />
            </ElForm>
          </ElTabPane>

          <ElTabPane :name="Tab.CAMPAIGNS">
            <template #label>
              <div class="_text-m-bold flex items-center gap-2 pb-4">
                <CreativeIcon
                  class="h-[18px] w-[18px]"
                  :class="activeTab === Tab.CAMPAIGNS ? 'fill-primary' : 'fill-white'"
                />
                {{ t('panel.tabs.campaigns') }}
              </div>
            </template>

            <h2 class="_text-m-bold mb-6">
              {{ t('panel.settings.widgetPlatform.title') }}
            </h2>
            <CurrentPlatform />

            <div class="border-gray-500 my-6 border-t border-[#4d4d4d]" />

            <Adsets />
          </ElTabPane>
        </ElTabs>

        <div class="mt-auto flex items-center justify-between pt-8">
          <Logger :log="widgetLog" />

          <div class="flex items-center gap-2">
            <span class="_text-caption">Powered by </span>

            <UplifyLogo class="h-[15px] w-[44px]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { debounce } from 'lodash'

import { type AdvertisingMode, type Locale,Role } from '@/core/types'
import { PusherEventName } from '@/core/types'
import { Socket, WidgetLogger } from '@/core/helpers'
import { setToken } from '@/core/helpers/authToken'
import { useLocale } from '@/core/hooks'
import { useAppStore, useDictStore } from '@/core/store'
import { AppLogo } from '@/components'
import { ElForm, ElTabPane, ElTabs } from '@/components/element-plus'
import { login } from '@/modules/Panel/api'
import { messages } from '@/modules/Panel/locales'
import { Tab } from '@/modules/Panel/types'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import {
	AdPlaybackMode,
	Adsets,
	AdvertisingPosition,
	BannerTimeout,
	BoxSize,
	CurrentPlatform,
	Logger,
	ManualPlayback,
	ReloginMessage,
	Statuses,
	WidgetPreview,
} from './sections'

import CreativeIcon from '@/assets/img/icons/creative.svg'
import GearIcon from '@/assets/img/icons/gear.svg'
import ErrorIcon from '@/assets/img/icons/x_x.svg'
import UplifyLogo from '@/assets/img/logo/uplify.svg'

const { t } = useLocale<typeof messages>(messages)

const route = useRoute()

const appStore = useAppStore()
const dictStore = useDictStore()
const streamerStore = useStreamerStore()
const campaignsStore = useCampaignsStore()
const settingsStore = useSettingsStore()

const activeTab = ref<Tab>(Tab.WIDGET)
const loaded = ref(false)
const authError = ref(false)
const platformIsChanged = ref(false)
const widgetLogger = ref<WidgetLogger | null>(null)
const widgetLog = ref([])
const socket = ref<Socket | null>(null)

const widget = computed(() => settingsStore.widget)
const streamer = computed(() => streamerStore.profile)

watch(() => widget.value?.platform, (_, prevValue) => {
	if (prevValue) {
		platformIsChanged.value = true
	}
})

watch(() => widget.value?.advertising.mode, (val) => {
	if (widgetLogger.value) {
		widgetLogger.value.setMode(val as AdvertisingMode)
	}
})

onMounted(async () => {
	try {
		await auth()
		await streamerStore.fetchProfile()
		await dictStore.getAllDictionaries(streamer.value?.locale as Locale)
		appStore.setLocale(streamer.value?.locale as Locale)
		await settingsStore.fetchWidget()
		await campaignsStore.fetchActiveCampaigns()
		initLogger()
	}
	catch {
		authError.value = true
	}
	finally {
		loaded.value = true
	}
})

const auth = async () => {
	try {
		const res = await login(route.params.token as string)

		if (res.status) {
			setToken(res.token, Role.STREAMER)
		}
		else {
			throw new Error(res as unknown as string)
		}
	}
	catch (err) {
		throw new Error(err as string)
	}
}

const initLogger = () => {
	widgetLogger.value = new WidgetLogger(widget.value?.slug as string, {
		onPushLog: () => {
			widgetLog.value = widgetLogger.value?.value as never[]
		},
	})
	widgetLog.value = widgetLogger.value?.value as never[]
	socket.value = new Socket(widget.value?.slug as string)
	socket.value.listen((event, payload) => {
		const eventName = event as unknown as PusherEventName
		if (widgetLogger.value) {
			widgetLogger.value.handleEvent(eventName, payload)
		}
		if (eventName === PusherEventName.WIDGET_UPDATED) {
			settingsStore.setWidgetData(payload)
		}
	})
}

watch(
	widget,
	(_, prevState) => {
		if (prevState) {
			debounce(settingsStore.updateWidget, 2000)()
		}
	},
	{ deep: true },
)

onBeforeMount(() => {
	document.querySelector('html')?.classList.add('dark')
})
</script>
