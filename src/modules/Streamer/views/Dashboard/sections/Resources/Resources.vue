<template>
  <div id="dashboard-resources">
    <section class="grid gap-4 border-t border-light-gray pt-4 sm:grid-cols-3 sm:gap-[10px] sm:py-8">
      <div class="border-b border-light-gray pb-6 pr-3 sm:min-h-[48px] sm:border-b-0 sm:border-r sm:pb-0">
        <a
          :href="t('links.uplifyDiscord')"
          target="_blank"
          class="resource-link"
        >{{ t('dashboard.resources.discordText') }}</a>
      </div>

      <!-- <div class="border-b border-light-gray pb-6 pr-3 sm:min-h-[48px] sm:border-b-0 sm:border-r sm:pb-0">
        <a
          href="https://www.uplify.app/blog/home?utm_source=dashboard-page"
          target="_blank"
          class="resource-link"
        >{{ t('dashboard.resources.blogText') }}</a>
      </div> -->

      <div class="pb-6 pr-3 sm:min-h-[48px] sm:pr-3">
        <a
          :href="t('links.uplifyHelpCenter')"
          target="_blank"
          class="resource-link"
        >{{ t('dashboard.resources.helpCenterText') }}</a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { messages } from '@/modules/Streamer/views/Dashboard/locales'

const { t } = useLocale<typeof messages>(messages)
</script>

<style lang="scss" scoped>
.resource-link {
	@apply _text-m-regular relative block pr-10 text-dark-gray no-underline;

	&:after {
		@apply block content-['↗'] absolute transition-all duration-[0.2s] ease-[ease] right-0 top-0;
	}

	&:hover {
		&:after {
			@apply translate-x-[5px] translate-y-[-5px];
		}
	}
}
</style>
