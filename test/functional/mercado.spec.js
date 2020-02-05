'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Testes para o Mercado')
const Mercado = use('App/Models/Mercado')

trait('Test/ApiClient')
trait('Auth/Client')
trait ('DatabaseTransactions')

test('Consulta de todos os mercados - Autenticado', async ({assert, client}) => {
  const user = await Factory.model('App/Models/User').create()
  const mercado = await Factory.model('App/Models/Mercado').createMany(5)
	const response = await client.get('/api/mercados')
  								.loginVia(user, 'jwt')
  								.end()
  response.assertStatus(200)
}).timeout(0)

test('Consulta de todos os mercados - Não Autenticado', async ({assert, client}) => {
	const response = await client.get('/api/mercados')
  								.end()
  response.assertStatus(401)
}).timeout(0)

test('Consulta de um mercado especifico - Autenticado', async ({assert, client}) => {
	const user = await Factory.model('App/Models/User').create()
	const mercado = await Factory.model('App/Models/Mercado').create()
	const response = await client.get('/api/mercados/' + mercado.id)
								.loginVia(user, 'jwt')
  								.end()
  	response.assertStatus(200)
}).timeout(0)

test('Consulta de um mercado especifico - Não Autenticado', async ({assert, client}) => {
	const mercado = await Factory.model('App/Models/Mercado').create()
	const response = await client.get('/api/mercados/' + mercado.id)
  								.end()
  	response.assertStatus(401)
}).timeout(0)

test('Criação de um mercado válido - Autenticado Admin', async ({assert, client}) => {
	const user = await Factory.model('App/Models/User').make()
  user.admin = true
  await user.save()
  const mercado = await Factory.model('App/Models/Mercado').make()

  const response = await client.post('/api/mercados')
  								.loginVia(user, 'jwt')
  								.send(mercado.toJSON())
  								.end()
  response.assertStatus(204)
}).timeout(0)

test('Criação de um mercado válido -Não Autenticado', async ({assert, client}) => {
	const mercado = await Factory.model('App/Models/Mercado').make()

	const response = await client.post('/api/mercados')
  								.send(mercado.toJSON())
  								.end()
  	response.assertStatus(401)
}).timeout(0)

test('Criação de um mercado inválido', async ({assert, client}) => {
	const user = await Factory.model('App/Models/User').make()
	user.admin = true
  await user.save()

  const mercado = await Factory.model('App/Models/Mercado').make()
  mercado.nome = 123

  const response = await client.post('/api/mercados')
  								.loginVia(user, 'jwt')
  								.send(mercado.toJSON())
  								.end()
  	response.assertStatus(400)
  	response.assertJSONSubset([{
  		message: 'nome não é uma string válida',
  		field: 'nome',
  		validation: 'string'
  	}])
}).timeout(0)

test('Alterando um mercado - Autenticado Admin', async ({assert, client}) => {
	const user = await Factory.model('App/Models/User').create()
	user.admin = true
	await user.save()

  const mercado = await Factory.model('App/Models/Mercado').create()
  const dado = {nome: 'Industrial'}

  const response = await client.put('/api/mercados/' + mercado.id)
								.loginVia(user, 'jwt')
								.send(dado)
								.end()
  response.assertStatus(204)

  const mercadoUpdate = await Mercado.find(mercado.id)
  assert.equal(mercadoUpdate.nome, dado.nome)
}).timeout(0)

test('Alterando um mercado - Não Autenticado', async ({assert, client}) => {
	const mercado = await Factory.model('App/Models/Mercado').create()
	const dado = {nome: 'Industrial'}
	const response = await client.put('/api/mercados/' + mercado.id)
								.send(dado)
								.end()
	response.assertStatus(401)
}).timeout(0)

test('Deletando um mercado - Autenticado Admin', async ({assert, client}) => {
	const user = await Factory.model('App/Models/User').make()
	user.admin = true
	await user.save()

	const mercado = await Factory.model('App/Models/Mercado').make()
	mercado.nome = 'Financeiro'
	await mercado.save()

	const response = await client.delete('/api/mercados/' + mercado.id)
								.loginVia(user, 'jwt')
								.end()
	response.assertStatus(204)
}).timeout(0)

test('Deletando um mercado - Não Autenticado', async ({assert, client}) => {
	const mercado = await Factory.model('App/Models/Mercado').create()
	const response = await client.delete('/api/mercados/' + mercado.id)
								.end()
	response.assertStatus(401)
}).timeout(0)
