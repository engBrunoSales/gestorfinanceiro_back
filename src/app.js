const app = require('express')()
const consign = require('consign')

const knex = require('knex')
const knexfile = require('../knexfile')
const environment = process.env.NODE_ENV || 'development';

// tem que referenciar o ambiente vigente do knexfile (test ou production)
// app.db = knex(knexfile[environment])
app.db = knex(knexfile.development)

// cwd => especifica o diretorio padrao para o consign
// verbose false => omite a inicialização do consign
consign({ cwd: 'src', verbose: false })
  .include('./config/middlewares.js')
  .then('./services')
  .then('./routes')
  .then('./config/routes.js')
  .into(app)

// rota genérica
app.get('/', (req, res) => {
  res.status(200).send()
})

// middleware para tratamento de erros
app.use((err, req, res, next) => {
  const { name, message } = err
  if (name === 'ValidationError') res.status(400).json({ error: message })
  if (name === 'RecursoIndevidoError') res.status(403).json({ error: message })
  else res.status(500).json({ name, message })
  next(err)
})

// LOGGER MANUAL - para visualizar o que as querys tão retornando é só descomentar
// app.db.on('query', (query) => {
//   console.log({ sql: query.sql, bindings: query.bindings ? query.bindings.join(',') : '' })
// }).on('query-response', (response) => {
//   console.log(response)
// })

// exportando o objeto app
module.exports = app