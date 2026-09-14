<template>
  <DashboardSection
    v-if="wallet"
    id="wallet-service-default"
    data-name="wallet-service-default"
    data-test="wallet-service-default"
    class="relative"
    :title="t('wallet.paymentServices.all.title')"
  >
    <ElButton
      class="mb-4 w-full sm:max-w-[220px]"
      type="primary"
      size="large"
      @click="openForm"
    >
      <span class="_text-m-bold">{{ t('wallet.paymentServices.all.setUp') }}</span>
    </ElButton>

    <div class="_text-m-regular">
      <p class="text-center sm:text-left">
        <TextLink
          class="no-underline"
          :href="t('links.learnMoreAboutComissions')"
          target="_blank"
        >
          {{ t('wallet.paymentServices.all.learnMore') }}
        </TextLink>
      </p>
    </div>
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { useLocale } from '@/core/hooks'
import { TextLink } from '@/components'
import { ElButton } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { RouteName } from '@/modules/Streamer/router'
import { messages } from '@/modules/Streamer/views/Wallet/locales'
import { useWalletStore } from '@/modules/Streamer/views/Wallet/store'

const { t } = useLocale<typeof messages>(messages)

const router = useRouter()

const walletStore = useWalletStore()

const wallet = computed(() => walletStore.wallet)

const openForm = () => {
	router.push({ name: RouteName.TIPALTI_ONBOARDING })
}
</script>
