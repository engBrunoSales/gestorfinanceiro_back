const request = require('supertest')
const app = require('../src/app')

const MAIN_ROUTE = '/users'
// expectativas sempre começam pelo res.status

// testes bãsicos: 
// 1: realizar um GET no /users esperando: status 200 e uma lista como resposta
// 2: realizar um POST no /users enviando um objeto com .send() esperando: status 201 de inserção

test('Deve listar todos os usuários', () => {
  return request(app).get(MAIN_ROUTE)
    .then(res => {
      expect(res.status).toBe(200)
      expect(res.body).toHaveLength(1)
      expect(res.body[0]).toHaveProperty('name', 'Jemima Luz')
    })
})

test('Deve inserir usuário com sucesso', () => {
  return request(app).post(MAIN_ROUTE)
    .send({ name: 'Jemima Luz', mail: 'jemima@mail.com' })
    .then(res => {
      expect(res.status).toBe(201)
      expect(res.body.name).toBe('Jemima Luz')
    })
})