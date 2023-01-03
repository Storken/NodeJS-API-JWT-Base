export type Email = {
  email?: string
}

export type User = {
  userId: string
  newsletter?: boolean
  active?: boolean
} & Email

export type UpdateUser = {
  password?: string
  salt?: string
} & User

export type CreateUser = {
  salt: string
  permissionLevel?: number
} & UpdateUser

export type DBUser = {
  id: number
  email: string
  password: string
  salt: string
  user_id: string
  permission_level?: number
  newsletter: number
  active: number
}

export type UserResponse = {} & User
