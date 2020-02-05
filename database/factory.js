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
