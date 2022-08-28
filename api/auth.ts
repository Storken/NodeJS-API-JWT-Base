import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'
import { findUser } from '../database/user-queries'
import bcrypt from 'bcrypt'

export const auth = (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) {
    return res.status(400).send({
      message: 'no token provided'
    })
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).send({ message: 'wrong credentials' })
    } else {
      req.body.userId = decoded.user_id
      next()
    }
  })
}
