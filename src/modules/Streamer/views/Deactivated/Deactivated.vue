<template>
  <DashboardLayout
    v-if="streamer?.deleted.isRequested"
    id="deactivated"
    data-test="deactivated"
  >
    <DashboardTitle :title="t('deactivated.title')" />

    <div class="border-t border-gray py-8">
      <div class="max-w-[480px]">
        <div
          class="_text-m-regular mb-6"
          v-html="t('deactivated.headline', { date: daysLeft })"
        />
        <div class="_text-m-regular mb-6">
          <strong v-html="t('deactivated.textBlock1')" />
        </div>
        <div class="_text-m-regular mb-8">
          <ol class="list-decimal pl-5">
            <li
              v-for="text, index in tm('deactivated.textBlock2')"
              :key="index"
              class="mb-2"
              v-html="text"
            />
          </ol>
        </div>

        <ElButton
          data-test="deactivated-btn"
          class="w-full sm:max-w-[220px]"
          size="large"
          :type="success ? 'success' : 'primary'"
          :loading="sending"
          @click="revokeHandler"
        >
          <span class="_text-m-bold">{{ t('deactivated.revokeBtn') }}</span>
        </ElButton>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment'

import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { ElButton } from '@/components/element-plus'
import { DashboardLayout, DashboardTitle } from '@/components/layouts'
import { RouteName } from '@/modules/Streamer/router'
import { reactivateStreamer } from '@/modules/Streamer/views/Deactivated/api'
import { messages } from '@/modules/Streamer/views/Deactivated/locales'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

const { t, tm } = useLocale<typeof messages>(messages)

const router = useRouter()

const sending = ref(false)
const success = ref(false)

const appStore = useAppStore()
const streamerStore = useStreamerStore()

const streamer = computed(() => streamerStore.profile)

const daysLeft = computed(() => {
	if (!streamer.value) return null

	return moment()
		.locale(appStore.appLocale)
		.add(streamer.value.deleted.daysLeft, 'days')
		.format('LL')
})

const revokeHandler = async () => {
	sending.value = true

	try {
		const res = await reactivateStreamer()

		if (res.status) {
			success.value = true
			setTimeout(() => {
				success.value = false
				window.location.reload()
			}, 3000)
		}
	}
	catch(err) {
		Logger.error('Unable to reactivate streamer', true, err)
	}
	finally {
		sending.value = false
	}
}

onBeforeMount(() => {
	if (!streamer.value?.deleted.isRequested) {
		router.push({ name: RouteName.DASHBOARD })
	}
})

defineExpose({
	revokeHandler,
})
</script>
