import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'
import AuthService from 'App/Services/AuthService'

export default class extends BaseSeeder {
  public async run() {
    const username = Env.get('SITE_NAME')
    const token: string = await AuthService.computedToken(username)

    const userAlreadyExists: User | null = await User.findBy('username', username)

    if (!userAlreadyExists) {
      await User.createMany([
        {
          username,
          token,
        },
      ])
    }
  }
}
