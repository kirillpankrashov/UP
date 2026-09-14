<template>
  <div
    class="form-dnd"
    :class="{'_has-error': isError, '_is-image': !$slots.default}"
  >
    <DragNDrop
      :accept="options.accept"
      :max-size-mb="options.maxSizeMb"
      @change="$emit('change', $event)"
      @error="$emit('error', $event)"
    >
      <slot v-if="$slots.default" />

      <template v-else>
        <CreativeImgIcon class="mr-9 h-9 w-9 fill-dark-gray" />

        <div class="mr-auto text-left">
          <div class="_text-m-bold">
            {{ t('placeholder.dragAFile') }}
          </div>
          <div class="_text-s-regular mt-2">
            {{ t('placeholder.dragImageHint', { size: options.maxSizeMb || 1 }) }}
          </div>
        </div>
      </template>
    </DragNDrop>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { DragNDrop } from '@/components'
import { type IAcceptValues } from '@/components/DragNDrop/types'

import CreativeImgIcon from '@/assets/img/icons/creative-image.svg'

defineEmits(['change', 'error'])

defineProps<{
  isError: boolean
  options: {
    maxSizeMb: number
    accept: keyof IAcceptValues
  }
}>()

const { t } = useLocale({})
</script>

<style lang="scss" scoped>
.form-dnd._is-image {
  :deep(.uplify-drag-n-drop__container) {
    @apply h-auto sm:flex-row items-center p-6 sm:flex;
  }

  :deep(.uplify-drag-n-drop__content) {
    @apply flex w-full items-center;
  }

  :deep(.uplify-drag-n-drop__label) {
    @apply mt-6 sm:mt-0;
  }

  &._has-error {
    :deep(.uplify-drag-n-drop__container) {
      @apply shadow-danger;
    }
  }
}
</style>
