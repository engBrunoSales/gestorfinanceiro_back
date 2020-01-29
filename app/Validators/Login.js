'use strict'

class Login {
  get rules () {
    return {
      cpf: 'required|string',
      password: 'required|string'
    }
  }

  get messages () {
  	return {
  		required: '{{ field }} é obrigatório',
  		string: '{{ field }} não é uma string válida'
  	}
  }

  get validateAll () {
  	return true
  }

  async fails (errorMessages) {
  	return this.ctx.response.status(400).json(errorMessages)
  }
}

module.exports = Login
