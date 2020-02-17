'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Mercado extends Model {

  ativos () {
    return this.hasMany('App/Models/Ativo')
  }
}

module.exports = Mercado
