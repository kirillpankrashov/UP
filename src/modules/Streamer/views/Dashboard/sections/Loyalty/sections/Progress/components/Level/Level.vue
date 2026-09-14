<template>
  <div
    class="progress__level"
    :class="{
      '_selected': selectedLevel === level,
      '_current-level': currentLevel === level,
    }"
    @click="setSelectedLevel(level)"
  >
    <div class="progress__wrap">
      <component
        :is="icon"
        class="svg-icon h-8 w-8"
        :class="{'!fill-success': level === 0}"
      />
      <span class="_text-caption-caps">{{ t('dashboard.levels.lvl') }} {{ level }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { messages } from '@/modules/Streamer/views/Dashboard/locales'
import { useDashboardStore } from '@/modules/Streamer/views/Dashboard/store'

import Level0Icon from '@/assets/img/icons/level-0.svg'
import Level1Icon from '@/assets/img/icons/level-1.svg'
import Level2Icon from '@/assets/img/icons/level-2.svg'
import Level3Icon from '@/assets/img/icons/level-3.svg'
import Level4Icon from '@/assets/img/icons/level-4.svg'
import Level5Icon from '@/assets/img/icons/level-5.svg'

const props = defineProps<{
	level: number
}>()

const { t } = useLocale<typeof messages>(messages)

const dashboardStore = useDashboardStore()

const icon = computed(() => {
	switch (props.level) {
		case 1:
			return Level1Icon
		case 2:
			return Level2Icon
		case 3:
			return Level3Icon
		case 4:
			return Level4Icon
		case 5:
			return Level5Icon
		default:
			return Level0Icon
	}
})

const currentLevel = computed(() => dashboardStore.tier?.data?.current.level)
const selectedLevel = computed(() => dashboardStore.tier?.selectedLevel)

const setSelectedLevel = (level: number) => {
	if (level === 0) {
		return
	}
	dashboardStore.tier.selectedLevel = level
}

defineExpose({
	setSelectedLevel,
})
</script>

<style lang="scss" scoped>
.progress {
  &__level {
		@apply relative cursor-pointer shrink-0;

    &._current-level {
      .progress__wrap {
				@apply bg-success border-success;

        .svg-icon {
					@apply fill-white;
        }

        span {
					@apply text-success;
        }
      }

      & ~ .progress__level {
        .progress__wrap {
          @apply border-light-gray;

          .svg-icon {
						@apply fill-light-gray;
          }

          span {
						@apply text-light-gray;
          }
        }

        /* Не достигнутый выбранный */
        &._selected {
          .progress__wrap {
						@apply border-primary-300;

            .svg-icon {
							@apply fill-primary-300;
            }

            span {
							@apply text-primary-300;
            }
          }
        }
      }

      /* Достигнутый выбранный (текущий) */
      &._selected {
        .progress__wrap {
					@apply border-primary bg-primary;

          .svg-icon {
						@apply fill-white
          }

          span {
						@apply text-primary
          }
        }
      }
    }

    &._selected {
      &:after {
        @apply opacity-100
      }
    }

    /* Достигнутый выбранный (не текущий) */
    &._selected {
      &:after {
				@apply opacity-100;
      }
      .progress__wrap {
				@apply border-primary;

        .svg-icon {
					@apply fill-primary;
        }

        span {
          @apply text-primary;
        }
      }
    }

    &:after {
			@apply content-[''] absolute -translate-x-2/4 translate-y-full w-0 h-0 opacity-0 border-b-[10px] border-b-[#F7F7F7] border-x-[10px] border-x-transparent border-solid left-2/4 -bottom-6;
    }
  }

  &__wrap {
		@apply relative flex items-center justify-center w-10 h-10 border border-success rounded-full border-solid;

    :deep(.svg-icon) {
			@apply fill-success;
    }

    span {
			@apply absolute w-[50px] text-center -translate-x-2/4 translate-y-full text-success left-2/4 -bottom-1;
    }
  }
}
</style>
