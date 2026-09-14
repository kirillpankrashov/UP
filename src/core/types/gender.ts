export type TGenderId = 'male' | 'female' | 'other'

export type TGenderSelectId = TGenderId | 'all'

export interface IGender {
  id: TGenderId
  title: string
}
