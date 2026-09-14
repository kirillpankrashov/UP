<template>
  <div
    v-if="creative.qr.code && creative.qr.link"
    ref="qrRef"
    data-name="sp-qr-code"
    class="shrink-0 rounded bg-white p-[0.5vw]"
  >
    <VueQr
      v-if="isVisible"
      class="qr-code__image"
      name="widget_qr"
      :text="creative.qr.link"
      :size="size"
      :margin="0"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import VueQr from 'vue-qr/src/packages/vue-qr.vue'

import type { ISpCreative } from '@/modules/SpecialProjectWidget/api'

defineProps<{
  creative: ISpCreative
}>()

const qrRef = ref<HTMLDivElement | null>(null)
const isVisible = ref(false)
const size = ref<number | null>(null)

onMounted(() => {
	size.value = Math.floor((qrRef.value?.parentElement?.clientWidth || window.innerWidth) / 9.5)
	isVisible.value = true
})
</script>

<style lang="scss" scoped>
img {
	display: block !important;
}
</style>
