/*
  CREDENCIAIS DO BANCO 
  - development: banco de desenvolvimento
  - test: banco de test
  - production: banco de produção
*/
require('dotenv').config();

module.exports = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      charset: process.env.DB_CHARSET
    },
    seeds: {
      directory: 'src/db/seeds/'
    },
    migrations: {
      directory: 'src/db/migrations/'
    }
  },
  test: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      database: 'gestorfinaceiro_test',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      charset: process.env.DB_CHARSET
    },
    seeds: {
      directory: 'src/db/seeds/'
    },
    migrations: {
      directory: 'src/db/migrations/'
    }
  },
  production: {
    client: process.env.DB_CLIENT,
    connection: process.env.DB_URL + `?ssl=true`,
    seeds: {
      directory: __dirname + 'src/db/seeds/'
    },
    migrations: {
      directory: __dirname + 'src/db/migrations/'
    }
  }
}