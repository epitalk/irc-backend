import Channel from 'App/Models/Channel'

export default class ChannelService {
  public static async index() {
    const channels = await Channel.all()

    return channels
  }

  public static async store({ name }) {
    const channel = await Channel.create({ name })

    return channel
  }

  public static async show(id) {
    const channel = await Channel.findOrFail(id)

    return channel
  }

  public static async update(id, data) {
    const channel = await Channel.findOrFail(id)
    channel.merge(data)
    await channel.save()

    return channel
  }

  public static async destroy(id) {
    const channel = await Channel.findOrFail(id)
    await channel.delete()
  }
}
