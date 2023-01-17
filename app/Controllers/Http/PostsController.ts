import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Hash from '@ioc:Adonis/Core/Hash'

export default class PostsController {
  public async index(ctx: HttpContextContract) {
    Database.table('users')
      .returning('id')
      .insert({
        username: 'virk',
        email: 'virk@adonisjs.com',
        password: await Hash.make('secret'),
      })

    ctx.response.send({ hello: 'TESTTTTTT' })
  }
}
