<template>
  <div
    class="circle-loader"
    :style="circleBackground"
  >
    <div class="circle-loader__static-dot" />
    <div
      class="circle-loader__rotatable-dot"
      :style="dotTransform"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  percent: number
}>()

const circleBackground = computed(() => {
	return `background: conic-gradient(#266FFE ${props.percent}%, transparent 0);`
})
const dotTransform = computed(() => {
	const deg = 360 / 100 * props.percent
	return `transform: rotate(${deg}deg) translateY(-18px);`
})
</script>

<style lang="scss" scoped>
$circleWidth: 4px;
$halfCircleWidth: calc($circleWidth / 2);
$sideSize: 40px;

.circle-loader {
  width: $sideSize;
  height: $sideSize;
  border-radius: 50%;
  position: relative;

  &:after {
    content: '';
    width: calc(#{$sideSize} - #{$circleWidth}*2);
    height: calc(#{$sideSize} - #{$circleWidth} * 2);
    background-color: var(--color-light-gray);
    border-radius: 50%;
    position: absolute;
    left: #{$circleWidth};
    top: #{$circleWidth};
  }

  &__static-dot {
    width: #{$circleWidth};
    height: #{$circleWidth};
    background-color: var(--color-primary);
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: calc(50% - #{$halfCircleWidth});
  }

  &__rotatable-dot {
    width: #{$circleWidth};
    height: #{$circleWidth};
    background-color: var(--color-primary);
    border-radius: 50%;
    position: absolute;
    top: calc(50% - #{$halfCircleWidth});
    left: calc(50% - #{$halfCircleWidth});
    transform-origin: #{$halfCircleWidth} #{$halfCircleWidth};
    transform: rotate(272deg) translateY(-18px);
    z-index: 5;
  }
}
</style>
