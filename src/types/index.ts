export interface IUser {
  id?: number
  name: string
  email: string
  external_code: string
  role: number
  tags: Array<string>
}

export const initialUser: IUser = {
  name: '',
  email: '',
  role: -1,
  external_code: '',
  tags: []
}

export const getDefaultUser = () => initialUser
