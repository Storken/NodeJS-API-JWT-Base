import { Request, Response } from 'express'
import {
  addUser,
  findUser,
  findUserByEmail,
  findUsers,
  removeUser,
  updateUser
} from '../services/users'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { JWT_SECRET, SALT_ROUNDS } from '../config'
import jwt from 'jsonwebtoken'

export const getUser = async (req: Request, res: Response) => {
  const user = findUser(req.body.userId)
  res.status(200).send(user)
}

export const getUsers = async (req: Request, res: Response) => {
  const user = findUser(req.body.userId)
  if (user.permission_level === 3) {
    const users = findUsers()
    res.status(200).send(users)
  }
  res.sendStatus(403)
}

export const putUser = async (req: Request, res: Response) => {
  let user = findUser(req.body.userId)
  user.email = req.body.email
  user.password = req.body.password
  updateUser(user)
  res.sendStatus(200)
}

export const deleteUser = async (req: Request, res: Response) => {
  removeUser(req.body.userId)
  res.sendStatus(200)
}

export const postUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user_id = uuidv4()
    addUser({ email, password: hashedPassword, salt, user_id })
    res.sendStatus(200)
  } catch (e) {
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
    const match = bcrypt.compare(password, dbUser.password)
    if (!match) {
      res.status(400).send('wrong credentials')
    }

    const token = jwt.sign({ email, user_id: dbUser.user_id }, JWT_SECRET, {
      expiresIn: '1h'
    })

    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
      })
      .status(200)
      .json({ userId: dbUser.user_id })
  } catch (e) {
    res.status(500).send()
  }
}
