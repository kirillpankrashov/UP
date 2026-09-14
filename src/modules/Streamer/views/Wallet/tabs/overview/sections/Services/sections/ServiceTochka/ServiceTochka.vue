<template>
  <DashboardSection
    v-if="wallet"
    id="wallet-service-tochka"
    data-name="wallet-service-tochka"
    data-test="wallet-service-tochka"
    class="relative"
    :title="t('wallet.paymentServices.tochkaBank.title')"
  >
    <div
      v-if="!isPayable"
      class="mb-6 sm:max-w-[460px]"
    >
      <ElAlert
        :title="t('wallet.tochkaAdvice.title')"
        type="warning"
        :closable="false"
        show-icon
      >
        <p class="_text-m-regular">
          {{ t('wallet.tochkaAdvice.description') }}
        </p>
      </ElAlert>
    </div>

    <div class="w-full">
      <div class="mb-4 flex flex-col-reverse items-start sm:flex-row">
        <ElButton
          class="mt-6 w-full sm:mr-5 sm:mt-0 sm:max-w-[220px]"
          size="large"
          type="primary"
          @click="formRef?.toggleFormVisibility"
        >
          <span class="_text-m-bold">{{ t('wallet.paymentServices.tochkaBank.setUp') }}</span>
        </ElButton>

        <div class="_text-m-regular">
          <p class="mt-4 text-center sm:text-left">
            <TextLink
              class="no-underline"
              :href="t('links.learnMoreAboutComissions')"
              target="_blank"
            >
              {{ t('wallet.paymentServices.tochkaBank.learnMore') }}
            </TextLink>
          </p>
        </div>
      </div>

      <div class="wallet-balance-section__setup-status">
        <span class="_text-s-regular">{{ t('wallet.paymentServices.tochkaBank.statuses.yourStatus') }}</span>
        <div class="ml-2 inline-block">
          <ElTag
            :type="isPayable ? 'success' : 'warning'"
            :closable="false"
            size="small"
            show-icon
            round
          >
            <span class="font-bold uppercase">{{ isPayable ? t('wallet.paymentServices.tochkaBank.statuses.payable') : t('wallet.paymentServices.tochkaBank.statuses.notPayable') }}</span>
          </ElTag>
        </div>
      </div>
    </div>

    <TochkaForm ref="formRef" />
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { useLocale } from '@/core/hooks'
import { TextLink } from '@/components'
import { ElAlert, ElButton, ElTag } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Wallet/locales'
import { useWalletStore } from '@/modules/Streamer/views/Wallet/store'

import { TochkaForm } from './sections'

const { t } = useLocale<typeof messages>(messages)

const walletStore = useWalletStore()
const wallet = computed(() => walletStore.wallet)
const isPayable = computed(() => walletStore.isPayable)

const formRef = ref<InstanceType<typeof TochkaForm> | null>(null)
</script>
