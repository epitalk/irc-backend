import Route from '@ioc:Adonis/Core/Route'
import jws from 'jws'
import got from 'got'

Route.get('/auth/:id', async () => {
  return await computedToken({
    mercure: { subscribe: [`*`] },
  })
})

Route.get('/chat/topics', async () => {
  const options = {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJtZXJjdXJlIjp7InN1YnNjcmliZSI6WyIqIl19fQ.g3w81T7YQLKLrgovor9uEKUiOCAx6DmAAbq18qmDwsY',
    },
  }
  return got.get('http://localhost:1405/.well-known/mercure/subscriptions', options)
})

Route.post('/chat/public', async ({ request }) => {
  const message: string = await request.input('message')

  console.log(message)

  new Update(['general'], { message }).send()

  return { message }
})

// Route.get('/private', () => {
//   const data = { foo: 'bar' }
//
//   new Update(['/chat'], data, true).send()
//
//   return { status: 'Ok' }
// })

Route.post('/chat/topic', async ({ request }) => {
  const topic: string = await request.input('topic')
  await Mercure.createTopic(topic)

  return Mercure.getTopic()
})

class Mercure {
  private static topics = [] as String[]
  private static mercureUrl = 'http://localhost:1405/.well-known/mercure'
  private static token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdfX0.obDjwCgqtPuIvwBlTxUEmibbBf0zypKCNzNKP7Op2UM'

  public static createTopic(topicName: string) {
    this.topics.push(topicName)
    return got.post(this.mercureUrl, {
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
      form: [
        ['topic', 'topics'],
        ['data', JSON.stringify(this.topics)],
      ],
    })
  }

  public static getTopic() {
    return this.topics
  }
}

class Update {
  constructor(
    private topics: string[],
    private data: Record<string, string> = {},
    private isPrivate: boolean = false
  ) {}

  public send() {
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
