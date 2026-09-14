<template>
  <div
    v-if="LINK_ENABLED"
    id="campaigns-uplify-link"
    data-name="campaigns-uplify-link"
    class="mb-8"
  >
    <div
      class="_text-m-bold mb-3"
      v-html="t('campaigns.freemium.title')"
    />

    <ElAlert
      type="success"
      :closable="false"
      class="p-3"
    >
      <div class="flex">
        <div class="mr-2 text-[14px] leading-none">
          👍
        </div>

        <div class="_text-m-regular">
          <b
            class="_text-m-bold"
            v-html="t('campaigns.freemium.msg.title')"
          />
          <br><br>
          <p v-html="t('campaigns.freemium.msg.text')" />
          <br>

          <router-link
            v-if="streamer?.freemiumActive"
            :to="{name: RouteName.LINK}"
            class="no-underline"
          >
            <TextLink>
              {{ t('campaigns.freemium.msg.link.text') }}
            </TextLink>
          </router-link>

          <TextLink
            v-else
            @click="onClick"
          >
            {{ t('campaigns.freemium.msg.getAccess') }}
          </TextLink>
        </div>
      </div>
    </ElAlert>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { LINK_ENABLED } from '@/core/consts'
import { useLocale } from '@/core/hooks'
import { TextLink } from '@/components'
import { ElAlert } from '@/components/element-plus'
import { RouteName } from '@/modules/Streamer/router'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

const { t } = useLocale<typeof messages>(messages)

const streamerStore = useStreamerStore()
const streamer = computed(() => streamerStore.profile)

const onClick = () => {
	// @ts-ignore
	window?.Intercom('showNewMessage', t('intercom.freemium'))
}
</script>
