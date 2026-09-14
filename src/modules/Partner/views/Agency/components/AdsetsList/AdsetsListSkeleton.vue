<template>
  <div
    data-name="partner-agency-adsets-list-skeleton"
    data-test="partner-agency-adsets-list-skeleton"
  >
    <AdsetCardSkeleton
      v-for="n in 5"
      :key="`adsets-list-skeleton-${n}`"
    />
  </div>
</template>

<script setup lang="ts">
import AdsetCardSkeleton from '../AdsetCard/AdsetCardSkeleton.vue'
</script>
