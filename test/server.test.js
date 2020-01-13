const supertest = require('supertest')
const request = supertest('http://localhost:3000')

// acessar a url http://localhost:3000 e verificar se a resposta foi 200
test('Deve responder na porta 3000', () => {
  return request.get('/')
    .then(res => expect(res.status).toBe(200))
})