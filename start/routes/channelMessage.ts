import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('message', 'ChannelMessageController.index')
  Route.post('message/channel/:channel', 'ChannelMessageController.store')
  Route.get('message/:id', 'ChannelMessageController.show')
  Route.put('message/:id', 'ChannelMessageController.update')
  Route.delete('message/:id', 'ChannelMessageController.destroy')
}).prefix('api/')
