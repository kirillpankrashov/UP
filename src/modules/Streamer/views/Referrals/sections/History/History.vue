<template>
  <DashboardSection
    id="referrals-history-section"
    data-test="referrals-history-section"
    class="min-h-[240px]"
    :no-left="true"
  >
    <template #left>
      <div class="_text-m-bold">
        {{ t('referrals.history.title') }}
        <HelpIcon
          v-if="appStore.isMobile"
          class="h-4 w-4 fill-primary"
          @click="adviceRef?.toggleModal"
        />
      </div>
    </template>

    <ElTable
      data-test="referrals-history-table"
      v-if="history.data.length"
      :data="history.data"
      style="width: 100%"
    >
      <ElTableColumn
        :label="t('referrals.history.columns.creator')"
        prop="name"
      >
        <template #default="{ row: { name, userId } }">
          <a
            v-if="LINK_ENABLED"
            data-test="referrals-history-link"
            class="text-primary no-underline"
            :href="linkUrl + userId"
            target="_blank"
          >{{ name }}</a>
          <span
            v-else
            data-test="referrals-history-name"
          >{{ name }}</span>
        </template>
      </ElTableColumn>

      <ElTableColumn :label="t('referrals.history.columns.date')">
        <template #default="{ row: { signedUp }}">
          {{ getDate(signedUp) }}
        </template>
      </ElTableColumn>

      <ElTableColumn
        v-if="streamer?.language === Locale.RU"
        data-test="referrals-history-status-ru"
        :label="t('referrals.history.columns.status')"
      >
        <template #default="{ row: { impressions } }">
          <span
            class="relative mr-1 inline-block h-2 w-2 rounded-full bg-light-gray"
            :class="{'!bg-success': impressions.current > 0}"
          />
          {{ impressions.current === 0 ? t('referrals.updated.history.invited') : t('referrals.updated.history.hasImpressions') }}
        </template>
      </ElTableColumn>

      <ElTableColumn
        v-if="streamer?.language !== Locale.RU"
        data-test="referrals-history-status-other"
        :label="t('referrals.history.columns.status')"
      >
        <template #default="{ row: { completed } }">
          <span
            class="relative mr-1 inline-block h-2 w-2 rounded-full bg-light-gray"
            :class="{'!bg-success': completed}"
          />
          {{ completed ? t('referrals.history.paid') : t('referrals.history.waiting') }}
        </template>
      </ElTableColumn>

      <ElTableColumn
        v-if="streamer?.language !== Locale.RU"
        :label="t('referrals.history.columns.impressions')"
      >
        <template #default="{ row: { impressions } }">
          {{ impressions.current }}/{{ impressions.total }}
        </template>
      </ElTableColumn>
    </ElTable>

    <div
      v-else
      data-test="referrals-history-empty"
      class="_text-m-regular"
    >
      {{ t('referrals.history.none') }}
    </div>

    <ElPagination
      v-if="history.data.length"
      :total="history.total"
      :hide-on-single-page="true"
      :page-size="history.perPage"
      @current-change="referralsHistoryStore.fetchHistory"
    />

    <Advice
      v-if="history.data.length"
      ref="adviceRef"
      type="primary"
      class="sm:absolute sm:left-[calc(100%+24px)] sm:top-8"
      :title="t('referrals.updated.history.advice.title')"
    >
      <p
        class="_text-m-regular"
        v-html="t('referrals.updated.history.advice.description')"
      />
    </Advice>
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import moment from 'moment'

import { Locale } from '@/core/types'
import { LINK_ENABLED } from '@/core/consts'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { Advice } from '@/components'
import { ElPagination, ElTable, ElTableColumn } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { messages } from '@/modules/Streamer/views/Referrals/locales'
import { useReferralsHistoryStore } from '@/modules/Streamer/views/Referrals/store'

import HelpIcon from '@/assets/img/icons/help-icon.svg'

const { t } = useLocale<typeof messages>(messages)

const appStore = useAppStore()
const streamerStore = useStreamerStore()
const referralsHistoryStore = useReferralsHistoryStore()

const adviceRef = ref<InstanceType<typeof Advice> | null>(null)

const streamer = computed(() => streamerStore.profile)
const history = computed(() => referralsHistoryStore.history)
const linkUrl = computed(() => import.meta.env.VITE_APP_FREEMIUM_URL || 'https://uplify.link/')

const getDate = (date: Date) => {
	moment.locale(appStore.appLocale)

	return moment(date).format('DD MMMM YYYY')
}

onMounted(() => {
	if (!history.value.data.length) {
		referralsHistoryStore.fetchHistory()
	}
})
</script>
