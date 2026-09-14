export interface IUploadConfigData {
	bucket?: string
	contentType: string
	expires?: string
	key: string
	visibility?: string
}

export interface IUploadConfigDataPayload {
	bucket?: string
	content_type: string
	expires?: string
	key: string
	visibility?: string
}

export interface ISignedUrl {
	uuid: string
	bucket: string
	key: string
	url: string
	headers: Record<string, string>
}

export interface IFileMeta {
  size: number
  codec: string
  duration: number
  frames: number
  width: number
  height: number
  audio: string | null
}
