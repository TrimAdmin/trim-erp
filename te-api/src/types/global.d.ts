declare global {
  interface Pagination<T = any> {
    limit?: number
    page?: number
    params: T
  }
}

export {}
