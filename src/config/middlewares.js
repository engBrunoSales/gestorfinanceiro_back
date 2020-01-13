// middlewares => funções que são executadas no meio de uma requisição
// interceptando e encaminhando ou não, para funções posteriores
// a ordem de declaração dos middlewares é importante

const bodyParser = require('body-parser')

module.exports = app => {
  app.use(bodyParser.json())
}