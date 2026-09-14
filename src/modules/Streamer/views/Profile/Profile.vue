<template>
  <DashboardLayout id="profile">
    <DashboardTitle :title="t('profile.header.title')" />
    <Common />
    <Platforms />
    <Discord />
    <Deactivation />
  </DashboardLayout>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { DashboardLayout, DashboardTitle } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Profile/locales'

import { Common, Deactivation, Discord, Platforms } from './sections'

const { t } = useLocale<typeof messages>(messages)
</script>
