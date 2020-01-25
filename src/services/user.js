/* 
  FUNÇÕES DE SERVIÇOS (para uso nos arquivos de rotas):
  - findAll:  get /users
  - create: post /users
*/

const bcrypt = require('bcrypt-nodejs')
const { cpf } = require('cpf-cnpj-validator')
const ValidationError = require('../errors/ValidationError')
// const a = cpf.isValid(cpf)

module.exports = app => {
  const getHash = (att) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(att, salt)
  }

  const save = async (user) => {
    if (!user.cpf) throw new ValidationError('Cpf é um campo obrigatório.')
    if(!cpf.isValid(user.cpf)) throw new ValidationError('Este não é um número de CPF válido.')
    // if (!user.admin) throw new ValidationError('Admin?')

    if (!user.nome) throw new ValidationError('Nome é um campo obrigatório.')
    if (!user.nascimento) throw new ValidationError('Nascimento é um campo obrigatório.')
    if (!user.email) throw new ValidationError('E-mail é um campo obrigatório.')
    if (!user.senha) throw new ValidationError('Senha é um campo obrigatório.')
    if (!user.confirmarSenha) throw new ValidationError('Você deve confirmar a senha.')


    const userCpfDB = await getOne({ cpf: user.cpf })
    if (userCpfDB) throw new ValidationError('CPF já cadastrado.')

    const userMailDB = await getOne({ email: user.email })
    if (userMailDB) throw new ValidationError('Email já cadastrado.')
    
    const newUser = { ...user }
    delete newUser.confirmarSenha
    newUser.senha = getHash(user.senha)
    // newUser.cpf = getHash(user.cpf)

    return app.db('users').insert(newUser, 'cpf')
  }

  const get = () => {
    return app.db('users').select(['cpf', 'nome', 'email', 'admin'])
  }

  const getOne = (filter = {}) => {
    return app.db('users').where(filter).first()
  }

  return { save, get }
}