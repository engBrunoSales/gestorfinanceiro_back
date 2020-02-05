'use strict'

class CreateProfile {
  get rules () {
    return {
      nome: 'required|string',
      pontuacao_a: 'required|integer',
      pontuacao_m: 'required|integer',
      pontuacao_c: 'required|integer'
    }
  }

  get messages () {
    return {
      required: '{{ field }} é obrigatório',
      string: '{{ field }} não é uma string válida',
      integer: '{{ field }} não é um inteiro válido'
    }
  }

  get validateAll () {
    return true
  }

  async fails (errorMessages) {
  	return this.ctx.response.status(400).json(errorMessages)
  }
}

module.exports = CreateProfile
