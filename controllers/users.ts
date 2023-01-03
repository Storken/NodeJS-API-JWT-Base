import { CookieOptions, Request, Response } from 'express'
import {
  addUser,
  findUser,
  findUserByEmail,
  findUserPermissionLevel,
  findUsers,
  removeUser,
  updateActiveAccount,
  updateUserEmail,
  updateUserNewsletter,
  updateUserPassword
} from '../services/users'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { JWT_SECRET, SALT_ROUNDS } from '../config'
import jwt from 'jsonwebtoken'
import { sendActivationEmail } from './mail'

export const ping = async (req: Request, res: Response) => {
  res.status(200).send('pong')
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = findUser(req.body.userId)
    if (!user) {
      res.clearCookie('access_token').sendStatus(401)
      return
    }

    res.status(200).send(user)
  } catch (e) {
    console.log(e)
    res.clearCookie('access_token').sendStatus(400)
  }
}

export const getUsers = async (req: Request, res: Response) => {
  const permissionLevel = findUserPermissionLevel(req.body.userId)
  if (permissionLevel === 3) {
    const users = findUsers()
    res.status(200).send(users)
  }
  res.sendStatus(403)
}

export const putEmail = async (req: Request, res: Response) => {
  try {
    updateUserEmail({
      email: req.body.data.email,
      userId: req.body.userId
    })
    res.sendStatus(200)
  } catch (e) {
    res.status(400).send('email already exists')
  }
}

export const putActivateAccount = async (req: Request, res: Response) => {
  try {
    let userId = ''
    const { token } = req.body.data
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'wrong credentials' })
      } else {
        userId = decoded.user_id
      }
    })

    updateActiveAccount(userId)
    res.sendStatus(200)
  } catch (e) {
    res.status(400).send('could not activate account')
  }
}

export const putNewsletter = async (req: Request, res: Response) => {
  try {
    updateUserNewsletter(req.body.userId, Boolean(req.body.data?.newsletter))
    res.sendStatus(200)
  } catch (e) {
    console.log(e)
    res.status(400).send('could not change newsletter subscription')
  }
}

export const putPassword = async (req: Request, res: Response) => {
  const password = req.body.data.oldPassword
  const newPassword = req.body.data.newPassword
  const user = findUser(req.body.userId)
  const dbUser = findUserByEmail(user.email)
  const match = await bcrypt.compare(password, dbUser.password)
  if (!match) {
    res.status(403).send('wrong password')
  }

  const salt = await bcrypt.genSalt(SALT_ROUNDS)
  const hashedPassword = await bcrypt.hash(newPassword, salt)
  updateUserPassword({
    password: hashedPassword,
    salt,
    userId: req.body.userId
  })
  res.sendStatus(200)
}

export const deleteUser = async (req: Request, res: Response) => {
  removeUser(req.body.userId)
  res.clearCookie('access_token').redirect('/')
}

export const postUser = async (req: Request, res: Response) => {
  try {
    const { email, password, newsletter } = req.body
    const dbUser = findUserByEmail(email)
    if (dbUser) {
      res.status(400).send('email already exists')
      return
    }
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const hashedPassword = await bcrypt.hash(password, salt)
    const userId = uuidv4()
    addUser({ email, password: hashedPassword, newsletter, salt, userId })
    res.sendStatus(200)
    sendActivationEmail(email)
  } catch (e) {
    console.log(e)
    res.sendStatus(400)
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).send('wrong credentials')
    }

    const dbUser = findUserByEmail(email)
    const match = await bcrypt.compare(password, dbUser.password)
    if (!match) {
      res.status(400).send('wrong credentials')
      return
    }

    const token = jwt.sign({ email, user_id: dbUser.user_id }, JWT_SECRET, {
      expiresIn: '30d'
    })

    const cookieOptions: CookieOptions =
      process.env.NODE_ENV !== 'production'
        ? {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 60 * 500
          }
        : {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 60 * 30,
            domain: 'linkbun.io',
            sameSite: 'none',
            path: '/'
          }

    res
      .cookie('access_token', token, cookieOptions)
      .status(200)
      .json({ userId: dbUser.user_id })
  } catch (e) {
    console.error(e)
    res.status(500).send()
  }
}

export const recoverPassword = async (req: Request, res: Response) => {
  try {
    const { password, token } = req.body.data

    if (!token || !password) {
      res.status(400).send('wrong credentials')
    }

    let userId = ''

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'wrong credentials' })
      } else {
        userId = decoded.user_id
      }
    })

    if (userId) {
      const salt = await bcrypt.genSalt(SALT_ROUNDS)
      const hashedPassword = await bcrypt.hash(password, salt)
      updateUserPassword({
        password: hashedPassword,
        salt,
        userId
      })
      res.sendStatus(200)
    } else {
      res.sendStatus(401)
    }
  } catch (e) {
    res.status(500).send()
  }
}
