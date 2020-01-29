'use strict'

class CreateUser {
  get rules () {
    return {
      nome: 'required|string',
      email: 'required|email|unique:users',
      password: 'required',
      cpf: 'required|string|unique:users',
      nascimento: 'required',
      telefone: 'string',
      local: 'string'
    }
  }

  get messages () {
    return {
      required: '{{ field }} é obrigatório',
      email: 'E-mail inválido',
      string: '{{ field }} não é uma string válida',
      date: '{{ field }} não é uma data válida',
      'email.unique': 'E-mail já cadastrado',
      'cpf.unique': 'Cpf já cadastrado'
    }
  }

  get validateAll () {
    return true
  }

  async fails (errorMessages) {
  	return this.ctx.response.status(400).json(errorMessages)
  }
}

module.exports = CreateUser
