import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('channel', 'ChannelController.index')
  Route.post('channel', 'ChannelController.store')
  Route.post('channel/user', 'ChannelController.addUserChannel')
  Route.delete('channel/user', 'ChannelController.removeUserChannel')
  Route.get('channel/:id', 'ChannelController.show')
  Route.put('channel/:id', 'ChannelController.update')
  Route.delete('channel/:name', 'ChannelController.destroy')
}).prefix('api/')
