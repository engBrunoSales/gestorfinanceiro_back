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



Route.group(() => {

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
  Route.resource('mercados', 'MercadoController').apiOnly().except(['store', 'update']).middleware(['auth'])
  Route.post('/mercados', 'MercadoController.store').validator('CreateMercado').middleware(['auth'])
  Route.put('/mercados/:id', 'MercadoController.update').validator('CreateMercado').middleware(['auth'])
}).prefix('api')
