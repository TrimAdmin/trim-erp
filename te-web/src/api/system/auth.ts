export function login(data) {
  return http.Post(`/auth/login`, {
    data,
  })
}
