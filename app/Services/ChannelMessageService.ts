import ChannelMessage from "App/Models/ChannelMessage";

export default class ChannelMessageService {
  public static async index() {
    return ChannelMessage.query().preload('user');
  }

  public static async show(id) {
    return await ChannelMessage.findOrFail(id)
  }

  public static async store(content: string, channelId: bigint, userId: bigint) {
    return await ChannelMessage.create({ content, channelId, userId })
  }

  public static async update(id, data) {
    const message = await ChannelMessage.findOrFail(id)
    message.merge(data)
    await message.save()

    return message
  }

  public static async destroy(id) {
    const message = await ChannelMessage.findOrFail(id)
    await message.delete()
  }
}
