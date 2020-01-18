/*
  CREDENCIAIS DO BANCO 
  - test: banco de desenvolvimento
  - production: banco de produção
*/
require('dotenv').config();

module.exports = {
  test: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      charset: process.env.DB_CHARSET
    },
    migrations: {
      diretory: 'src/migrations',
      tableName: 'migrations'
    }
  },
  production: {
    client: process.env.DB_CLIENT,
    connection: process.env.DB_URL + `?ssl=true`,
    migrations: {
      diretory: __dirname + 'src/migrations'
    }
  }
}