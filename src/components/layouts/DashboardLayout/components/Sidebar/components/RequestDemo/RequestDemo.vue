<template>
  <div
    id="dashboard-layout-sidebar-logout"
    class="mb-6"
  >
    <ElButton
      class="w-full text-[12px]"
      type="primary"
      size="large"
      plain
      @click="onClick"
    >
      <span class="_text-s-bold">{{ t('requestDemo') }}</span>
    </ElButton>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElButton } from '@/components/element-plus'
import { messages } from '@/components/layouts/DashboardLayout/components/Sidebar/locales'

const { t } = useLocale<typeof messages>(messages)

const onClick = () => {
	window.Intercom('sendNewMessage', t('sidebar.requestDemo'))
}
</script>
