'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfileSchema extends Schema {
  up () {
    this.create('profiles', (table) => {
      table.increments()
      table.string('nome', 100).notNullable()

      table.integer('user_id').unsigned().notNullable().index('idx_user_id_profile')
      table.foreign('user_id').references('id').inTable('users')

      table.integer('pontuacao_a').notNullable()
      table.integer('pontuacao_m').notNullable()
      table.integer('pontuacao_c').notNullable()
      table.timestamps()


    })
  }

  down () {
    this.drop('profiles')
  }
}

module.exports = ProfileSchema
