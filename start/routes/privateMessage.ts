import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('message-private/:userId', 'PrivateMessagesController.getUserMessage')
  Route.get('message-private', 'PrivateMessagesController.index')
  Route.post('message-private/:senderId/:receiverId', 'PrivateMessagesController.store')
}).prefix('api/')
