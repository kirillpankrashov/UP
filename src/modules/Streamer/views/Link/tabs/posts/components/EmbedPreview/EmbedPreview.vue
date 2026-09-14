<template v-if="provider && embed">
  <div
    data-name="streamer-link-embed-preview"
    class="mt-6"
  >
    <div
      ref="postRef"
      :class="{'aspect-video w-full': provider === LinkPostEmbed.YOUTUBE}"
      v-html="embedCode"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { filterXSS } from 'xss'

import { LinkPostEmbed } from '@/core/types/link'

const props = defineProps<{
  embed: string | null
}>()

const postRef = ref<HTMLDivElement | null>(null)

const embed = computed(() => filterXSS(props.embed || ''))

const provider = computed<LinkPostEmbed | null>(() => {
	try {
		const link = new URL(embed.value)
		if (link.origin.includes('reddit.com')) {
			return LinkPostEmbed.REDDIT
		}
		if (link.origin.includes('youtu')) {
			return LinkPostEmbed.YOUTUBE
		}
		if (
			link.origin.includes('x.com') ||
      link.origin.includes('twitter') ||
      link.origin.includes('t.co')
		) {
			return LinkPostEmbed.X
		}
		if (link.origin.includes('spotify.com')) {
			return LinkPostEmbed.SPOTIFY
		}
		if (link.origin.includes('music.yandex.ru')) {
			return LinkPostEmbed.YANDEX_MUSIC
		}
		if (link.origin.includes('instagram.com')) {
			return LinkPostEmbed.INSTAGRAM
		}
		if (link.origin.includes('t.me')) {
			return LinkPostEmbed.TELEGRAM
		}
		return null
	}
	catch (_) {
		return null
	}
})

const embedLink = computed(() => {
	if (provider.value === LinkPostEmbed.YOUTUBE) {
		const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
		const match = embed.value.match(regExp)
		return (match && match[7].length === 11) ? match[7] : false
	}
	if (provider.value === LinkPostEmbed.YANDEX_MUSIC) {
		return embed.value.split('music.yandex.ru/')[1]
	}
	return embed.value
})

const embedCode = computed(() => {
	switch (provider.value) {
		case LinkPostEmbed.YOUTUBE:
			return `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${embedLink.value}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen />`

		case LinkPostEmbed.REDDIT:
			return `<blockquote class="reddit-card"><a href="${embedLink.value}"></a></blockquote>`

		case LinkPostEmbed.TELEGRAM:
			return ''

		case LinkPostEmbed.INSTAGRAM:
			return `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="${embedLink.value}" data-instgrm-version="12" style="background:#FFF; border:0; margin:1px; padding:0 0 0 0; border-radius:0px; box-shadow:none; display:inline-block; width:calc(100% - 2px); max-width:540px; min-width:326px; width:100%;"><div style="padding:16px;"><a href="${embedLink.value}" style="color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_blank"></a></div></blockquote>`

		case LinkPostEmbed.X:
			return `<blockquote class="twitter-tweet"><a href="${embedLink.value}"></a></blockquote>`

		case LinkPostEmbed.SPOTIFY:
			return `<iframe style="border-radius:12px" src="${embedLink.value}" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`

		case LinkPostEmbed.YANDEX_MUSIC:
			return `<iframe frameborder="0" allow="clipboard-write" style="border:none;width:100%;height:500px;" width="100%" height="500" src="https://music.yandex.ru/iframe/${embedLink.value}"></iframe>`

		default:
			return null
	}
})

const runEmbedScript = () => {
	if (provider.value === LinkPostEmbed.REDDIT) {
		const oldScript = document.getElementById('reddit-embed')
		if (oldScript) oldScript.remove()
		const script = document.createElement('script')
		script.src = 'https://embed.reddit.com/widgets.js'
		script.id = 'reddit-embed'
		script.async = true
		document.head.appendChild(script)
	}
	if (provider.value === LinkPostEmbed.TELEGRAM) {
		// const oldScript = document.getElementById('telegram-embed')
		// if (oldScript) oldScript.remove()
		const link = new URL(embedLink.value || '')
		const script = document.createElement('script')
		script.src = 'https://telegram.org/js/telegram-widget.js?22'
		script.id = 'telegram-embed'
		script.async = true
		script.setAttribute('data-telegram-post', link.pathname.substring(1))
		postRef.value?.appendChild(script)
	}
	if (provider.value === LinkPostEmbed.INSTAGRAM) {
		const oldScript = document.getElementById('instagram-embed')
		if (oldScript) oldScript.remove()
		const script = document.createElement('script')
		script.src = 'https://platform.instagram.com/en_US/embeds.js'
		script.id = 'instagram-embed'
		script.async = true
		script.onload = () => {

			// @ts-ignore
			window.instgrm.Embeds.process()
		}
		document.head.appendChild(script)
	}
	if (provider.value === LinkPostEmbed.X) {
		const oldScript = document.getElementById('twitter-embed')
		if (oldScript) oldScript.remove()
		const script = document.createElement('script')
		script.src = 'https://platform.twitter.com/widgets.js'
		script.id = 'twitter-embed'
		script.async = true
		script.onload = () => {

			// @ts-ignore
			window.twttr.widgets.load()
		}
		document.head.appendChild(script)
	}
}

watch(embed, runEmbedScript)

onMounted(runEmbedScript)
</script>

<style>
.twitter-tweet {
  margin: 0 auto !important;
}
</style>
