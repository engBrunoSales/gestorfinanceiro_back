'use strict'

const Token = use('App/Models/Token')

class SessionController {

  async login({request, auth}){
    const {cpf, password} = request.all()
    const token = await auth.attempt(cpf, password)

    return token
  }

  async logout({auth, response}){
    const user = await auth.getUser()
    if(!user){
      return response.status(401).send({ error: 'Not authorized' })
    }

    await Token.query().where('user_id', user.id).delete()
  }
}

module.exports = SessionController
