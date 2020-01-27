'use strict'
const Mercado = use("App/Models/Mercado")

class MercadoController {
  async index() {
    const mercados = await Mercado.all()
    return mercados
  }

  async show({params}) {
    const mercado = await Mercado.findOrFail(params.id)

    return mercado
  }

  async store({request, auth}){
    const nome = request.only(['nome'])
    const user = await auth.getUser()
    if(!user.admin){
      return response.status(401).send({ error: 'Not authorized' })
    }

    const mercado = new Mercado()
    mercado.nome = nome
    await mercado.save()
  }

  async update({params, request, auth}) {
    const nome = request.only['nome']
    const user = await auth.getUser()
    if(!user.admin){
      return response.status(401).send({ error: 'Not authorized' })
    }
    const mercado = await Mercado.findOrFail(params.id)
    mercado.nome = nome
    await mercado.save()
  }

  async destroy({params, auth}) {
    const user = await auth.getUser()
    if(!user.admin){
      return response.status(401).send({ error: 'Not authorized' })
    }

    const mercado = await Mercado.find(params.id)
    await mercado.delete()
  }

}

module.exports = MercadoController
