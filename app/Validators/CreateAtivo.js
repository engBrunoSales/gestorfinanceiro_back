'use strict'

class CreateAtivo {
  get rules () {
    return {
      cod_bovespa: 'required|string',
      nome_empresa: 'required|string',
      cotacao: 'required',
      preco_max: 'required',
      preco_min: 'required',
      dt_atualizacao: 'required'
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

module.exports = CreateAtivo
