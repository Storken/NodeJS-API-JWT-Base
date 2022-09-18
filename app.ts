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
  postUser,
  putUser
} from './controllers/users'
import { initContractDatabase } from './services/users'
import bodyParser from 'body-parser'
import { auth } from './middlewares/auth'
import cookieParser from "cookie-parser"

let WORKERS = process.env.WEB_CONCURRENCY || 1
let PORT = process.env.PORT || 5001
const ALLOWED_ORIGINS = ['http://localhost', 'https://bunnyga.me']

/*
throng(start, {
  workers: 1,
  lifetime: Infinity
})*/
start()

function start () {
  const app = express()
  initContractDatabase()
  app
    .use(compression())
    .use(helmet())
    .use(bodyParser.json())
    .use(cookieParser())
    .use(
      cors({
        origin: ALLOWED_ORIGINS,
        methods: 'GET'
      })
    )

  app
    //user-endpoints
    .put('/users/:userId', auth, putUser)
    .get('/users/:userId', auth, getUser)
    .delete('/users/:userId', auth, deleteUser)
    .get('/users/', auth, getUsers)
    .post('/users', postUser)
    .post('/login', login)
    .listen(PORT, () => {
      console.log('api is listening on port:', PORT)
    })
}
