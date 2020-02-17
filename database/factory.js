'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const CPF = require("cpf_cnpj").CPF
const faker = require('faker')
faker.locale = "pt_BR";

Factory.blueprint('App/Models/User', () => {
	return {
		cpf: CPF.generate(),
		nome: faker.name.findName(),
		email: faker.internet.email(),
		nascimento: '1992-02-27 00:00:00',
		password: 'password123',
		telefone: faker.phone.phoneNumber(),
		local: faker.address.streetAddress(),
		admin: false
	}
})

Factory.blueprint('App/Models/Mercado', () => {
	return {
		nome: faker.lorem.sentence()
	}
})

Factory.blueprint('App/Models/Carteira', () => {
  return {
    nome: faker.lorem.sentence()
  }
})

Factory.blueprint('App/Models/Profile', async () => {

  return {
    nome: faker.lorem.sentence(),
    pontuacao_a: faker.random.number(),
    pontuacao_m: faker.random.number(),
    pontuacao_c: faker.random.number()
  }
})

Factory.blueprint('App/Models/Ativo', async () => {

  return {
    cod_bovespa: faker.name.prefix() + faker.random.number(20000),
    nome_empresa: faker.company.companyName(),
    cotacao: faker.commerce.price(10, 12),
    preco_max: faker.commerce.price(12, 14),
    preco_min: faker.commerce.price(8, 10),
    dt_atualizacao: '2020-02-16 00:00:00',
    valido: true
  }
})
