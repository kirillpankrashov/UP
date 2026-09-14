<template>
  <div class="flex rounded bg-primary-50 p-5">
    <div class="mr-4 shrink-0">
      <ZipIcon
        v-if="type === 'zip'"
        class="h-9 w-9 fill-dark-gray"
      />
      <ImageIcon
        v-else-if="type === 'image'"
        class="h-9 w-9 fill-dark-gray"
      />
      <VideoIcon
        v-else
        class="h-9 w-11 fill-dark-gray"
      />
    </div>

    <div
      v-if="attachment"
      class="max-w-[calc(100%-44px-18px)]"
    >
      <div class="_text-m-bold mb-2 max-w-full overflow-hidden whitespace-nowrap">
        {{ attachment.basename }}
      </div>

      <MiniXButton @click="onClick">
        {{ t('button.delete.static') }}
      </MiniXButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IAttachments,INewlyUploadedAttachment } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { MiniXButton } from '@/components'

import ImageIcon from '@/assets/img/icons/creative-image.svg'
import VideoIcon from '@/assets/img/icons/creative-video.svg'
import ZipIcon from '@/assets/img/icons/creative-zip.svg'

const props = defineProps<{
  attachment: INewlyUploadedAttachment | null
  type: keyof IAttachments
}>()

const emit = defineEmits<{
  (e: 'delete', fileType: keyof IAttachments): void
}>()

const { t } = useLocale({})

const onClick = () => {
	emit('delete', props.type)
}
</script>
