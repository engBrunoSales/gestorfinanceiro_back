'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Ativo extends Model {

  mercado () {
    return this.belongsTo('App/Models/Mercado')
  }

}

module.exports = Ativo
