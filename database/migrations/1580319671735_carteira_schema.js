'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CarteiraSchema extends Schema {
  up () {
    this.create('carteiras', (table) => {
      table.increments()
      table.string('nome', 100).notNullable()
      table.integer('user_id').unsigned().notNullable().index('idx_user_id_carteira')
      table.timestamps()

      table.foreign('user_id').references('id').inTable('users')
    })
  }

  down () {
    this.drop('carteiras')
  }
}

module.exports = CarteiraSchema
