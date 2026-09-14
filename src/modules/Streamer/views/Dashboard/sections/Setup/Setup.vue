<template>
  <section
    v-if="!checkList?.close && !dashboardStore.isFetchingChecklist"
    id="dashboard-setup"
    class="relative border-t border-light-gray pt-8 sm:pb-8"
    v-loading="dashboardStore.isFetchingChecklist"
  >
    <Advice
      v-if="!dashboardStore.isFetchingChecklist"
      ref="adviceRef"
      type="primary"
      class="sm:absolute sm:left-[calc(100%+24px)] sm:top-8"
      :title="t('dashboard.advice.title')"
      :label="t('dashboard.advice.heading')"
    >
      <p class="_text-m-regular">
        {{ t('dashboard.advice.description') }}{{ t('dashboard.advice.steps', { n: freemiumActive ? 6 : 5 }) }}.
        <br><br>
        {{ t('dashboard.advice.descriptionEnd') }}
      </p>
    </Advice>

    <div class="flex items-start">
      <div class="_headline-2 !font-normal">
        {{ t('dashboard.setup.finishYourSetup') }}
        <HelpIcon
          v-if="appStore.isMobile"
          @click="adviceRef?.toggleModal"
          class="inline-block h-4 w-4 fill-primary"
        />
      </div>

      <button
        v-if="checkList?.completed"
        data-test="dashboard-setup-close-checklist-btn"
        class="_text-s-regular ml-auto flex border-none bg-transparent p-0 hover:text-primary"
        @click="dashboardStore.closeCheckList"
      >
        {{ t('dashboard.setup.closeChecklist') }}
        <CloseIcon
          class="inline-block h-4 w-4 fill-gray align-bottom"
        />
      </button>
    </div>

    <div
      data-test="dashboard-setup-steps-left"
      class="_text-s-regular mt-2"
    >
      {{ hintText }}
    </div>

    <div
      v-if="checkList"
      class="mt-6 grid gap-y-6 sm:gap-y-4"
    >
      <Step
        :index-id="1"
        :title="t('dashboard.setup.steps.fillYourProfile')"
        :guide-url="t('dashboard.setup.guides.fillYourProfile')"
        :completed="checkList?.filledProfile"
        :route="{ name: RouteName.PROFILE }"
      />
      <Step
        :index-id="2"
        :title="t('dashboard.setup.steps.configureWidget')"
        :guide-url="t('dashboard.setup.guides.configureWidget')"
        :completed="checkList?.configuredWidget"
        :route="{ name: RouteName.SETTINGS, hash: '#settings-widgetlink' }"
      />

      <Step
        :index-id="3"
        :title="t('dashboard.setup.steps.connectChatbot')"
        :guide-url="t('dashboard.setup.guides.connectChatbot')"
        :completed="checkList?.connectedChatbot"
        :route="{ name: RouteName.SETTINGS, hash: '#settings-chatbot' }"
      />

      <!-- TODO: уточнить нужна ли ссылка -->
      <template v-if="!checkList?.connectedChatbot">
        <div class="_text-m-regular -mt-1 sm:flex sm:justify-between">
          <div>
            {{ t('dashboard.setup.shareChatbotSetup') }}
          </div>
          <TextLink
            class="sm:w-56"
            :href="t('links.takeSurveyLink')"
            target="_blank"
          >
            {{ t('dashboard.setup.goThroughTheSurvey') }}
          </TextLink>
        </div>
      </template>

      <Step
        :index-id="4"
        :title="t('dashboard.setup.steps.connectExtension')"
        :guide-url="t('dashboard.setup.guides.connectExtension')"
        :completed="settingsStore.widget?.extensionEnabled ?? false"
        :route="{ name: RouteName.SETTINGS, hash: '#settings-twitch-extension-section' }"
      />

      <Step
        :index-id="5"
        :title="t('dashboard.setup.steps.getFirstSponsorship')"
        :guide-url="t('dashboard.setup.guides.getFirstSponsorship')"
        :completed="checkList?.displayedAd"
        :route="{ name: RouteName.CAMPAIGNS_LIVESTREAM }"
      />

      <Step
        v-if="LINK_ENABLED && streamer?.freemiumActive"
        :index-id="6"
        :title="t('dashboard.setup.steps.freemium')"
        :guide-url="t('dashboard.setup.guides.freemium')"
        :completed="checkList?.goalCreated"
        :route="{ name: RouteName.LINK }"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { LINK_ENABLED } from '@/core/consts'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { Advice, TextLink } from '@/components'
import { RouteName } from '@/modules/Streamer/router'
import { messages } from '@/modules/Streamer/views/Dashboard/locales'
import { useDashboardStore } from '@/modules/Streamer/views/Dashboard/store'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import { calcProgress } from './helpers/calcProgress'
import { Step } from './components'

import CloseIcon from '@/assets/img/icons/close-menu-icon.svg'
import HelpIcon from '@/assets/img/icons/help-icon.svg'

const { t } = useLocale<typeof messages>(messages)

const appStore = useAppStore()
const dashboardStore = useDashboardStore()
const streamerStore = useStreamerStore()
const settingsStore = useSettingsStore()
const adviceRef = ref<InstanceType<typeof Advice> | null>(null)

const checkList = computed(() => dashboardStore.checklist)
const streamer = computed(() => streamerStore.profile)
const freemiumActive = computed(() => !!streamer.value?.freemiumActive)

const hintText = computed(() => {
	if (!checkList.value) {
		return ''
	}
	const { stepsLeft, timeLeft } = calcProgress(checkList.value, LINK_ENABLED && freemiumActive.value)

	if (stepsLeft === 0) {
		return `${stepsLeft} ${t('dashboard.setup.stepsLeft', { n: stepsLeft })}`
	}

	return `${stepsLeft} ${t('dashboard.setup.stepsLeft', { n: stepsLeft })} · ${t('dashboard.setup.aboutXMin', { min: timeLeft })}`
})
</script>
