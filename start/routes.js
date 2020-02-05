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
	| Rota: -> Controller: SessionController
	|--------------------------------------------------------------------------
	*/
  Route.get('/login', 'SessionController.login').validator('Login')
  Route.get('/logout', 'SessionController.logout')

  /*
	|--------------------------------------------------------------------------
	| Rota: /api/users -> Controller: UserController
	|--------------------------------------------------------------------------
  */
  Route.resource('users', 'UserController').apiOnly()
    .validator(new Map([
      [['users.store'], ['CreateUser']],
      [['users.update'], ['UpdateUser']]
    ]))
    .middleware(new Map([
      [['users.index'], ['auth']],
      [['users.show'], ['auth']],
      [['users.update'], ['auth']],
      [['users.destroy'], ['auth']]
    ]))

	/*
	|--------------------------------------------------------------------------
	| Rota: /api/mercados -> Controller: MercadoController
	|--------------------------------------------------------------------------
  */
  Route.resource('mercados', 'MercadoController').apiOnly()
    .validator(new Map([
      [['mercados.store'], ['CreateMercado']],
      [['mercados.update'], ['CreateMercado']]
    ]))
    .middleware(['auth'])

  /*
	|--------------------------------------------------------------------------
	| Rota: /api/carteiras -> Controller: CarteiraController
	|--------------------------------------------------------------------------
  */
  Route.resource('carteiras', 'CarteiraController').apiOnly()
  .middleware(['auth'])
  .validator(new Map([
    [['carteiras.store'], ['CreateCarteira']],
    [['carteiras.update'], ['CreateCarteira']]
  ]))

  /*
	|--------------------------------------------------------------------------
	| Rota: /api/carteiras -> Controller: CarteiraController
	|--------------------------------------------------------------------------
  */
  Route.resource('profiles', 'ProfileController').apiOnly()
  .middleware(['auth'])
  .validator(new Map([
    [['profiles.store'], ['CreateProfile']],
    [['profiles.update'], ['CreateProfile']]
  ]))


}).prefix('api')
