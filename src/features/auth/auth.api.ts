import { instance } from 'common/api'
export const authApi = {
  me: () => {
    return instance.get<MeResponseType>('auth/me')
  },
  login: (arg: ArgLoginType) => {
    return instance.post<LoginResponseType>('auth/login', arg)
  },
  logout: () => {
    return instance.delete<LogoutResponseType>('auth/login')
  },
}

export type ArgLoginType = {
  email: string
  password: string
  rememberMe: boolean
}

export type ProfileType = {
  id: number
  email: string
  login: string
}

export type ResultCode = 0 | 1 | 10

export type ResponseType<T> = {
  resultCode: ResultCode
  messages: string[]
  data: T
}

export type LoginResponseType = ResponseType<{
  userId: number
}>

export type MeResponseType = ResponseType<ProfileType>
export type LogoutResponseType = ResponseType<{}>
