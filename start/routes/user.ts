import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('user', 'UserController.index')
  Route.post('user', 'UserController.store')
  Route.get('user/:id', 'UserController.show')
  Route.put('user/:id', 'UserController.update')
  Route.delete('user/:id', 'UserController.destroy')
}).prefix('api/')
