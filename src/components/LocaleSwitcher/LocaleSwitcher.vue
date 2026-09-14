<template>
  <ElSelect
    class="locale-switcher"
    popper-class="locale-switcher-popper"
    :placeholder="t('translationLanguage')"
    v-model="appStore.appLocale"
    @change="appStore.setLocale"
  >
    <template #prefix>
      <EarthIcon
        class="el-input__earth-icon"
        width="15"
        height="15"
      />
    </template>
    <ElOption
      v-for="item in locales"
      :key="item.id"
      :label="item.title"
      :value="item.id"
    />
  </ElSelect>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'

import { useLocale } from '@/core/hooks'
import { useAppStore, useDictStore } from '@/core/store'
import { ElOption, ElSelect } from '@/components/element-plus'
import { messages } from '@/components/LocaleSwitcher/locales'

import EarthIcon from '@/assets/img/icons/earth.svg'

const { t } = useLocale<typeof messages>(messages)

const appStore = useAppStore()
const dictStore = useDictStore()

const locales = computed(() => dictStore.all?.locales || [])

const checkLocale = () => {
	if (!appStore.auth?.user) {
		return
	}

	const userLocale = appStore.auth.locale

	if (userLocale !== appStore.appLocale) {
		appStore.setLocale(userLocale)
	}
}

onMounted(checkLocale)

watch(appStore.auth, checkLocale, { deep: true })
</script>

<style lang="scss">
.locale-switcher-popper {
  min-width: 130px !important;
  border: none !important;

  .el-select-dropdown__item {
    &.selected {
      font-weight: normal;
    }

    &.hover {
      background-color: transparent;
    }

		&:hover {
      background-color: rgba(var(--el-color-primary-rgb), 0.05);
    }
  }
}
</style>

<style lang="scss" scoped>
.locale-switcher {
	width: 100px;

	:deep(.el-select__wrapper) {
		box-shadow: none !important;
	}

	:deep(.el-select__selected-item) {
		border: none;
		font-size: 12px;
		color: var(--el-color-dark-gray);
		transition: var(--el-transition-all);
		padding-right: 0;
	}

	:deep(.el-input__earth-icon) {
		fill: var(--el-text-color-regular);
		position: relative;
		transition: var(--el-transition-all);
	}

	:deep(.el-select__suffix) {
		display: none;
		right: 0;
	}

	:deep(.el-select__wrapper.is-focused) {
		box-shadow: none !important;
	}

	:deep(.el-select__wrapper.is-focused .el-select__selected-item) {
		color: var(--el-color-primary);
	}

	:deep(.el-select__wrapper.is-focused .el-input__icon:before) {
		color: var(--el-color-primary);
	}

	:deep(.el-select__wrapper.is-focused .el-input__earth-icon) {
		fill: var(--el-color-primary);
	}

	:deep(.el-select__wrapper:hover) {
		box-shadow: none !important;
	}

	:deep(.el-select__wrapper:hover .el-select__selected-item) {
		color: var(--el-text-color-primary);
	}

	:deep(.el-select__wrapper:hover .el-input__icon:before) {
		color: var(--el-text-color-primary);
	}
}
</style>
