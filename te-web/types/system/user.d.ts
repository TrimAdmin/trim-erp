export interface UserInfo {
  id: number
  username: string
  nickname?: string
  email?: string
  phone?: string
  status: string
  sex: string
  createTime: string
  updateTime: string
  permissions: string[]
}

export type UserSearchForm = Partial<{
  [key: string]: any
  username: string
}>
