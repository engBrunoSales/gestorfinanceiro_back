const app = require('./app')

require('dotenv').config('../')

const port = process.env.PORT || 3000

// inicialização do servidor express
app.listen(port, () => {
  console.log('Backend rodando...')
})