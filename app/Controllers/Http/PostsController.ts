import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class PostsController {
  public async index(ctx: HttpContextContract) {
    const user = new User()
    user.username = 'testtttttt'

    await user.save()

    ctx.response.send({ result: user.$isPersisted })
  }
}
