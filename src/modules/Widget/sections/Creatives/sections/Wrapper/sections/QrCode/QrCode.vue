<template>
  <div
    v-if="link"
    ref="qrRef"
    data-name="qr-code"
    class="absolute bottom-4 right-4 rounded bg-white p-[0.5vw]"
    :class="{'bottom-auto top-4': isTopRight}"
  >
    <!-- <div
      v-if="ctaText"
      class="_text-l-bold mb-3 text-center"
    >
      {{ ctaText }}
    </div> -->
    <VueQr
      v-if="isVisible"
      class="qr-code__image"
      name="widget_qr"
      :text="link"
      :size="size"
      :margin="0"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import VueQr from 'vue-qr/src/packages/vue-qr.vue'

import { AdFormat } from '@/core/types'
import { Widget } from '@/modules/Widget/class/Widget'
import type { ICreative, IDemoCreative } from '@/modules/Widget/types'

const props = defineProps<{
  link: string | null
  widget: Widget
  creative: ICreative | IDemoCreative
}>()

const qrRef = ref<HTMLDivElement | null>(null)
const isVisible = ref(false)

const widget = props.widget.data

const size = ref<number | null>(null)

const isPip = computed(() => props.creative.adSet.format === AdFormat.PIP)
const isLeaderboard = computed(() => props.creative.adSet.format === AdFormat.LEADERBOARD)
const isTopRight = computed(() => {
	return (widget.value.advertising.position === 'right_bottom_corner' && isPip.value) ||
    (widget.value.leaderboard.position === 'top' && isLeaderboard.value)
})
const ctaText = computed(() => props.creative?.companion?.cta)

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
