<template>
  <ElButton
    class="relative m-0 h-12 w-full max-w-full cursor-pointer truncate rounded text-center text-sm transition-all"
    data-test-id="button"
    :class="{
      'is_disabled pointer-events-none': disabled,
      'is_attached cursor-default': attached,
    }"
    :loading="loading || attaching"
    :plain="plain || attaching || attached"
    @click="emit('open-scope')"
  >
    <div class="static inline w-full pl-8">
      <div
        v-if="!loading"
        class="absolute left-3 top-[50%] translate-y-[-50%]"
      >
        <slot name="icon" />
      </div>
      <slot />
    </div>
  </ElButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Logger } from '@/core/helpers'
import { ElButton } from '@/components/element-plus'

import { streamerAuthorize } from './api/streamerAuthorize'

const props = defineProps<{
  requestUrl: string
  icon?: string
  disabled?: boolean
  plain?: boolean
  attaching?: boolean
  attached?: boolean
  demoAuth?: boolean
}>()

const emit = defineEmits(['open-scope'])

const loading = ref(false)

const auth = async () => {
	if (props.disabled || props.attached) return

	if (props.demoAuth) {
		localStorage.removeItem('is-streamer-demo')
	}

	try {
		loading.value = true

		const res = await streamerAuthorize(props.requestUrl)

		window.location = res as any
	}
	catch (err) {
		Logger.error('Error authorizing streamer', true, err)
	}
	finally {
		loading.value = false
	}
}

defineExpose({
	auth,
})
</script>
