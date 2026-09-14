export interface ISaveTwitchClipData {
  adsetSlug: string
  adsetTitle: string
  clipUrl: string
  streamerId: number
  streamerName: string
}

export interface ISaveTwitchClipPayload {
  ad_set_id: string
  ad_set_name: string
  creators_id: number
  creators_name: string
  twitch_clip_url: string
}
