'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MercadoSchema extends Schema {
  up () {
    this.create('mercados', (table) => {
      table.increments()
      table.string('nome', 200).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('mercados')
  }
}

module.exports = MercadoSchema
