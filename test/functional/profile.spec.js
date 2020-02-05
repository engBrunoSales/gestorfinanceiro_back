'use strict'

const Profile = use('App/Models/Profile')
const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Teste para o Profile')

trait('Test/ApiClient')
trait('Auth/Client')

const BASE_URL = '/api/profiles/'

test('Listar todos os profiles - Logado Admin', async ({client}) => {
  const userAdmin = await Factory.model('App/Models/User').make()
  userAdmin.admin = true
  await userAdmin.save()

  const userList = await Factory.model('App/Models/User').createMany(10)

  userList.forEach(async user => {
    const profile = await Factory.model('App/Models/Profile').make()
    await user.profile().save(profile)
  });

  const response = await client.get(BASE_URL)
                  .loginVia(userAdmin, 'jwt')
                  .end()
  response.assertStatus(200)
}).timeout(0)

test('Listar todos os profiles - Não Logado Admin', async ({client}) => {
  const userNoAdmin = await Factory.model('App/Models/User').create()

  const userList = await Factory.model('App/Models/User').createMany(10)
  userList.forEach(async user => {
    const profile = await Factory.model('App/Models/Profile').make()
    await user.profile().save(profile)
  });

  const response = await client.get(BASE_URL)
                  .loginVia(userNoAdmin, 'jwt')
                  .end()
  response.assertStatus(401)
  response.assertJSONSubset({
    error: 'Not authorized'
  })
}).timeout(0)

test('Listar um profile', async ({client}) => {
  const user = await Factory.model('App/Models/User').create()
  const dataProfile = await Factory.model('App/Models/Profile').make()
  await user.profile().save(dataProfile)
  const profile = await user.profile().fetch()

  const response = await client.get(BASE_URL+profile.id)
                  .loginVia(user, 'jwt')
                  .end()
  response.assertStatus(200)

}).timeout(0)

test('Criar um profile', async ({assert, client}) => {
  const user = await Factory.model('App/Models/User').create()

  const dados = {
    nome: 'Moderado',
    pontuacao_a: 5,
    pontuacao_m: 6,
    pontuacao_c: 2
  }

  const response = await client.post(BASE_URL)
                  .loginVia(user, 'jwt')
                  .send(dados)
                  .end()
  response.assertStatus(204)
  const profile = await user.profile().fetch()
  assert.equal(profile.nome, dados.nome)

}).timeout(0)

test('Criar um profile já existente', async ({client}) => {
  const user = await Factory.model('App/Models/User').create()

  const dados = {
    nome: 'Moderado',
    pontuacao_a: 5,
    pontuacao_m: 6,
    pontuacao_c: 2
  }
  await user.profile().create(dados)

  const response = await client.post(BASE_URL)
                  .loginVia(user, 'jwt')
                  .send(dados)
                  .end()
  response.assertStatus(400)
  response.assertJSONSubset({error: 'Usuário já possui profile cadastrado'})

}).timeout(0)

test('Criar um profile inválido', async ({assert, client}) => {
  const user = await Factory.model('App/Models/User').create()

  const dados = {
    nome: '',
    pontuacao_a: 'qualquer coisa',
    pontuacao_m: 6,
    pontuacao_c: 2
  }

  const response = await client.post(BASE_URL)
                  .loginVia(user, 'jwt')
                  .send(dados)
                  .end()
  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: 'nome é obrigatório',
      field: 'nome',
      validation: 'required'
    },
    {
      message: 'pontuacao_a não é um inteiro válido',
      field: 'pontuacao_a',
      validation: 'integer'
    }
])

}).timeout(0)


test('Alterar um profile', async ({assert, client}) => {
  const user = await Factory.model('App/Models/User').create()

  const profile = await user.profile().create({
    nome: 'Conservador',
    pontuacao_a: 5,
    pontuacao_m: 6,
    pontuacao_c: 2
  })

  const dados = {
    nome: 'Moderado',
    pontuacao_a: 5,
    pontuacao_m: 6,
    pontuacao_c: 2
  }

  const response = await client.put(BASE_URL+profile.id)
                  .loginVia(user, 'jwt')
                  .send(dados)
                  .end()
  response.assertStatus(204)

  const profileUpd = await user.profile().fetch()
  assert.equal(profileUpd.nome, dados.nome)

}).timeout(0)

test('Deletar um profile - Logado Admin', async ({client}) => {
  const userAdmin = await Factory.model('App/Models/User').make()
  userAdmin.admin = true
  await userAdmin.save()

  const user = await Factory.model('App/Models/User').create()

  const profile = await user.profile().create({
    nome: 'Conservador',
    pontuacao_a: 5,
    pontuacao_m: 6,
    pontuacao_c: 2
  })



  const response = await client.delete(BASE_URL+profile.id)
                  .loginVia(userAdmin, 'jwt')
                  .end()
  response.assertStatus(204)
}).timeout(0)

test('Deletar um profile - Não logado Admin', async ({client}) => {

  const user = await Factory.model('App/Models/User').create()

  const profile = await user.profile().create({
    nome: 'Conservador',
    pontuacao_a: 5,
    pontuacao_m: 6,
    pontuacao_c: 2
  })

  const response = await client.delete(BASE_URL+profile.id)
                  .loginVia(user, 'jwt')
                  .end()
  response.assertStatus(204)
}).timeout(0)

test('Deletar um profile - Não pertence ao User', async ({client}) => {

  const user = await Factory.model('App/Models/User').create()
  const profile = await user.profile().create({
    nome: 'Conservador',
    pontuacao_a: 5,
    pontuacao_m: 6,
    pontuacao_c: 2
  })

  const newUser = await Factory.model('App/Models/User').create()
  const newProfile = await newUser.profile().create({
    nome: 'Conservador',
    pontuacao_a: 5,
    pontuacao_m: 6,
    pontuacao_c: 2
  })

  const response = await client.delete(BASE_URL+newProfile.id)
                  .loginVia(user, 'jwt')
                  .end()
  response.assertStatus(401)
  response.assertJSONSubset({error: 'Not authorized'})
}).timeout(0)
