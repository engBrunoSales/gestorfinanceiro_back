const request = require('supertest')
const app = require('../src/app')

const MAIN_ROUTE = '/users'
// expectativas sempre começam pelo res.status
const nome = 'User 1'
const nascimento = '1997-09-14'
const email = `${Date.now()}@gmail.com`
const senha = '123'
const confirmarSenha = '123'
const admin = false
const telefone = '85900000000'
const local = 'Fortaleza,CE'

const user1 = { nome, nascimento, email, senha, confirmarSenha, admin, telefone, local }

// testes bãsicos: 
// 1: realizar um GET no /users esperando: status 200 e uma lista como resposta
// 2: realizar um POST no /users enviando um objeto com .send() esperando: status 201 de inserção

test('Deve inserir usuário.', () => {
  return request(app).post(MAIN_ROUTE)
    .send(user1)
    .then(res => {
      expect(res.status).toBe(201)
      expect(res.body[0]).toBeGreaterThan(0)
    })
})

test('Deve listar todos os usuários', () => {
  return request(app).get(MAIN_ROUTE)
    .then(res => {
      expect(res.status).toBe(200)
      expect(res.body.length).toBeGreaterThan(0)

      expect(res.body[0]).toHaveProperty('cpf')
      expect(res.body[0]).toHaveProperty('nome')
      expect(res.body[0]).toHaveProperty('email')
      expect(res.body[0]).toHaveProperty('admin')
    })
})

// describe('Ao tentar inserir usuário:', () => {

  // const testTemplate = (newData, errorMessage) => { 
  //   return request(app).post(MAIN_ROUTE)
  //     .send({ nome, nascimento, email, senha, confirmarSenha, admin, telefone, local })
  //     // .set('authorization', `bearer ${user.token}`)
  //     .then(res => {
  //       // console.log(res.body)
  //       expect(res.status).toBe(400)
  //       expect(res.body.error).toBe(errorMessage)
  //     })
  // }

  // test.skip('Não deve inserir sem cpf', () => testTemplate({ cpf: null }, 'CPF é um campo obrigatório.'))
  // test.skip('Não deve inserir sem admin', () => testTemplate({ admin: null }, 'Admin?'))
  // test.skip('Não deve inserir com cpf existente', () => testTemplate({ cpf: null }, 'Já existe um usuário cadastrado com este CPF.'))
  // test.skip('Não deve inserir com email existente', () => testTemplate({ email: null }, 'Já existe um usuário cadastrado com este CPF.'))
  
  // test('Não deve inserir sem nome', () => testTemplate({ nome: null }, 'Nome é um campo obrigatório.'))
  // test('Não deve inserir sem data de nascimento', () => testTemplate({ email: null }, 'Data de nascimento é um campo obrigatório.'))
  // test('Não deve inserir sem email', () => testTemplate({ email: null }, 'E-mail é um campo obrigatório.'))
  // test('Não deve inserir sem senha', () => testTemplate({ senha: null }, 'Senha é um campo obrigatório.'))
  // test('Não deve inserir sem confirmar senha', () => testTemplate({ confirmarSenha: null }, 'Você deve confirmar a senha.'))


// })