import {
  sqlCreateUsersTable,
  sqlInsertUser,
  sqlSelectUserByEmail,
  sqlSelectUser,
  sqlSelectAllUsers,
  sqlRemoveUser,
  sqlInsertUserWithPermissionLevel,
  sqlUpdateUserPassword,
  sqlUpdateUserEmail,
  sqlUpdateUserNewsletter,
  sqlActivateUser
} from '../database/constants'
import { db } from '../database/db'
import { User, DBUser, CreateUser, UpdateUser, Email } from '../models/users'

export const initUserDatabase = () => {
  console.log('Connected to the SQLite database.')
  try {
    db.prepare(sqlCreateUsersTable).run()
    const password = process.env.SUPER_ADMIN_PASSWORD_HASHED
    const userId = process.env.SUPER_ADMIN
    let user = {
      email: userId,
      userId,
      password,
      permissionLevel: 3,
      salt: process.env.SUPER_ADMIN_PASSWORD_SALT,
      newsletter: false,
      active: true
    }

    addUserWithPermissionLevel(user)
  } catch (e) {
    console.log(e.message)
  }
}

export const addUserWithPermissionLevel = (user: User) => {
  db.prepare(sqlInsertUserWithPermissionLevel).run(user)
}

const prepareUser = (user: CreateUser | UpdateUser | User | Email) => {
  user.email = user.email.trim()
  user.email = user.email.toLowerCase()
  return user
}

export const addUser = (user: CreateUser) => {
  db.prepare(sqlInsertUser).run({
    ...prepareUser(user),
    newsletter: user.newsletter ? 1 : 0
  })
}

export const updateUserEmail = (user: UpdateUser) => {
  db.prepare(sqlUpdateUserEmail).run(prepareUser(user))
}

export const updateUserPassword = (user: UpdateUser) => {
  db.prepare(sqlUpdateUserPassword).run(user)
}

export const updateUserNewsletter = (userId: string, newsletter: boolean) => {
  db.prepare(sqlUpdateUserNewsletter).run({
    userId,
    newsletter: newsletter ? 1 : 0
  })
}

export const updateActiveAccount = (userId: string) => {
  db.prepare(sqlActivateUser).run({ userId })
}

export const removeUser = (userId: string) => {
  db.prepare(sqlRemoveUser).run({ userId })
}

export const findUsers = () => {
  return db.prepare(sqlSelectAllUsers).all() as User[]
}

export const findUserPermissionLevel = (userId: string) => {
  return (db.prepare(sqlSelectUser).get({ userId }) as DBUser).permission_level
}

export const findUser = (userId: string) => {
  return fromDb(db.prepare(sqlSelectUser).get({ userId }))
}

export const findUserByEmail = (email: string) => {
  return db.prepare(sqlSelectUserByEmail).get(prepareUser({ email })) as DBUser
}

const fromDb = (dbUser: DBUser): User => {
  const { user_id, email, newsletter, active, ...user } = dbUser
  return {
    userId: user_id,
    email,
    newsletter: Boolean(newsletter),
    active: Boolean(active),
    ...user
  }
}
