/* 
  FUNÇÕES DE ROTAS (para uso no módulo de rotas):
  - findAll:  get /users
  - create: post /users
*/
module.exports = () => {
  const findAll = (req, res) => {
    const users = [{ name: 'Jemima Luz', mail: 'jemima@mail.com' }]
    res.status(200).json(users)
  }

  const create = (req, res) => {
    res.status(201).json(req.body)
  }

  return { findAll, create }
}