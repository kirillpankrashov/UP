<template>
  <div class="h-screen w-screen">
    <iframe
      width="100%"
      height="100%"
      v-if="src"
      :src="src"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CryptoJS from 'crypto-js'

import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

const streamerStore = useStreamerStore()

const src = ref('')

onMounted(() => {
	if (!streamerStore.streamerId) return

	const payeeId = streamerStore.streamerId
	const time = Date.now() / 1000
	const masterKey = 'j0YPT6AkeKPUl3z8+glS5S0mt4wjU9G4EuglK0/q/X659Qih7ds/GCBseRmmCDbS'
	const UTF8Query = encodeURI(`idap=${payeeId}&payer=Uplify&ts=${time}`)
	const hmac = CryptoJS.HmacSHA256(UTF8Query, masterKey)
	const hex = CryptoJS.enc.Hex.stringify(hmac)
	const url = 'https://ui2.tipalti.com/payeedashboard/home'
	const currentDomain = window.location.origin
	const redirectDomain = `${currentDomain}/wallet`

	src.value = `${url}?${UTF8Query}&hashkey=${hex}&redirectto=${redirectDomain}`
})
</script>
