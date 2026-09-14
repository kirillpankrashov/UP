<template>
  <div
    data-name="sp-custom"
    class="h-[1080px] w-[1920px]"
  >
    <iframe
      v-if="path"
      class="h-full w-full"
      :src="path"
      frameborder="0"
      scrolling="no"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { ISpCreative } from '@/modules/SpecialProjectWidget/api'

const props = defineProps<{
  creative: ISpCreative
}>()

const path = computed(() => props.creative.attachments.zip?.path ?? null)
</script>
