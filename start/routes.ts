import Route from '@ioc:Adonis/Core/Route'
import './routes/message'
import './routes/channel'
import './routes/user'

Route.get('/', () => {
  return { success: true }
})
