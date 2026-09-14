import type { IDebugWidget } from './debug-widget'

export type IDebugStreamer = IDebugWidget['streamer'] & { widget: {slug: string}}
