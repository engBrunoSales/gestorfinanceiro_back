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
	  	app.db('mercados').count('id').first()
      	.then((total) => {	
        	expect(res.body.lenght).toEqual(total)
    	})
      	.catch((err) => { expect(res.status).toBe(500) })
	  	})
})