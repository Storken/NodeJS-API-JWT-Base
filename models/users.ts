
export type CreateUser = {
  email: string
  password: string
  salt: string
  user_id: string
  permission_level?: number
}

export type User = {
  token?: string
  lastLoggedIn?: Date
} & CreateUser
