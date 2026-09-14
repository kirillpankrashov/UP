<template>
  <div
    data-name="partner-campaign-layout-sidebar"
    class="fixed left-0 top-0 flex h-screen w-[200px] flex-col px-6 pb-4 pt-8"
  >
    <div class="flex-1 overflow-y-auto overflow-x-hidden">
      <router-link
        :to="{ name: RouteName.BRAND_AWARENESS_CAMPAIGNS }"
        class="relative mb-10 inline-block"
      >
        <AppLogo />
      </router-link>

      <div>
        <div v-if="isNewEntity">
          <ul class="sidebar-nav-new-campaign">
            <li class="mb-6">
              <div class="_text-m-regular rounded bg-primary-50 px-2 py-1 text-primary">
                {{ t('sidebar.newCampaign') }}
              </div>
            </li>

            <li class="mb-3">
              <div class="_text-m-regular cursor-not-allowed px-2 py-1 text-lightest-gray">
                {{ t('sidebar.group') }}
              </div>
            </li>
          </ul>
        </div>

        <div v-else>
          <SidebarSkeleton v-if="!adEntityStructure" />

          <ul
            v-else
            class="mt-1"
          >
            <NavItem
              :to="{name: RouteName.CAMPAIGN_EDIT, params: { campaignSlug: adEntityStructure.slug }}"
              :title="adEntityStructure.title"
              class="!mb-6"
            />

            <NavItem
              v-for="group in adEntityStructure.adSets"
              :key="group.slug"
              :to="{name: RouteName.ADSET_EDIT, params: { adsetSlug: group.slug }}"
              :title="group.title"
              class="!mb-3"
            >
              <template v-if="'ads' in group">
                <ul class="pl-3">
                  <NavItem
                    v-for="ad in group.ads"
                    :key="ad.id"
                    :to="{name: RouteName.CREATIVE_EDIT, params: { adsetSlug: group.slug, creativeSlug: ad.slug }}"
                    :title="ad.title || 'Creative ' + ad.slug"
                  />

                  <NavItem
                    :to="{name: RouteName.CREATIVE_CREATE, params: { campaignSlug: adEntityStructure.slug, adsetSlug: group.slug }}"
                    :title="t('sidebar.newCreative')"
                    is-new
                  />
                </ul>
              </template>
            </NavItem>

            <NavItem
              :to="{name: 'create-group'}"
              :title="t('sidebar.newGroup')"
              is-new
            />
          </ul>
        </div>
      </div>
    </div>

    <ThemeSwitcher class="mb-3" />
    <LocaleSwitcher class="ml-[-7px]" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useLocale } from '@/core/hooks'
import { AppLogo, LocaleSwitcher, ThemeSwitcher } from '@/components'
import { messages } from '@/modules/Partner/components/CampaignLayout/locales'
import { RouteName } from '@/modules/Partner/router'
import type { ICampaignStructure } from '@/modules/Partner/views/FormCampaign/types'

import { NavItem } from './components'
import SidebarSkeleton from './SidebarSkeleton.vue'

defineProps<{
  adEntityStructure: ICampaignStructure | null
}>()

const { t } = useLocale<typeof messages>(messages)

const route = useRoute()

const isNewEntity = computed(() => [RouteName.CAMPAIGN_CREATE].includes(route.name as RouteName))
</script>
