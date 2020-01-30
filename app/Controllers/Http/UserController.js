'use strict'

const User = use('App/Models/User')

class UserController {

  async index({auth, response}){
    const user = await auth.getUser()
    if(user.admin == false){
      return response.status(401).send({error: 'Not authorized'})
    }
    const users = await User.all()
    return await users.toJSON()
  }

  async show({params, auth, response}){
    const user = await auth.getUser()
    if(user.id == params.id || user.admin == true){
      const userShow = await User.findOrFail(params.id)
      return await userShow.toJSON()
    }else{
      return response.status(401).send({error: 'Not authorized'})
    }
  }

  async store({request}){
    const userData = request.all()
    await User.create(userData)
  }

  async update({auth, params, response, request}){
    const user = await auth.getUser()
    if(user.id == params.id || user.admin == true){
      const userData = request.all()
      user.merge(userData)
      await user.save()
    } else {
      return response.status(401).send({error: 'Not authorized'})
    }
  }

  async destroy({auth, params, response}){
    const userAdmin = await auth.getUser()
    if(userAdmin.admin == false){
      return response.status(401).send({error: 'Not authorized'})
    }

    const userFind = await User.find(params.id)
    await userFind.delete()
  }

}

module.exports = UserController
