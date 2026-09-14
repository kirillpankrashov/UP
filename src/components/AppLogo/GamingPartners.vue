<template>
  <img
    src="@/assets/img/logo/gaming-partners.png"
    class="w-28"
    :class="{'w-80': big}"
  >
</template>

<script setup lang="ts">
defineProps<{
  big?: boolean
}>()
</script>
