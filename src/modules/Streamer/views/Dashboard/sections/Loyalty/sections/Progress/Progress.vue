<template>
  <div
    id="dashboard-loyalty-progress"
    class="no-scrollbar -mx-5 w-[calc(100%+40px)] overflow-auto px-5 sm:mx-0 sm:w-auto sm:px-0"
  >
    <div class="progress mt-4 flex w-full items-center justify-between pb-4 pr-5 sm:pr-0">
      <Level :level="0" />
      <Line :level="0" />

      <Level :level="1" />
      <Line :level="1" />

      <Level :level="2" />
      <Line :level="2" />

      <Level :level="3" />
      <Line :level="3" />

      <Level :level="4" />
      <Line :level="4" />

      <Level :level="5" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Level, Line } from './components'
</script>
