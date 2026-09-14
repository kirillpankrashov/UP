export type MethodType = 'post' | 'get' | 'patch' | 'delete'

export interface ISuccessResponse<ResponseData> {
  data: ResponseData & { status: true }
  status: number
  statusText: string
}

export interface IErrorResponse {
  data: {
    status: false
    message: string
    messages: {
      text: string
      field: string
      code: string
    }[]
  }
  status: number
  statusText: string
}

export type ErrorType = Error | IErrorResponse['data']

export type CatchedErrorType = {
  message: string
  code: string | undefined
  origin: ErrorType
}

export type ResponseType<ResponseData> = ISuccessResponse<ResponseData> | IErrorResponse

export type CacheUpdateFunction = (cache: any, response: any) => any | 'ignore'

export type CacheUpdateValue =
  | 'delete'
  | CacheUpdateFunction
  | { type: 'deletePrefix'; value: string }
  | { type: 'deletePattern'; value: RegExp }
  | { type: 'deleteEndpoint'; method: 'GET' | 'POST'; path: string }

export type CacheOptionsType = {
  ttl?: number // время жизни кеша в миллисекундах
  interpretHeader?: boolean
  update?: Record<string, CacheUpdateValue>
  id?: string // уникальный ID для запроса, используется для инвалидации кеша
}
