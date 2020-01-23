/* 
  FUNÇÕES DE SERVIÇOS (para uso nos arquivos de rotas):
  - findAll:  get /mercados
  - create: post /mercados
*/

const ValidationError = require('../errors/ValidationError')

module.exports = app => {
  const get = (id) => {
    if (id) return app.db('mercados').select(['nome']).where('id', id)
    else return app.db('mercados').select(['nome'])  
  }

  const save = async (mercado) => {
    return 0
  }

  return { get, save }
}