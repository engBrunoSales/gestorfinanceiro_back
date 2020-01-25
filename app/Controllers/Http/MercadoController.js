'use strict'
const Mercado = use("App/Models/Mercado")

class MercadoController {
	async get({response, request, auth, params}) {
		const user = await auth.getUser()
		if (user) {
			if(params.id){
				const mercados = await Mercado.find(params.id)
				return response.status(200).json(mercados) 
			}else{
				const mercados = await Mercado.all()
				return response.status(200).json(mercados)
			}
		} else { 
			return response.status(401)
		} 
	}

	async post({response, request, auth}) {
		const user = await auth.getUser()
		if(user.admin){
			const mercado = await Mercado.create({
				...request.only(['nome'])
			})
			return response.created(mercado) 
		} else {
			return response.status(401)
		}
	}

	async put({response, request, auth, params}) {
		const user = await auth.getUser()
		if(user.admin) {
			const data = {...request.only(['nome'])}
			const mercado = await Mercado.find(params.id)
			mercado.nome = data.nome
			await mercado.save()
			return response.status(201).json(mercado)
		}
		else {
			return response.status(401)	
		}
	}

	async delete({response, request, auth, params}) {
		const user = await auth.getUser()
		if(user.admin) {
			const mercado = await Mercado.find(params.id)
			await mercado.delete()
			return response.status(201)
		} else {
			return response.status(401)	
		}
	}
}

module.exports = MercadoController
