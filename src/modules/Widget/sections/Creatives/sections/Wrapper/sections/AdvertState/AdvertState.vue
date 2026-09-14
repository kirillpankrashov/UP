<template>
  <div
    class="advert-state"
    :class="{'advert-state_intro': isIntro}"
  >
    <div class="advert-state__text">
      {{ state }}
    </div>
    <div
      class="advert-state__disclaimer"
      v-if="!isIntro"
    >
      {{ disclaimerText }}
      <template v-if="eridText">
        <br>{{ eridText }}
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import {
	AdFormat,
	type IUnitAttachment,
	type IVideoAttachment,
	Platform,
} from '@/core/types'
import { useLocale } from '@/core/hooks'
import { Widget } from '@/modules/Widget/class/Widget'
import { messages } from '@/modules/Widget/locales'
import { useAdvertState } from '@/modules/Widget/sections/Creatives/utils'
import type { ICreative } from '@/modules/Widget/types'

const { t } = useLocale<typeof messages>(messages)

const props = withDefaults(defineProps<{
  widget: Widget
  isIntro: boolean
}>(), {
	isIntro: false,
})

const capitalize = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

const { state } = useAdvertState(props.widget)
const platform = computed(() => props.widget.data.value.platform)
const disclaimerText = computed(() => {
	if (platform.value === Platform.YOUTUBE) {
		return t('widget.platformDisclaimerYoutube')
	}
	else {
		return `${capitalize(platform.value)} ${t('widget.platformDisclaimer')}`
	}
})
const eridText = computed(() => {
	const creative = props.widget.creativesManager.creative.value
	const advertiser = (creative as ICreative)?.adSet.advertiser

	if (creative && [AdFormat.YANDEX_FS, AdFormat.YANDEX_PF].includes(creative?.adSet.format)) {
		return advertiser.legalName
	}

	let attachment: IVideoAttachment | IUnitAttachment | undefined

	switch (creative?.adSet.format) {
		case AdFormat.FULLSCREEN:
		case AdFormat.PIP:
			attachment = creative.attachments.video
			break
		case AdFormat.CUSTOM:
			attachment = creative.attachments.zip
	}

	const erid = attachment?.extend?.legal_compliance?.erid?.media

	if (creative?.adSet.campaign.ordMarkup && erid) {
		return `${creative.adSet.campaign.ordMarkup} erid: ${erid}`
	}

	const advertiserName = advertiser?.legalName
	const advertiserTin = advertiser?.tin

	if (!attachment || !erid || !advertiserName || !advertiserTin) {
		return null
	}

	return `ERID ${erid}, Реклама, ${advertiserName}, ИНН ${advertiserTin}`
})
</script>

<style lang="scss" scoped>
.advert-state {
  /* display: flex; */
  background-color: rgba(black, 0.6);
  border-radius: 4px;
  position: absolute;
  left: 16px;
  bottom: 16px;
  padding: 7px 12px 6px;

  * {
    font-size: 19px;
    color: white;
    letter-spacing: -0.01em;

    @media screen and (max-height: 720px) {
      font-size: 16px;
    }
  }

  &__separator {
    font-size: 14px;
    margin: 0 15px;
  }

  &__text {
    font-weight: 700;
  }

  &__disclaimer {
    margin-top: 2px;
    font-size: 14px;
    line-height: 1.4;

    @media screen and (max-height: 720px) {
      font-size: 12px;
    }

    span {
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      text-transform: capitalize;
    }
  }

  &_intro {
    background-color: #FFC600;

    * {
      color: #1A1A1A;
    }
  }
}
</style>
