import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import throng from 'throng'
import cors from 'cors'
import {
  deleteUser,
  getUser,
  getUsers,
  login,
  ping,
  postUser,
  putActivateAccount,
  putEmail,
  putNewsletter,
  putPassword,
  recoverPassword
} from './controllers/users'
import bodyParser from 'body-parser'
import { auth } from './middlewares/auth'
import cookieParser from 'cookie-parser'
import { initUserDatabase } from './services/users'
import { sendForgotPasswordEmail } from './controllers/mail'

let WORKERS = process.env.WEB_CONCURRENCY || 1
const ALLOWED_ORIGINS = ['http://localhost:3000', 'https://linkbun.io']

/*
throng(start, {
  workers: 1,
  lifetime: Infinity
})*/

export const app = express()
start()

function start () {
  initUserDatabase()
  app
    .use(cookieParser())
    .use(compression())
    .use(helmet())
    .use(bodyParser.json())
    .use(
      cors({
        credentials: true,
        origin: ALLOWED_ORIGINS,
        methods: 'GET, POST, PUT, DELETE'
      })
    )

  app
    .get('/ping', ping)
    //user-endpoints
    .get('/users', auth, getUser)
    .delete('/users', auth, deleteUser)
    .put('/users/password', auth, putPassword)
    .put('/users/email', auth, putEmail)
    .get('/users/all', auth, getUsers)
    .post('/users', postUser)
    .post('/login', login)
    .post('/forgot-password', sendForgotPasswordEmail)
    .post('/recover-password', recoverPassword)
    .put('/users/activate', putActivateAccount)
    .put('/users/newsletter', auth, putNewsletter)

  if (process.env.NODE_ENV !== 'test') {
    import('./server')
  }
}
