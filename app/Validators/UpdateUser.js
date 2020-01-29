'use strict'

class UpdateUser {
  get rules () {
    return {
      nome: 'string',
      nascimento: 'date',
      telefone: 'string',
      local: 'string',
      password: 'string'
    }
  }

  get messages () {
    return {
      string: '{{ field }} não é uma string válida',
      date: '{{ field }} não é uma data válida'
    }
  }

  get validateAll () {
    return true
  }

  async fails (errorMessages) {
  	return this.ctx.response.status(400).json(errorMessages)
  }
}

module.exports = UpdateUser
