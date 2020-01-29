'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Testes para a Carteira')
const Carteira = use('App/Models/Carteira')

trait('Test/ApiClient')
trait('Auth/Client')

test('Consulta de todas as carteiras de um usuário', async ({ client }) => {
  assert.equal(0, 4)
})

test('Consulta de uma carteira especifica', async ({ client }) => {
  assert.equal(0, 4)
})

test('Criação de uma carteira', async ({ client }) => {
  assert.equal(0, 4)
})

test('Alteração de uma carteira', async ({ client }) => {
  assert.equal(0, 4)
})

test('Deleção de uma carteira', async ({ client }) => {
  assert.equal(0, 4)
})
