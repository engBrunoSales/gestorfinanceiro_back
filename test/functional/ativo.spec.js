'use strict'

const Ativo = use('App/Models/Ativo')
const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Teste para o Ativo')

trait('Test/ApiClient')
trait('Auth/Client')

const BASE_URL = '/api/ativos/'


test('Listar todos os ativos válidos', async ({assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const mercado = await Factory.model('App/Models/Mercado').create()
  const ativosValido = await Factory.model('App/Models/Ativo').makeMany(10)
  ativosValido.forEach(async ativo => {
    ativo.mercado_id = mercado.id
    await ativo.save()
  })

  const ativosInvalido = await Factory.model('App/Models/Ativo').makeMany(5)
  ativosInvalido.forEach(async ativo => {
    ativo.valido = false
    ativo.mercado_id = mercado.id
    await ativo.save()
  })


  const response = await client.get(BASE_URL)
                  .loginVia(user, 'jwt')
                  .end()
  response.assertStatus(200)

  const qtdAtivo = await Ativo.query().where('valido', true).getCount()
  assert.equal(qtdAtivo, 10)
}).timeout(0)


test('Listar um ativo especifico', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()
  const mercado = await Factory.model('App/Models/Mercado').create()
  const ativo = await Factory.model('App/Models/Ativo').make()
  ativo.mercado_id = mercado.id
  await ativo.save()

  const response = await client.get(BASE_URL + ativo.id)
                  .loginVia(user, 'jwt')
                  .end()
  response.assertStatus(200)
}).timeout(0)


test('Criar um ativo - Logado Admin', async ({ client }) => {
  const user = await Factory.model('App/Models/User').make()
  user.admin = true
  await user.save()

  const mercado = await Factory.model('App/Models/Mercado').create()

  const ativo = await Factory.model('App/Models/Ativo').make()
  ativo.mercado_id = mercado.id

  const response = await client.post(BASE_URL)
                  .loginVia(user, 'jwt')
                  .send(ativo.toJSON())
                  .end()
  response.assertStatus(204)
}).timeout(0)


test('Criar um ativo - Não Logado Admin', async ({ client }) => {
  const user = await Factory.model('App/Models/User').make()
  user.admin = false
  await user.save()

  const mercado = await Factory.model('App/Models/Mercado').create()

  const ativo = await Factory.model('App/Models/Ativo').make()
  ativo.mercado_id = mercado.id

  const response = await client.post(BASE_URL)
                  .loginVia(user, 'jwt')
                  .send(ativo.toJSON())
                  .end()
  response.assertStatus(401)
  response.assertJSONSubset({error: 'Not authorized'})
}).timeout(0)


test('Alterar um ativo - Logado Admin', async ({ client }) => {
  const user = await Factory.model('App/Models/User').make()
  user.admin = true
  await user.save()

  const mercado = await Factory.model('App/Models/Mercado').create()

  const ativo = await Factory.model('App/Models/Ativo').make()
  ativo.mercado_id = mercado.id
  await ativo.save()

  const dados = {
    cotacao: 12.34
  }

  const response = await client.put(BASE_URL+ativo.id)
                  .loginVia(user, 'jwt')
                  .send(dados)
                  .end()
  response.assertStatus(204)
}).timeout(0)


test('Alterar um ativo - Não Logado Admin', async ({ client }) => {
  const user = await Factory.model('App/Models/User').make()
  user.admin = false
  await user.save()

  const mercado = await Factory.model('App/Models/Mercado').create()

  const ativo = await Factory.model('App/Models/Ativo').make()
  ativo.mercado_id = mercado.id
  await ativo.save()

  const dados = {
    cotacao: 12.34
  }

  const response = await client.put(BASE_URL+ativo.id)
                  .loginVia(user, 'jwt')
                  .send(dados)
                  .end()
  response.assertStatus(401)
  response.assertJSONSubset({error: 'Not authorized'})
}).timeout(0)


test('Deletar um ativo - Logado admin', async ({ client }) => {
  const user = await Factory.model('App/Models/User').make()
  user.admin = true
  await user.save()

  const mercado = await Factory.model('App/Models/Mercado').create()

  const ativo = await Factory.model('App/Models/Ativo').make()
  ativo.mercado_id = mercado.id
  await ativo.save()

  const response = await client.delete(BASE_URL+ativo.id)
                  .loginVia(user, 'jwt')
                  .end()
  response.assertStatus(204)
}).timeout(0)


test('Deletar um ativo -Não Logado admin', async ({ client }) => {
  const user = await Factory.model('App/Models/User').make()
  user.admin = false
  await user.save()

  const mercado = await Factory.model('App/Models/Mercado').create()

  const ativo = await Factory.model('App/Models/Ativo').make()
  ativo.mercado_id = mercado.id
  await ativo.save()

  const response = await client.delete(BASE_URL+ativo.id)
                  .loginVia(user, 'jwt')
                  .end()
  response.assertStatus(401)
  response.assertJSONSubset({error: 'Not authorized'})
}).timeout(0)
