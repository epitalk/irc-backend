import Route from '@ioc:Adonis/Core/Route'
import './routes/sse-starter'
import './routes/message'
import './routes/channel'
import './routes/user'

Route.get('/', () => {
  return { test: 'ok' }
})
