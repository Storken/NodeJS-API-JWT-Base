import {
  usersDbPath,
  sqlCreateUsersTable,
  sqlInsertUser,
  sqlSelectUserByEmail,
  sqlSelectUser,
  sqlSelectAllUsers,
  sqlUpdateUser,
  sqlRemoveUser,
  sqlInsertUserWithPermissionLevel
} from './constants'
import DatabaseConstructor from 'better-sqlite3'

export const usersDb = new DatabaseConstructor(usersDbPath, {
  verbose: console.log
})

export const initContractDatabase = () => {
  console.log('Connected to the SQLite database.')
  try {
    usersDb.prepare(sqlCreateUsersTable).run()
    const password = process.env.SUPER_ADMIN_PASSWORD_HASHED
    const user_id = process.env.SUPER_ADMIN
    let user = {
      email: user_id,
      user_id,
      password,
      permission_level: 3,
      salt: process.env.SUPER_ADMIN_PASSWORD_SALT
    }

    addUserWithPermissionLevel(user)
  } catch (e) {
    console.log(e.message)
  }
}

export const addUserWithPermissionLevel = (user: CreateUser) => {
  usersDb.prepare(sqlInsertUserWithPermissionLevel).run(user)
}
export const addUser = (user: CreateUser) => {
  usersDb.prepare(sqlInsertUser).run(user)
}

export const updateUser = (user: CreateUser) => {
  usersDb.prepare(sqlUpdateUser).run(user)
}

export const removeUser = (user: CreateUser) => {
  usersDb.prepare(sqlRemoveUser).run(user)
}

export const findUsers = () => {
  return usersDb.prepare(sqlSelectAllUsers).all() as User[]
}

export const findUser = (userId: string) => {
  return usersDb.prepare(sqlSelectUser).get({ userId }) as User
}

export const findUserByEmail = (email: string) => {
  return usersDb.prepare(sqlSelectUserByEmail).get({ email }) as User
}

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
