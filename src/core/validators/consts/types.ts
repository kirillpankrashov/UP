export enum Trigger {
  Blur = 'blur',
  Change = 'change',
}

export type CallbackFunction = (a: string | void | Error) => void
