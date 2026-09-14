import type { IAttachmentExtendedInfo } from './attachment-extended-info'
import type { IGallery } from './gallery'
import type { IPanel } from './panel'
import type { IQuizResponse } from './quiz'

export interface IVideoAttachmentProperties {
  audio: string
  duration: number | null
  frames: number
  width: number
  height: number
  size: number
}

export interface IUnitAttachmentProperties {
  width: number
  height: number
  mime?: string
  audio?: string | null
  duration?: number | null
  frames?: number
  size?: number
	index?: string
}

export interface IVideoAttachment {
  basedir: string
  basename: string
  path: string
  size: number
  properties: IVideoAttachmentProperties
	extend?: IAttachmentExtendedInfo
}

export interface IUnitAttachment {
  basedir: string
  basename: string
  path: string
  size: number
  properties: IUnitAttachmentProperties
	extend?: IAttachmentExtendedInfo
}

export interface IAttachments {
  video?: IVideoAttachment
  unit?: IUnitAttachment
  image?: IUnitAttachment
  zip?: IUnitAttachment
	quiz?: IQuizResponse
	panel?: IPanel
	gallery?: IGallery
}

export interface INewlyUploadedAttachment {
  basename: string
  key: string
  path: string
}

export interface IFileAttachment {
  type: string
  file: {
		basename: string
		path: string
		key: string
  }
}
