import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('channel', 'ChannelController.index')
  Route.post('channel', 'ChannelController.store')
  Route.post('channel/user', 'ChannelController.store')
  Route.get('channel/:id', 'ChannelController.show')
  Route.put('channel/:id', 'ChannelController.update')
  Route.delete('channel/:name', 'ChannelController.destroy')
}).prefix('api/')
