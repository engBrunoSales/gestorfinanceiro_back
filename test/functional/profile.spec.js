'use strict'

const Profile = use('App/Models/Profile')
const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Teste para o Profile')

trait('Test/ApiClient')
trait('Auth/Client')

const BASE_URL = '/api/profiles/'

test('Listar todos os profiles - Logado Admin', async ({client}) => {
  const user = await Factory.model('App/Models/User').make()
  user.admin = true
  await user.save()

  const profiles = await Factory.model('App/Models/Profile').createMany(10)

  const response = await client.get(BASE_URL)
                  .loginVia(user, 'jwt')
                  .end()
  response.assertStatus(200)
})

test('Listar todos os profiles - Não Logado Admin', async ({client}) => {
  const user = await Factory.model('App/Models/User').make()
  user.admin = false
  await user.save()

  const profiles = await Factory.model('App/Models/Profile').createMany(10)

  const response = await client.get(BASE_URL)
                  .loginVia(user, 'jwt')
                  .end()
  response.assertStatus(401)
})

test('Listar um profile', async ({client}) => {
  const user = await Factory.model('App/Models/User').make()
  user.admin = false
  await user.save()

  const profile = await user.profile().create({
    nome: 'Conservador',
    pontuacao_a: 5,
    pontuacao_m: 6,
    pontuacao_c: 2
  })

  const response = await client.get(BASE_URL+profile.id)
                  .loginVia(user, 'jwt')
                  .end()
  response.assertStatus(200)
  response.assertJSONSubset([
    {
      nome: 'Conservador',
      pontuacao_a: 5,
      pontuacao_m: 6,
      pontuacao_c: 2
    }
  ])

})

test('Criar um profile', async ({client}) => {
  const user = await Factory.model('App/Models/User').make()
  user.admin = false
  await user.save()

  const data = {
    nome: '',
    pontuacao_a: 5,
    pontuacao_m: 6,
    pontuacao_c: 2
  }

  const response = await client.post(BASE_URL)
                  .loginVia(user, 'jwt')
                  .send(data)
                  .end()
  response.assertStatus(204)

})

test('Alterar um profile', async ({client}) => {
  const user = await Factory.model('App/Models/User').make()
  user.admin = false
  await user.save()

  const profile = await user.profile().create({
    nome: 'Conservador',
    pontuacao_a: 5,
    pontuacao_m: 6,
    pontuacao_c: 2
  })

  const data = {
    nome: 'Moderado',
    pontuacao_a: 5,
    pontuacao_m: 6,
    pontuacao_c: 2
  }

  const response = await client.put(BASE_URL+profile.id)
                  .loginVia(user, 'jwt')
                  .send(data)
                  .end()
  response.assertStatus(204)

})

test('Deletar um profile - Logado Admin', async ({client}) => {
  const userAdmin = await Factory.model('App/Models/User').make()
  user.admin = true
  await user.save()

  const user = await Factory.model('App/Models/User').make()
  user.admin = false
  await user.save()

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
})

test('Deletar um profile - Não logado Admin', async ({client}) => {

  const user = await Factory.model('App/Models/User').make()
  user.admin = false
  await user.save()

  const profile = await user.profile().create({
    nome: 'Conservador',
    pontuacao_a: 5,
    pontuacao_m: 6,
    pontuacao_c: 2
  })

  const response = await client.delete(BASE_URL+profile.id)
                  .loginVia(user, 'jwt')
                  .end()
  response.assertStatus(401)
})
