<template>
  <div
    data-test="values-item"
    class="flex flex-col border-b border-light-gray pb-6 last-of-type:border-0 last-of-type:p-0 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-3"
    v-loading="isLoading"
  >
    <div class="mb-6 shrink-0">
      <slot />
      <div
        v-if="cash"
        class="_headline !font-normal"
        data-test="values-item-cash"
      >
        {{ cash }}
      </div>
      <div
        class="_text-s-regular mt-2"
        data-test="values-item-caption"
        v-html="caption"
      />
    </div>
    <router-link
      v-if="link"
      :to="link"
      data-test="values-item-link"
      class="_text-m-regular mt-6 flex w-full items-center text-primary no-underline"
    >
      {{ linkText }}
      <span class="ml-auto inline-block transition-all">
        <LinkArrow />
      </span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

import LinkArrow from '@/assets/img/icons/link-arrow.svg'

defineProps<{
  cash?: string | null
  caption: string
  linkText?: string
  link?: RouteLocationRaw
  isLoading?: boolean
}>()
</script>
