<template>
  <DashboardLayout>
    <DashboardTitle :title="title" />

    <DashboardSection>
      <template #left>
        <div>
          <div class="_text-m-bold mb-6">
            {{ t('profile.settings.title') }}
          </div>
          <div v-if="showAgencyInfo">
            <div class="_text-caption-caps mb-3">
              {{ t('profile.agency.title') }}
            </div>
            <div class="_text-m-regular truncate">
              {{ profile?.agency?.title }}
            </div>
          </div>
        </div>
      </template>

      <SettingsForm />
    </DashboardSection>

    <DashboardSection :title="t('profile.password.title')">
      <PasswordForm />
    </DashboardSection>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTitle } from '@vueuse/core'

import { useLocale } from '@/core/hooks'
import { DashboardLayout, DashboardSection, DashboardTitle } from '@/components/layouts'
import { messages } from '@/modules/Partner/views/Profile/locales'
import { usePartnerStore } from '@/modules/Partner/views/Profile/store'

import { PasswordForm, SettingsForm } from './sections'

const { t } = useLocale<typeof messages>(messages)

const title = computed(() => t('profile.header.title'))

useTitle(title)

const partnerStore = usePartnerStore()

const profile = computed(() => partnerStore.profile)

const showAgencyInfo = computed(() => {
	return profile.value?.agency && profile.value.agency?.id !== 1
})
</script>
