const server = require('./server')
const request = require('supertest')
const db = require('../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

describe('[GET] /cheese', () => {
    test('responds with all the cheese', async () => {
      const res = await request(server).get('/cheese')
      expect(res.status).toBe(200)
      expect(res.body).toHaveLength(5)
    })
  })
  
  describe('[GET] /cheese/:id', () => {
    test('responds with gorgonzola', async () => {
      const res = await request(server).get('/cheese/1')
      expect(res.body).toMatchObject({ id: 1, name: 'gorgonzola' })
    })
  })
  
  describe('[POST] /cheese', () => {
    test('responds with new cheese', async () => {
      const res = await request(server)
        .post('/cheese').send({ name: 'feta' })
      expect(res.body).toMatchObject({ id: 6, name: "feta" })
    })
    test('responds with status 201', async () => {
      const res = await request(server)
        .post('/cheese').send({ name: 'feta' })
      expect(res.status).toBe(201)
    })
  })

  describe('[DELETE] /cheese/:id', () => {
    test('deletes cheese from db', async () => {
      await request(server).delete('/cheese/1')
      const res2 = await request(server).get('/cheese')
      expect(res2.body).toHaveLength(4)
    })
  })
