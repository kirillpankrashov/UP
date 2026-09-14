import { OBSStatus } from '@/views/Widget/types'

type PopupOptions = {
  key?: string
  layout?: 'default' | 'modal'
  width?: number
  alignLeft?: boolean
  hideTitle?: boolean
  overlay?: boolean
  emoji?: {
    text: string
    animation: 'none' | 'wave' | 'tada' | 'heart-beat' | 'spin' | 'flash' | 'bounce' | 'rubber-band' | 'head-shake'
  }
  autoClose?: number
  showOnce?: boolean
  doNotShowAfterSubmit?: boolean
  customFormUrl?: string
  hiddenFields?: {
    [key: string]: any
  }
  onOpen?: () => void
  onClose?: () => void
  onPageView?: (page: number) => void
  onSubmit?: (payload: any) => void
}

declare global {
  const APPLICATION_VERSION: string

  interface Window {
    videojs: (element: HTMLVideoElement) => void
    obsstudio?: {
      pluginVersion: string
      getStatus: (callback: (status: OBSStatus) => void) => void
      getControlLevel: (callback: (level: number) => void) => void
    }
  }
}

export default global
