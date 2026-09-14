<template>
  <DashboardSection
    v-if="wallet"
    id="wallet-service-razorpay"
    data-name="wallet-service-razorpay"
    data-test="wallet-service-razorpay"
    class="relative"
    :title="t('wallet.paymentServices.razorPay.title')"
  >
    <div class="mb-4 flex flex-col-reverse items-start sm:flex-row">
      <ElButton
        class="mt-6 w-full sm:mr-5 sm:mt-0 sm:max-w-[220px]"
        type="primary"
        size="large"
        @click="formRef?.toggleFormVisibility"
      >
        <span class="_text-m-bold">{{ t('wallet.paymentServices.razorPay.setUp') }}</span>
      </ElButton>

      <div>
        <div class="mb-2">
          <span class="_text-s-regular mr-2">{{ t('wallet.paymentServices.razorPay.statuses.yourStatus') }}</span>
          <ElTag
            :type="isPayable ? 'success' : 'warning'"
            :closable="false"
            size="small"
            show-icon
            round
          >
            <span class="font-bold uppercase">{{ isPayable ? t('wallet.paymentServices.razorPay.statuses.payable') : t('wallet.paymentServices.razorPay.statuses.notPayable') }}</span>
          </ElTag>
        </div>

        <div>
          <span class="_text-s-regular mr-2">{{ t('wallet.paymentServices.razorPay.statuses.paymentMethod') }}</span>
          <ElTag
            :type="paymentMethod ? 'primary' : 'warning'"
            :closable="false"
            size="small"
            show-icon
            round
          >
            <span class="font-bold uppercase">{{ paymentMethod ? paymentMethod : t('wallet.paymentServices.razorPay.statuses.notAdd') }}</span>
          </ElTag>
        </div>
      </div>
    </div>

    <p class="text-center sm:text-left">
      <TextLink
        class="no-underline"
        :href="$t('links.learnMoreAboutComissions')"
        target="_blank"
      >
        {{ t('wallet.paymentServices.razorPay.learnMore') }}
      </TextLink>
    </p>

    <RazorPayForm ref="formRef" />
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import type { IStreamerWalletRazorPayPayoutMethod } from '@/core/types/streamer-wallet'
import { useLocale } from '@/core/hooks'
import { TextLink } from '@/components'
import { ElButton,ElTag } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Wallet/locales'
import { useWalletStore } from '@/modules/Streamer/views/Wallet/store'

import { RazorPayForm } from './sections'

const { t } = useLocale<typeof messages>(messages)

const walletStore = useWalletStore()

const wallet = computed(() => walletStore.wallet)
const isPayable = computed(() => walletStore.isPayable)

const formRef = ref<InstanceType<typeof RazorPayForm> | null>(null)

const payoutMethod = computed<IStreamerWalletRazorPayPayoutMethod | null>(() => walletStore.payoutMethod as unknown as IStreamerWalletRazorPayPayoutMethod)
const paymentMethod = computed(() => payoutMethod.value?.payload.payoutMode || null)
</script>
