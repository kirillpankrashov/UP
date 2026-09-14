<template>
  <div v-if="model.gallery">
    <div class="grid w-full grid-cols-2">
      <div classs="h-full overflow-auto">
        <Codemirror
          v-model="model.gallery.styles"
          :extensions="[css()]"
        />
      </div>
      <div class="flex justify-center bg-primary-50 p-8">
        <div class="h-full w-[600px]">
          <div class="sticky top-4 rounded-lg bg-white p-6 text-black shadow-lg">
            <PreviewExtensionGallery :gallery="model.gallery" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { css } from '@codemirror/lang-css'

import { Codemirror } from 'vue-codemirror'

import type { IGallery } from '@/core/types'
import { PreviewExtensionGallery } from '@/components'

const model = defineModel<{
	gallery: IGallery | undefined
}>({ required: true })
</script>
