import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('message', 'MessageController.index')
  Route.post('message', 'MessageController.store')
  Route.get('message/:id', 'MessageController.show')
  Route.put('message/:id', 'MessageController.update')
  Route.delete('message/:id', 'MessageController.destroy')
}).prefix('api/')
