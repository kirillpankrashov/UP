<template>
  <div
    data-name="streamer-link-progress-card"
    class="rounded bg-primary-50 p-4"
    data-test="link-progress-card"
  >
    <div class="flex w-full items-start">
      <div
        class="_text-m-bold mr-6"
        data-test="link-progress-card-title"
      >
        {{ title }}
      </div>
      <div class="ml-auto grid grid-flow-col items-center gap-x-2">
        <button
          class="block border-none bg-transparent outline-none"
          @click="emit('onEdit')"
          data-test="link-progress-card-edit-btn"
        >
          <EditIcon class="h-4 w-4 fill-gray hover:fill-primary" />
        </button>

        <button
          class="block border-none bg-transparent outline-none"
          @click="emit('onDelete')"
          data-test="link-progress-card-delete-btn"
        >
          <CloseIcon class="h-4 w-4 fill-gray hover:fill-primary" />
        </button>
      </div>
    </div>

    <div class="mt-4 grid gap-y-2">
      <div
        class="relative flex min-h-[24px] items-center justify-between overflow-hidden rounded bg-primary-100 px-2 py-1"
        v-for="(item, idx) in items"
        :key="idx"
        :data-test="`link-progress-card-item-${idx}`"
      >
        <div
          class="absolute left-0 top-0 h-full rounded bg-primary-400"
          :style="{width: item.progressPercent + '%'}"
          :data-test="`link-progress-card-${idx}-progress`"
        />
        <span
          class="_text-m-regular relative z-10 inline-block w-[calc(100%-60px)] shrink-0"
          :data-test="`link-progress-card-${idx}-text-left`"
        >{{ item.textLeft }}</span>
        <span
          class="_text-m-regular relative z-10 inline-block"
          :data-test="`link-progress-card-${idx}-text-right`"
        >{{ item.textRight }}</span>
      </div>
    </div>

    <div
      class="_text-s-regular mt-4"
      data-test="link-progress-card-footer"
    >
      {{ footerText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import CloseIcon from '@/assets/img/icons/close-menu-icon.svg'
import EditIcon from '@/assets/img/icons/edit.svg'

defineProps<{
  title: string
  items: Array<{
    textLeft?: string
    textRight?: string
    progressPercent: number
  }>
  footerText: string
}>()

const emit = defineEmits(['onDelete', 'onEdit'])
</script>
