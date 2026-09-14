export type IStatus = {
  status: boolean
}

export type IMessages = {
  messages: Array<string | {
    field: string | null
    text: string
    code: string
  }>
}

export type IResponse<T> = IStatus & T
export type IResponseData<T> = IStatus & { data: T }
export type IResponseMessage = IStatus & IMessages


export type IPaginationResponse = {
	per_page: number
	total: number
}

export type IPagination = {
	perPage: number
	total: number
}
export type IResponsePaginatedData<T> = IStatus & IPaginationResponse & { data: T }
export type IPaginatedData<T> = IStatus & IPagination & { data: T }
