<template>
  <div class="relative flex min-h-screen w-full flex-col lg:flex-row">
    <div class="relative flex w-full grow flex-col items-center justify-center pt-32 sm:flex-row sm:py-28 lg:p-0">
      <div class="absolute left-5 top-9 sm:left-6">
        <AppLogo />
      </div>

      <div class="w-full max-w-[420px] px-5 sm:w-[320px] sm:p-0">
        <slot />
      </div>

      <div class="_text-s-regular sm:absolute sm:bottom-0 sm:left-0 w-full p-4">
        <div class="flex items-center whitespace-nowrap justify-center">
          <div
            v-if="$slots['footer-links']"
            class="flex items-center gap-6"
          >
            <slot name="footer-links" />
          </div>
        </div>
        <div class="flex items-center whitespace-nowrap mt-3 justify-center">
          <ThemeSwitcher class="max-w-[110px]" />
          <LocaleSwitcher />
        </div>
      </div>
    </div>

    <div
      v-if="$slots['side']"
      class="auth__side w-full grow"
    >
      <slot name="side" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AppLogo, LocaleSwitcher, ThemeSwitcher } from '@/components'

defineSlots<{
	default: () => any
	'footer-links'?: () => any
	side?: () => any
}>()

defineProps<{
	title?: string
}>()
</script>
