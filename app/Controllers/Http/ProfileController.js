'use strict'

const Profile = use('App/Models/Profile')

class ProfileController {

  async index ({auth, response}) {
    const user = await auth.getUser()
    if(!user.admin){
      return response.status(401).send({error: 'Not authorized'})
    }else{
      const profiles = await Profile.all()
      return await profiles.toJSON()
    }
  }

  async show ({auth, response, params}) {
    const user = await auth.getUser()

    const profileUser = await user.profile().fetch()

    if(profileUser.id == params.id){
      return await profileUser.toJSON()
    }else if(user.admin){
      const profile = await Profile.find(params.id)
      return await profile.toJSON()
    }else{
      return response.status(401).send({error: 'Not authorized'})
    }

  }

  async store ({auth, request, response}) {
    const dados = request.all()
    const user = await auth.getUser()

    const profileUser = await user.profile().fetch()

    if(!profileUser){
      await user.profile().create(dados)
    }else{
      return response.status(400).send({error: 'Usuário já possui profile cadastrado'})
    }
  }

  async update ({auth, request, params, response}) {
    const user = await auth.getUser()
    const dados = request.all()
    const profile = await user.profile().fetch()
    if(profile && profile.id == params.id){
      await user.profile().where('id', params.id).update(dados)
    }else if(user.admin){
      await Profile.where('id', params.id).update(dados)
    }
    else{
      return response.status(401).send({error: 'Not authorized'})
    }
  }

  async destroy ({auth, params, response}) {
    const user = await auth.getUser()
    const profileUser = await user.profile().fetch()

    if(profileUser && profileUser.id == params.id){
      await user.profile().delete()
    }else if(user.admin){
      await Profile.query().where('id', params.id).delete()
    }else{
      return response.status(401).send({error: 'Not authorized'})
    }
  }
}

module.exports = ProfileController
