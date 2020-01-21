/* 
  FUNÇÕES DE SERVIÇOS (para uso nos arquivos de rotas):
  - findAll:  get /users
  - create: post /users
*/

const bcrypt = require('bcrypt-nodejs')
const ValidationError = require('../errors/ValidationError')

module.exports = app => {
  const save = async (user) => {
    // if (!user.cpf) throw new ValidationError('Nome é um campo obrigatório.')
    // if (!user.admin) throw new ValidationError('Admin?')

    if (!user.nome) throw new ValidationError('Nome é um campo obrigatório.')
    if (!user.nascimento) throw new ValidationError('Nascimento é um campo obrigatório.')
    if (!user.email) throw new ValidationError('E-mail é um campo obrigatório.')
    if (!user.senha) throw new ValidationError('Senha é um campo obrigatório.')
    if (!user.confirmarSenha) throw new ValidationError('Você deve confirmar a senha.')

    // const userDB = await getOne({ mail: user.mail })
    // if (userDB) throw new ValidationError('Email já cadastrado.')
    
    const newUser = { ...user }
    delete newUser.confirmarSenha
    // newUser.password = getPassHash(user.password)

    // return app.db('users').insert(newUser, ['id', 'name', 'mail'])
    return app.db('users').insert(newUser, ['cpf'])
  }

  const get = () => {
    return app.db('users').select(['cpf', 'nome', 'email', 'admin'])
  }

  // const getOne = (filter = {}) => {
  //   return app.db('users').where(filter).first()
  // }

  // const getPassHash = (password) => {
  //   const salt = bcrypt.genSaltSync(10)
  //   return bcrypt.hashSync(password, salt)
  // }

  return { save, get }
}