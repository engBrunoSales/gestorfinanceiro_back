'use strict'
const Mercado = use("App/Models/Mercado")

class MercadoController {
  async index() {
    const mercados = await Mercado.all()
    return await mercados.toJSON()
  }

  async show({params}) {
    const mercado = await Mercado.findOrFail(params.id)

    return await mercado.toJSON()
  }

  async store({request, auth, response}){
    const user = await auth.getUser()
    if(user.admin == false){
      return response.status(401).send({ error: 'Not authorized' })
    }
    const mercadoData = request.all()
    await Mercado.create(mercadoData)
  }

  async update({params, request, auth, response}) {
    const user = await auth.getUser()
    if(user.admin == false){
      return response.status(401).send({ error: 'Not authorized' })
    }
    const mercadoData = request.all()
    const mercado = await Mercado.findOrFail(params.id)
    mercado.merge(mercadoData)
    await mercado.save()
  }

  async destroy({params, auth, response}) {
    const user = await auth.getUser()
    if(user.admin == false){
      return response.status(401).send({ error: 'Not authorized' })
    }

    const mercado = await Mercado.find(params.id)
    await mercado.delete()
  }

}

module.exports = MercadoController
