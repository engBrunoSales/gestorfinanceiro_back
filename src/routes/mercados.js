/* 
  FUNÇÕES DE ROTAS (para uso no roteador):
  - findAll:  get /mercados
  - create: post /mercados
*/

const express = require('express')

module.exports = (app) => {
  const mercadosRouter = express.Router()
  app.use('/mercados', mercadosRouter)

  mercadosRouter.get('/', (req, res) => {
    app.services.mercado.get()
      .then(result => {
        res.status(200).json(result)})
  })

  mercadosRouter.get('/:id', (req, res) => {
    app.services.mercado.get(req.params.id)
      .then(result => {
        res.status(200).json(result)})
  })

  // o retorno do mysql é um número, por padrão.
  mercadosRouter.post('/', async (req, res, next) => {
    try {
      const result = await app.services.mercado.save(req.body)
      return res.status(201).json(result)
    } catch (err) {
      return next(err)
    }
  })

  return mercadosRouter
}