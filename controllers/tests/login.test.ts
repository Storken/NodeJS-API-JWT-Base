import request from 'supertest'
import { app } from '../../app'

const email = `test+${Math.floor(Math.random() * 100000)}@linkbun.io`
describe('POST /users', () => {
  describe('successfully with a email and password', () => {
    test('create a user', async () => {
      const password = '123abc#!'
      const response = await request(app)
        .post('/users')
        .send({
          email,
          password
        })
      expect(response.statusCode).toBe(200)
    })
  })

  describe('failing without email or password', () => {
    test('create a user without email', async () => {
      const password = '123abc#!'
      const response = await request(app)
        .post('/users')
        .send({
          password
        })
      expect(response.statusCode).toBe(400)
    })
    test('create a user without password', async () => {
      const email = `test+${Math.floor(Math.random() * 100000)}@linkbun.io`
      const response = await request(app)
        .post('/users')
        .send({
          email
        })
      expect(response.statusCode).toBe(400)
    })
  })
})

describe('POST /login', () => {
  describe('successfully with a email and password', () => {
    test('sign in', async () => {
      const password = '123abc#!'
      const response = await request(app)
        .post('/login')
        .send({
          email,
          password
        })
      expect(response.statusCode).toBe(200)
      expect(response.headers['set-cookie']).not.toBeUndefined()
      const cookie = response.headers['set-cookie']

      const userResponse = await request(app)
        .get('/users')
        .set('Cookie', cookie)
      expect(userResponse.statusCode).toBe(200)
    })
  })

  describe('failing without email or password', () => {
    test('sign in without email', async () => {
      const password = '123abc#!'
      const response = await request(app)
        .post('/login')
        .send({
          password
        })
      expect(response.statusCode).toBe(400)
      expect(response.headers['set-cookie']).toBeUndefined()
    })
  })
})
