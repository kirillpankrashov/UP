<template>
  <a
    v-if="href"
    :href="href"
    :target="target"
    class="text-link"
    :class="{'_text-s-regular': size === 'small'}"
  >
    <slot />
  </a>
  <router-link
    v-else-if="to"
    :to="to"
    :target="target"
    class="text-link"
    :class="{'_text-s-regular': size === 'small'}"
  >
    <slot />
  </router-link>
  <span
    v-else
    class="text-link"
    :class="{'_text-s-regular': size === 'small'}"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { type RouteLocationRaw } from 'vue-router'

withDefaults(defineProps<{
  href?: null | string
  to?: null | RouteLocationRaw
  target?: '_blank' | '_self'
	size?: 'small' | 'medium'
}>(), {
	href: null,
	to: null,
	target: '_self',
	size: 'medium',
})
</script>

<style lang="scss" scoped>
.text-link {
	@apply text-primary cursor-pointer after:content-['→'] after:inline-block after:transition-all after:translate-x-1 after:translate-y-[-0.03rem] hover:after:translate-x-2;
}
</style>
