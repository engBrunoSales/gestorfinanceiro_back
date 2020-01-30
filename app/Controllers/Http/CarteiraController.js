'use strict'


const User = use('App/Models/User')

class CarteiraController {

  async index({auth}){
    const user = await auth.getUser()
    const carteiras = await user.carteiras().fetch()
    return await carteiras.toJSON()
  }

  async show({auth, params}){
    const user = await auth.getUser()
    const carteira = await user.carteiras(params.id).fetch()
    return await carteira.toJSON()
  }

  async store({auth, request}){
    const user = await auth.getUser()
    const data = request.all()
    await user.carteiras().create(data)
  }

  async update({auth, params, request}){
    const user = await auth.getUser()
    const data = request.all()
    await user.carteiras().where('id', params.id).update(data)
  }

  async destroy({auth, params}){
    const user = await auth.getUser()
    await user.carteiras().where('id', params.id).delete()
  }

}

module.exports = CarteiraController
