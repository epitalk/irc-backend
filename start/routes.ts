import Route from '@ioc:Adonis/Core/Route'
import PostsController from 'App/Controllers/Http/PostsController'
import './routes/sse-starter.ts'

Route.get('/', async () => {
  return { hello: 'xxxx' }
})

Route.get('/test', async (ctx) => {
  return new PostsController().index(ctx)
})
