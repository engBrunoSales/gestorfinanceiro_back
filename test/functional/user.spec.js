'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Testes de usuário')

trait('Test/ApiClient')
trait('Auth/Client')

const User = use('App/Models/User')
const Token = use('App/Models/Token')
const URL_BASE = '/api/users/'


test('Consulta de todos os usuários - Logado Admin', async ({client}) => {
  const user = await Factory.model('App/Models/User').make()
  user.admin = true
  await user.save()
  const usuarios = await Factory.model('App/Models/User').createMany(10)

  const response = await client.get(URL_BASE)
                  .loginVia(user, 'jwt')
                  .end()
  response.assertStatus(200)
}).timeout(0)

test('Consulta de todos os usuários - Não Logado Admin', async ({client}) => {
  const user = await Factory.model('App/Models/User').make()
  user.admin = false
  await user.save()
  const usuarios = await Factory.model('App/Models/User').createMany(10)

  const response = await client.get(URL_BASE)
                  .loginVia(user, 'jwt')
                  .end()
  response.assertStatus(401)
}).timeout(0)

test('Consulta de um usuário especifico - Logado Admin', async ({client}) => {
  const userAdmin = await Factory.model('App/Models/User').make()
  userAdmin.admin = true
  await userAdmin.save()

  const user = await Factory.model('App/Models/User').make()
  user.admin = false
  await user.save()

  const responseUser = await client.get(URL_BASE + user.id)
                        .loginVia(userAdmin, 'jwt')
                        .end()
  responseUser.assertStatus(200)

  const responseAdmin = await client.get(URL_BASE + userAdmin.id)
                                .loginVia(userAdmin, 'jwt')
                                .end()
  responseAdmin.assertStatus(200)
}).timeout(0)


test('Consulta de um usuário especifico - Logado', async ({client}) => {
  const userAdmin = await Factory.model('App/Models/User').make()
  userAdmin.admin = true
  await userAdmin.save()

  const user = await Factory.model('App/Models/User').make()
  user.admin = false
  await user.save()

  const responseUser = await client.get(URL_BASE + user.id)
                      .loginVia(user, 'jwt')
                      .end()
  responseUser.assertStatus(200)

  const responseAdmin = await client.get(URL_BASE + userAdmin.id)
                        .loginVia(user, 'jwt')
                        .end()
  responseAdmin.assertStatus(401)
  responseAdmin.assertJSONSubset({
    error: 'Not authorized'
  })
}).timeout(0)

test('Criando um usuário válido', async ({client}) => {
  const user = await Factory.model('App/Models/User').make()
  user.admin = false
	const response = await client.post(URL_BASE)
									.send(user.toJSON())
                  .end()
	response.assertStatus(200)
}).timeout(0)

test('Criando um usuário inválido', async ({client}) => {
	const user = await Factory.model('App/Models/User').make()
  user.nome = 7
  const response = await client.post(URL_BASE)
									.send(user.toJSON())
									.end()
  response.assertStatus(400)
  response.assertJSONSubset([{
    message: 'nome não é uma string válida',
  	field: 'nome',
  	validation: 'string'
  }])
}).timeout(0)

test('Alterando um usuário com dados válidos - Logado', async ({assert, client}) => {
  const user = await Factory.model('App/Models/User').create()
  const dados = {
    nome: 'Bruno Sales',
    telefone: '85989157718'
  }

	const response = await client.put(URL_BASE + user.id)
                  .loginVia(user, 'jwt')
                  .send(dados)
									.end()
  response.assertStatus(204)

  const userUpdate = await User.find(user.id)
  assert.equal(userUpdate.nome, dados.nome)
  assert.equal(userUpdate.telefone, dados.telefone)
}).timeout(0)

test('Alterando um usuário com dados inválidos - Logado', async ({client}) => {
  const user = await Factory.model('App/Models/User').create()
  const dados = {
    nome: 7
  }

  const response = await client.put(URL_BASE + user.id)
                  .loginVia(user, 'jwt')
                  .send(dados)
                  .end()
  response.assertStatus(400)
}).timeout(0)

test('Alterando um usuário com dados válidos - Não Logado', async ({client}) => {
  const userNew = await Factory.model('App/Models/User').make()
  const dados = {
    nome: 'Bruno Sales',
    telefoe: '85989157718'
  }
  const response = await client.put(URL_BASE + userNew.id)
                  .send(dados)
									.end()
	response.assertStatus(401)
}).timeout(0)

test('Deletando um usuário', async ({assert, client}) => {
	const user = await Factory.model('App/Models/User').make()
	user.admin = true
	user.save()

  const user_del = await Factory.model('App/Models/User').create()

	const response = await client.delete(URL_BASE + user_del.id)
									.loginVia(user, 'jwt')
									.end()
  response.assertStatus(204)

  const qtdUser = await User.query().where('id', user_del.id).getCount()
  assert.equal(0, qtdUser)
}).timeout(0)


