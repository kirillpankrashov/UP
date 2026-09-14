<template>
  <div
    v-if="isPublic"
    class="w-full overflow-hidden"
  >
    <PublicHeader />

    <div class="mx-auto mb-16 w-full max-w-screen-xl px-5 sm:px-8">
      <AnalyticsContent />
    </div>

    <PublicPromo />
  </div>
  <div v-else>
    <DashboardLayout :full-width="true">
      <AnalyticsContent />
    </DashboardLayout>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { RouteName } from '@/core/router'
import { DashboardLayout } from '@/components/layouts'

import AnalyticsContent from './AnalyticsContent.vue'
import { PublicHeader, PublicPromo } from './sections'

const route = useRoute()

const isPublic = computed(() => route.name === RouteName.PUBLIC_CAMPAIGN_ANALYTICS)
</script>
