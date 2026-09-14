import type { IUnitAttachmentProperties } from './attachment'

export interface IGallery {
  list: Array<{
    id: string
    path: string
    basename?: string
    properties?: IUnitAttachmentProperties
  }>
  styles: string
}
