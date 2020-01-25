/* 
  FUNÇÕES DE ROTAS (para uso no roteador):
  - findAll:  get /users
  - create: post /users
*/

const express = require('express')

module.exports = (app) => {
  const usersRouter = express.Router()
  app.use('/users', usersRouter)

  usersRouter.get('/', (req, res) => {
    app.services.user.get()
      .then(result => res.status(200).json(result))
  })

  // o retorno do mysql é um número, por padrão.
  usersRouter.post('/', async (req, res, next) => {
    try {
      const result = await app.services.user.save(req.body)
      return res.status(201).json(result)
    } catch (err) {
      return next(err)
    }
  })

  return usersRouter
}