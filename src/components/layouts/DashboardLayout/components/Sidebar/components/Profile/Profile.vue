<template>
  <ElPopover
    v-if="!appStore.isMobile"
    class="sidebar-profile"
    placement="left-start"
    :visible-arrow="false"
    v-model="visiblePopover"
    :trigger="'click'"
    :width="200"
  >
    <template #reference>
      <RouterLink />
    </template>
    <Links @click="visiblePopover = false" />
  </ElPopover>

  <div
    v-else
    class="sidebar-profile"
    @click="onProfileClick"
  >
    <RouterLink />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAppStore } from '@/core/store'
import { ElPopover } from '@/components/element-plus'
import { RouteName as StreamerRouteName } from '@/modules/Streamer/router'

import { Links, RouterLink } from './components'

const router = useRouter()

const appStore = useAppStore()

const visiblePopover = ref(false)

const emit = defineEmits(['toggleMenu'])

const onProfileClick = () => {
	router.push({ name: StreamerRouteName.PROFILE })
	emit('toggleMenu')
}
</script>
