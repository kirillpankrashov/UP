const ms = 1000
export const REQUEST_LOOP_TICK = ms
export const REQUEST_INTERVAL = ms * 60 * 15
export const CREATIVES_LOOP_TICK = ms * 5
export const BRAND_AWARENESS_COOLDOWN = 20
export const REFERRAL_PROMO_COOLDOWN = ms * 60 * 60 * 2
export const PRIMAL_TIMER_TIMEOUT = ms * 60 * 10
export const TIME_BEFORE_PRELOAD = ms * 60
export const BS_CHECK_BEFORE_REQUEST = ms * 60 * 5
export const CHATBOT_TEXT_DELAY = ms * 60 * 5
export const SCREENSHOT_TIMEOUT = ms * 60 * 60
export const SCREENSHOT_DELAY = ms * 8
export const CONVERSION_ALERT_DURATION_MAX = ms * 10

export enum YandexTextDelay {
  ONE = ms * 60 * 7,
  TWO = ms * 60 * 5,
  THREE = ms * 60 * 3.3
}
