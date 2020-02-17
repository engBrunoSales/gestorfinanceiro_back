'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AtivoSchema extends Schema {
  up () {
    this.create('ativos', (table) => {
      table.increments()
      table.string('cod_bovespa', 25).notNullable().unique()
      table.string('nome_empresa', 100).notNullable()
      table.integer('mercado_id').unsigned().references('id').inTable('mercados')
      table.decimal('cotacao').notNullable()
      table.decimal('preco_max').notNullable()
      table.decimal('preco_min').notNullable()
      table.date('dt_atualizacao').notNullable()
      table.boolean('valido').notNullable().defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('ativos')
  }
}

module.exports = AtivoSchema
