import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('message-private/:userId', 'PrivateMessagesController.getUsersWithMessage')
  Route.get('message-private', 'PrivateMessagesController.index')
  Route.post('message-private/:sender/:receiver', 'PrivateMessagesController.store')
}).prefix('api/')
