'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Testes de sessão')

trait('Test/ApiClient')
trait('Auth/Client')

const Token = use('App/Models/Token')

test('Teste de login do usuário com dados válidos', async ({client}) => {
	const user = await Factory.model('App/Models/User').create()
	const dado = {
		cpf: user.cpf,
		password: 'password123'
  }
	const response = await client.get('/api/login')
									.send(dado)
									.end()
  response.assertStatus(200)
}).timeout(0)

test('Teste de login de usuário - sem informação de login', async ({client}) => {
  const user = Factory.model('App/Models/User').create()
  const dado = {}
  const response = await client.get('/api/login')
                  .send(dado)
                  .end()
  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: 'cpf é obrigatório',
      field: 'cpf',
      validation: 'required'
    },
    {
      message: 'password é obrigatório',
      field: 'password',
      validation: 'required'
    }
  ])
}).timeout(0)

test('Teste de logout do usuário', async ({client}) => {
	const user = await Factory.model('App/Models/User', ).create()
	const response = await client.get('/api/logout')
									.loginVia(user, 'jwt')
									.end()
  response.assertStatus(204)
}).timeout(0)
