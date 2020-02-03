'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Testes para a Carteira')
const Carteira = use('App/Models/Carteira')

trait('Test/ApiClient')
trait('Auth/Client')

const URL_BASE = '/api/carteiras/'

test('Consulta de todas as carteiras de um usuário', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const carteira = await user.carteiras().createMany([
    {nome: 'Feverreiro 2020'},
    {nome: 'Janeiro 2020'}
  ])

  const response = await client.get(URL_BASE)
  								.loginVia(user, 'jwt')
                  .end()
  response.assertStatus(200)
  response.assertJSONSubset([
    {nome: 'Feverreiro 2020'},
    {nome: 'Janeiro 2020'}
  ])
}).timeout(0)

test('Consulta de uma carteira especifica', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const carteira = await user.carteiras().create({nome: 'Feverreiro 2020'})

  const response = await client.get(URL_BASE+carteira.id)
  								.loginVia(user, 'jwt')
                  .end()
  response.assertStatus(200)
  response.assertJSONSubset([
    {nome: 'Feverreiro 2020'}
  ])
}).timeout(0)

test('Criação de uma carteira', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const data = {
    nome: "Feverreiro 2020"
  }

  const response = await client.post(URL_BASE)
                  .loginVia(user, 'jwt')
                  .send(data)
                  .end()
  response.assertStatus(204)
}).timeout(0)

test('Criação de uma carteira inválida', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const data = {
    nome: 1
  }

  const response = await client.post(URL_BASE)
                  .loginVia(user, 'jwt')
                  .send(data)
                  .end()
  response.assertStatus(400)
  response.assertJSONSubset([{
    field: 'nome',
    message: 'nome não é uma string válida',
    validation: 'string'
  }])
}).timeout(0)

test('Alteração de uma carteira', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const carteira = await user.carteiras().create({nome: 'Feverreiro 2020'})
  const data = {
    nome: "Janeiro 2020"
  }

  const response = await client.put(URL_BASE+carteira.id)
                  .loginVia(user, 'jwt')
                  .send(data)
                  .end()
  response.assertStatus(204)
}).timeout(0)

test('Deleção de uma carteira', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const carteira = await user.carteiras().create({nome: 'Feverreiro 2020'})

  const response = await client.delete(URL_BASE+carteira.id)
                  .loginVia(user, 'jwt')
                  .end()
  response.assertStatus(204)
  assert.equal(await user.carteiras().getCount(), 0)
}).timeout(0)
