import request from 'supertest'
import { app } from '../../app'

describe('/users', () => {
  describe('successfully with authentication', () => {
    const agent = request.agent(app)
    const email = `test+${Math.floor(Math.random() * 100000)}@linkbun.io`
    const password = '123abc#!'
    beforeAll(async () => {
      await agent
        .post('/users')
        .send({
          email,
          password
        })
        .expect(200)
      await agent
        .post('/login')
        .send({
          email,
          password
        })
        .expect(200)
    })

    test('get new user', async () => {
      const response = await agent.get('/users').expect(200)
      const user = response.body
      expect(user.buns.length).toBe(0)
      expect(user.sharedBuns.length).toBe(0)
      expect(user.collaborations.length).toBe(0)
      expect(user.email).toBe(email)
      expect(user.userId).not.toBeUndefined()
    })
  })
})
