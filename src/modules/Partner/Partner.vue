<template>
  <div
    v-loading="isDictsFetching"
    :class="{'h-full w-full overflow-hidden': isDictsFetching}"
  >
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

// import { useAgencyStore } from 'Partner/pages/PartnerCreators/store/agency'
import { useModuleRouter } from '@/core/hooks'
import { useDictStore } from '@/core/store'
// import partnerStore from 'Partner/store'
import { partnerRouter } from '@/modules/Partner/router'

const router = useRouter()
const { mergeRoutes } = useModuleRouter()

const discStore = useDictStore()
// const agencyStore = useAgencyStore()

const isDictsFetching = computed(() => discStore.isFetching)

onBeforeMount(async () => {
	await router.isReady()
	await mergeRoutes(partnerRouter)

	// if (!vm.$store.hasModule('partner')) {
	//   vm.$store.registerModule('partner', partnerStore)
	// }

	// agencyStore.getData()
})

// TODO: remove isDictsFetching v-loading when all routes will have proper loading states with skeletons
</script>
