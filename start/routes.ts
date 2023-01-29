import Route from '@ioc:Adonis/Core/Route'
import './routes/channelMessage'
import './routes/privateMessage'
import './routes/channel'
import './routes/user'

Route.get('/', () => {
  return { success: true }
})
