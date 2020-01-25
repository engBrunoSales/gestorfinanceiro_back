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

Factory.blueprint('App/Models/User', () => {		   
	return {
		username: faker.internet.userName(),
		cpf: CPF.generate(),
		nome: faker.name.findName(),
		email: faker.internet.email(),
		nascimento: faker.date.past(),
		password: 'password123',
		telefone: faker.phone.phoneNumber(),
		local: faker.address.streetAddress(),
		admin: true
	}
})

Factory.blueprint('App/Models/Mercado', () => {
	return {
		nome: faker.lorem.sentence()
	}
})