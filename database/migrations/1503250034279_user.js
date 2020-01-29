'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('email', 254).notNullable().unique().index('idx_users_email')
      table.string('password', 60).notNullable()
      table.string('cpf', 11).notNullable().unique().index('idx_users_cpf')
      table.string('nome', 254).notNullable()
      table.date('nascimento').notNullable()
      table.string('telefone', 25)
      table.string('local', 200)
      table.boolean('admin').notNullable().defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
