import Route from '@ioc:Adonis/Core/Route'
import jws from 'jws'
import got from 'got'

Route.get('/auth/:id', async () => {
  return await computedToken({
    mercure: { subscribe: [`*`] },
  })
})

Route.post('/chat/channel/:channel', async ({ request, params }) => {
  const message: string = await request.input('message')

  new Update([params.channel], { message }).send()

  return { message }
})

// Route.get('/private', () => {
//   const data = { foo: 'bar' }
//
//   new Update(['/chat'], data, true).send()
//
//   return { status: 'Ok' }
// })

class Update {
  constructor(
    private topics: string[],
    private data: Record<string, string> = {},
    private isPrivate: boolean = false
  ) {}

  public send() {
    console.log("send");
    return got.post('http://localhost:1405/.well-known/mercure', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdfX0.obDjwCgqtPuIvwBlTxUEmibbBf0zypKCNzNKP7Op2UM',
      },
      form: [
        ...this.topics.map((topic) => ['topic', topic]),
        ['data', JSON.stringify(this.data)],
      ].concat(this.isPrivate ? ['private', 'on'] : []),
    })
  }
}

function computedToken(payload) {
  return new Promise((resolve, reject) => {
    jws
      .createSign({
        payload,
        secret: '!ChangeMe!',
        header: { alg: 'HS256' },
      })
      .on('error', reject)
      .on('done', resolve)
  })
}
