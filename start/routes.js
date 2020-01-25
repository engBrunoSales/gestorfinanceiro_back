'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/*
|--------------------------------------------------------------------------
| Rota: /users -> Model: User
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Rota: /mercados -> Controller: MercadoController
|--------------------------------------------------------------------------
*/
Route.group(() => { 	
	Route.get('/', 'MercadoController.get')
	Route.get('/:id', 'MercadoController.get')
	Route.post('/', 'MercadoController.post').validator('CreateMercado')
	Route.put('/:id', 'MercadoController.put')
	Route.delete('/:id', 'MercadoController.delete')
}).prefix('api/mercados').middleware(['auth'])