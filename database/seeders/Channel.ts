import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Channel from 'App/Models/Channel'

export default class extends BaseSeeder {
  public async run() {
    const channelAlreadyExists: Channel | null = await Channel.findBy('name', 'general')

    if (!channelAlreadyExists) {
      await Channel.createMany([
        {
          name: 'general',
        },
      ])
    }
  }
}
