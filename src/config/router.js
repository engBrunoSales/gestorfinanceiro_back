/*
  MÒDULO DE ROTAS (ROTEADOR):
  notação: app.route('nomeDaRota').[metodo](app.pasta.arquivo.funcaoCorrespondente)
*/

const express = require('express')

module.exports = app => {
  // app.use('/auth', app.routes.auth)
  const protectedRouter = express.Router()

  protectedRouter.use('/users', app.routes.users)
  protectedRouter.use('/mercados', app.routes.mercados)

  // roteador rotegido VERSÂO 1
  // app.use('/v1', app.config.passport.authenticate(), protectedRouter)
}