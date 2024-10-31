import { LoginForm } from '#/common/login'
import { UserInfo } from '#/system/user'

export function login(data: LoginForm) {
  return http.Post<ApiResponse<string>>(`/system/auth/login`, data)
}

export function getUserInfo() {
  return http.Get<ApiResponse<UserInfo>>(`/system/auth/user-info`)
}
