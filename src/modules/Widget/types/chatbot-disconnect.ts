import type { Platform } from '@/core/types'

export interface IChatbotDisconnect {
  provider_id: number
  name: string
  avatar: string
  platform: Platform
}