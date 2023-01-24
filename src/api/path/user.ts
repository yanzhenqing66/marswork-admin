import api from '..'

export interface UserFormParams {
  account?: string
  loginType?: string
  pwd?: string
}

export const fetchLogin = (params: UserFormParams) => api.post('user/login', params)
