<template>
  <div id="dashboard-loaylty-metrics">
    <div
      v-for="level in levels"
      :key="level.level"
      :data-test="`level-${level.level}-metrics`"
      class="mt-4 hidden rounded-[4px] bg-[var(--el-fill-color-light)] p-4 sm:p-6"
      :class="{'!block': level.level === selectedLevel}"
    >
      <div>
        <h3 class="_text-l-bold mb-5 sm:mb-6">
          {{ t('dashboard.levels.goals', { level: level.level }) }}
        </h3>

        <div
          v-if="current"
          class="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8"
        >
          <Metric
            :name="'ctr'"
            :success="current.ctr.value >= level.requirements.ctr"
            :label="current.ctr.title"
            :value="`${current.ctr.value}% / ${level.requirements.ctr}%`"
          />

          <Metric
            :name="'impressions'"
            :success="current.impressions.value >= level.requirements.impressions"
            :label="current.impressions.title"
            :value="`${current.impressions.value} / ${level.requirements.impressions}`"
          />

          <Metric
            :name="'referrals'"
            :success="current.referrals.value >= level.requirements.referrals"
            :label="current.referrals.title"
            :value="`${current.referrals.value} / ${level.requirements.referrals}`"
          />

          <Metric
            :name="'daysOnPlatform'"
            :success="current.daysOnPlatform.value >= level.requirements.daysOnPlatform"
            :label="current.daysOnPlatform.title"
            :value="`${current.daysOnPlatform.value} / ${level.requirements.daysOnPlatform} ${t('dashboard.levels.days')}`"
          />

          <Metric
            :name="'discord'"
            :success="current.discord.value"
            :label="current.discord.title"
            :value="t('dashboard.levels.discord.active')"
          >
            <div
              v-if="current.discord.value"
              class="_headline-2  mt-[6px] !font-normal text-success"
            >
              {{ t('dashboard.levels.discord.active') }}
            </div>
            <TextLink
              v-else
              class="_headline-2 mt-[6px] block !text-[18px] !font-normal !text-black group-[.item-success]:!text-success sm:mt-[8px] sm:!text-[24px]"
              @click="router.push({name: RouteName.PROFILE, hash: '#profile-discord'})"
            >
              {{ t('dashboard.levels.discord.notActive') }}
            </TextLink>
          </Metric>

          <Metric
            :name="'extension'"
            :success="current.extension.value"
            :label="current.extension.title"
            :value="t('dashboard.levels.twitch.active')"
          >
            <div
              v-if="current.extension.value"
              class="_headline-2  mt-[6px] !font-normal text-success"
            >
              {{ t('dashboard.levels.twitch.active') }}
            </div>
            <TextLink
              v-else
              class="_headline-2 mt-[6px] block !text-[18px] !font-normal !text-black no-underline group-[.item-success]:!text-success sm:mt-[8px] sm:!text-[24px]"
              :href="t('links.twitchExtension')"
              target="_blank"
            >
              {{ t('dashboard.levels.twitch.notActive') }}
            </TextLink>
          </Metric>
        </div>
      </div>

      <div
        id="dashboard-loaylty-metrics-benefits"
        class="mt-6 border-t border-light-gray pt-6"
      >
        <h3 class="_text-l-bold mb-5 sm:mb-6">
          {{ t('dashboard.levels.perks') }}
        </h3>

        <div>
          <div
            class="_text-m-regular mt-4"
            v-for="benefit in level.benefits"
            :key="benefit"
          >
            {{ benefit }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { useLocale } from '@/core/hooks'
import { TextLink } from '@/components'
import { RouteName } from '@/modules/Streamer/router'
import { messages } from '@/modules/Streamer/views/Dashboard/locales'
import { useDashboardStore } from '@/modules/Streamer/views/Dashboard/store'

import { Metric } from './components'

const { t } = useLocale<typeof messages>(messages)

const router = useRouter()

const dashboardStore = useDashboardStore()
const levels = computed(() => dashboardStore.tier?.data?.levels || [])
const current = computed(() => dashboardStore.tier?.data?.current)
const selectedLevel = computed(() => dashboardStore.tier?.selectedLevel)
</script>
