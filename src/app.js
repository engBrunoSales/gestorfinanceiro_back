const app = require('express')()
const consign = require('consign')

// cwd => especifica o diretorio padrao para o consign
// verbose false => omite a inicialização do consign
consign({ cwd: 'src', verbose: false })
  .include('./config/middlewares.js')
  .then('./routes')
  .then('./config/routes.js')
  .into(app)

// rota genérica
app.get('/', (req, res) => {
  res.status(200).send()
})

// exportando o objeto app
module.exports = app