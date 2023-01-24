import Channel from "App/Models/Channel";

export default class ChannelService {
  public static async index() {
    return Channel.query().orderBy('id', 'asc');
  }

  public static async store({ name }) {
    return await Channel.create({ name })
  }

  public static async show(id) {
    return await Channel.findOrFail(id)
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
