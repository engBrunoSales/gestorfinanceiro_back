const request = require('supertest')
const app = require('../src/app')

const MAIN_ROUTE = '/mercados'
// expectativas sempre começam pelo res.status

test('Deve responder na rota /mercados', () => {
  return request(app).get(MAIN_ROUTE)
    .then(res => {
      expect(res.status).toBe(200)
    })
})

test('Deve listar todos os itens do banco de dados', () => {
	return request(app).get(MAIN_ROUTE)
	  .then(res => {
      app.db('mercados').select(['nome'])
        .then(result => {
          expect(Object.keys(res.body).length).toBe(Object.keys(result).length)    
        })
    })
})

test('Deve retornar apenas um mercado /mercado/:id', () => {
  return request(app).get('/mercados/1')
    .then((res) => {
      app.db('mercados').select(['nome']).where('id', 1)
        .then(result => {
          expect(Object.keys(res.body).length).toBe(Object.keys(result).length)    
        })
    })
})

test('Salvando um mercado', () => {
  return request(app).post(MAIN_ROUT)
    .then(res => {
      expect(true).toBe(false)
    })
})