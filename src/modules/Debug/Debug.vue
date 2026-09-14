<template>
  <DashboardLayout
    v-loading="loading"
    full-width
  >
    <div class="min-h-[80vh]">
      <div>
        <div class="max-w-96">
          <StreamerSelector
            v-if="appStore.auth.role !== Role.STREAMER"
            class="mb-4"
            :widgets="widgets"
            :disabled="false"
            @on-input="onSelect"
          />
        </div>
        <ElTabs
          v-model="tab"
          type="card"
          closable
          @tab-remove="onTabRemove"
        >
          <ElTabPane
            v-for="widget in widgets"
            :key="widget.slug + widget.streamer?.name"
            :label="widget.streamer?.name ? widget.streamer.name + ' (' + widget.slug + ')' : widget.slug"
            :name="widget.slug"
          >
            <WidgetDebugger
              :key="widget.slug"
              :slug="widget.slug"
              :widgets="widgets"
              :is-active="tab === widget.slug"
              @close="onClose(widget)"
              @fetched-streamer="onFetchStreamer"
            />
          </ElTabPane>
        </ElTabs>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeMount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTitle } from '@vueuse/core'
import type { TabPaneName } from 'element-plus'

import { Role } from '@/core/types'
import { CachedLog } from '@/core/helpers'
import { RouteName } from '@/core/router'
import { useAppStore } from '@/core/store'
import { ElTabPane, ElTabs } from '@/components/element-plus'
import { DashboardLayout } from '@/components/layouts'
import { defaultWidget } from '@/modules/Widget/constants/default-widget'

import {
	StreamerSelector,
	WidgetDebugger,
} from './sections'
import type { IDebugStreamer, IDebugWidget } from './types'

useTitle('Debug')

const appStore = useAppStore()

const route = useRoute()
const router = useRouter()

const widgets = ref<IDebugWidget[]>([])
const tab = ref('')
const loading = ref(true)

const user = computed(() => appStore.auth.user)

const cachedLog = new CachedLog()

const init = async () => {
	openCachedWidgets()

	if (localStorage.getItem('active-debug-tab')) {
		tab.value = localStorage.getItem('active-debug-tab')!
	}

	openAddressWidget()

	loading.value = false
}

const openCachedWidgets = () => {
	cachedLog.clearExpired()

	const widgets = cachedLog.getCachedWidgets() || {}

	for (const slug in widgets) {
		onSelect(slug)
	}
}

const openAddressWidget = () => {
	if (!route.params.slug) return

	onSelect(route.params.slug as string)

	router.push({ name: RouteName.DEBUG })
}

const onSelect = (slug: string) => {
	const isChoosed = widgets.value.find(widget => widget.slug === slug)

	if (!isChoosed) {
		widgets.value.unshift({
			...defaultWidget,
			slug,
		})
	}

	tab.value = slug
}

const onFetchStreamer = (streamer: IDebugStreamer) => {
	widgets.value = widgets.value.map(widget => {
		if (widget.slug === streamer.widget.slug) {
			return {
				...widget,
				streamer,
			}
		}

		return widget
	})

	nextTick()
}

const onTabRemove = (targetName: TabPaneName) => {
	const widget = widgets.value.find(w => w.slug === targetName)
	if (widget) onClose(widget)
}

const onClose = (widgetToClose: IDebugWidget) => {
	const idx = widgets.value.findIndex(widget => widget.slug === widgetToClose.slug)

	widgets.value.splice(idx, 1)

	tab.value = widgets.value[0]?.slug || ''
}

onBeforeMount(() => {
	if (!user.value?.debugActive) {
		router.push({ name: RouteName.NOT_FOUND })
	}
})

onMounted(() => {
	init()
})
</script>
