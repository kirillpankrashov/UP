export interface IPusherErrorEvent {
  status: false
  messages: Array<{
    code: string
    field: string | null
    text: string
  }>
}

export interface IPusherSuccessEvent<T> {
  status: true
  data: T
}

export type PusherEvent<T> = { version: string } & (IPusherErrorEvent | IPusherSuccessEvent<T>)