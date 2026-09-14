<template>
  <div
    id="campaigns-adsets-active"
    data-name="campaigns-adsets-active"
  >
    <template v-if="route.name === RouteName.CAMPAIGNS_LIVESTREAM">
      <AdsetsList
        data-test="adsets-active-list"
        :title="t('campaigns.active.title')"
        :description="t('campaigns.active.description')"
        :adsets="campaignsStore.activeCampaigns.data.active"
        :hint="true"
        @toggle-hint="toggleHint"
      >
        <template #hint>
          <Advice
            ref="adviceRef"
            class="sm:absolute sm:left-[calc(100%+24px)] sm:top-8"
            :title="t('campaigns.advice.title')"
            type="hint"
          >
            <p class="_text-m-regular">
              <b>{{ t('campaigns.advice.dailyLimit.title') }}:</b> {{ t('campaigns.advice.dailyLimit.description') }}
              <br><br>
              <b>{{ t('campaigns.advice.dailyActionLimit.title') }}:</b> {{ t('campaigns.advice.dailyActionLimit.description') }}
              <br><br>
              <b>{{ t('campaigns.advice.potentialIncome.title') }}:</b> {{ t('campaigns.advice.potentialIncome.description') }}
              <br>
              <TextLink
                :href="t('links.howIsItCalculated')"
                target="_blank"
              >
                {{ t('campaigns.advice.potentialIncome.link') }}
              </TextLink>
            </p>
          </Advice>
        </template>
      </AdsetsList>

      <AdsetsList
        data-test="adsets-inactive-list"
        :title="t('campaigns.inactive.title')"
        :description="t('campaigns.inactive.description')"
        :adsets="campaignsStore.activeCampaigns.data.inactive"
      />

      <AdsetsList
        v-if="campaignsStore.activeCampaigns.data.future.length"
        data-test="adsets-future-list"
        :title="t('campaigns.future.title')"
        :description="t('campaigns.future.description')"
        :adsets="campaignsStore.activeCampaigns.data.future"
      />

      <AdsetsList
        v-if="campaignsStore.activeCampaigns.data.unavailable.length"
        data-test="adsets-unavailable-list"
        :title="t('campaigns.notAvailable.title')"
        :description="t('campaigns.notAvailable.description')"
        :adsets="campaignsStore.activeCampaigns.data.unavailable"
      />
    </template>

    <template v-if="route.name === RouteName.CAMPAIGNS_PREROLL">
      <AdsetsList
        v-if="campaignsStore.activePrerollCampaigns.length"
        data-test="adsets-preroll-list"
        :title="t('campaigns.active.title')"
        :description="t('campaigns.active.description')"
        :adsets="campaignsStore.activePrerollCampaigns"
      />
    </template>

    <template v-if="route.name === RouteName.CAMPAIGNS_SPECIAL_PROJECT">
      <AdsetsList
        data-test="adsets-special-project-active-list"
        :title="t('campaigns.active.title')"
        :description="t('campaigns.active.description')"
        :adsets="campaignsStore.activeSpecialProjectCampaigns.data.active"
      />

      <AdsetsList
        v-if="campaignsStore.activeSpecialProjectCampaigns.data.inactive.length"
        data-test="adsets-special-project-inactive-list"
        :title="t('campaigns.inactive.title')"
        :description="t('campaigns.inactive.description')"
        :adsets="campaignsStore.activeSpecialProjectCampaigns.data.inactive"
      />

      <AdsetsList
        v-if="campaignsStore.activeSpecialProjectCampaigns.data.future.length"
        data-test="adsets-special-project-future-list"
        :title="t('campaigns.future.title')"
        :description="t('campaigns.future.description')"
        :adsets="campaignsStore.activeSpecialProjectCampaigns.data.future"
      />

      <AdsetsList
        v-if="campaignsStore.activeSpecialProjectCampaigns.data.unavailable.length"
        data-test="adsets-special-project-unavailable-list"
        :title="t('campaigns.notAvailable.title')"
        :description="t('campaigns.notAvailable.description')"
        :adsets="campaignsStore.activeSpecialProjectCampaigns.data.unavailable"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useLocale } from '@/core/hooks'
import { Advice, TextLink } from '@/components'
import { RouteName } from '@/modules/Streamer/router'
import { AdsetsList } from '@/modules/Streamer/views/Campaigns/components'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

const { t } = useLocale<typeof messages>(messages)

const route = useRoute()
const router = useRouter()

const streamerStore = useStreamerStore()
const campaignsStore = useCampaignsStore()

const adviceRef = ref<InstanceType<typeof Advice> | null>(null)

const toggleHint = () => {
	adviceRef.value?.toggleModal()
}

const fetchCampaigns = () => {
	if (route.name === RouteName.CAMPAIGNS_LIVESTREAM) {
		if (
			campaignsStore.activeCampaigns.data.active.length ||
			campaignsStore.activeCampaigns.data.inactive.length ||
			campaignsStore.activeCampaigns.data.future.length ||
			campaignsStore.activeCampaigns.data.unavailable.length
		) {
			return
		}

		campaignsStore.fetchActiveCampaigns()
	}

	if (route.name === RouteName.CAMPAIGNS_PREROLL) {
		if (!streamerStore.profile?.prerollActive) {
			return router.push({ name: RouteName.CAMPAIGNS_LIVESTREAM })
		}

		if (campaignsStore.activePrerollCampaigns.length) {
			return
		}

		campaignsStore.fetchPrerollActiveCampaigns()
	}

	if (route.name === RouteName.CAMPAIGNS_SPECIAL_PROJECT) {
		if (!streamerStore.profile?.specialProjectsActive) {
			return router.push({ name: RouteName.CAMPAIGNS_LIVESTREAM })
		}

		const { active, inactive, future, unavailable } = campaignsStore.activeSpecialProjectCampaigns.data
		if (active.length || inactive.length || future.length || unavailable.length) {
			return
		}

		campaignsStore.fetchSpecialProjectActiveCampaigns()
	}
}

onMounted(fetchCampaigns)

watch(route, fetchCampaigns)
</script>
