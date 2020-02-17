'use strict'
const Ativo = use("App/Models/Ativo")

class AtivoController {

  async index({auth, response}) {
    const user = await auth.getUser()
    if(user){
      const ativos = await Ativo
        .query()
        .where('valido', '=', true)
        .with('mercado')
        .fetch()
      return ativos.toJSON()
    }else{
      return response.status(401).send({ error: 'Not authorized' })
    }
  }

  async show({auth, response, params}) {
    const user = await auth.getUser()
    if(user){
      const ativos = await Ativo
        .query()
        .where('id', '=', params.id)
        .with('mercado')
        .fetch()
      return ativos.toJSON()
    }else{
      return response.status(401).send({ error: 'Not authorized' })
    }
  }

  async store({request, auth, response}) {
    const user = await auth.getUser()
    if(!user.admin){
      return response.status(401).send({ error: 'Not authorized' })
    }else{
      const ativoData = request.all()
      await Ativo.create(ativoData)
    }
  }

  async update({request, auth, response, params}) {
    const user = await auth.getUser()
    if(!user.admin){
      return response.status(401).send({ error: 'Not authorized' })
    }else{
      const ativoData = request.all()
      const ativo = await Ativo.findOrFail(params.id)
      ativo.merge(ativoData)
      await ativo.save()
    }
  }

  async destroy({auth, response, params}) {
    const user = await auth.getUser()
    if(!user.admin){
      return response.status(401).send({ error: 'Not authorized' })
    }else{
      const ativo = await Ativo.findOrFail(params.id)
      await ativo.delete()
    }
  }

}

module.exports = AtivoController
