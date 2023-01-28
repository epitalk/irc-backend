import Message from "App/Models/Message";

export default class MessageService {
  public static async index() {
    return Message.query().preload('user');
  }

  public static async show(id) {
    return await Message.findOrFail(id)
  }

  public static async store(content: string, channelId: bigint, userId: bigint) {
    return await Message.create({ content, channelId, userId })
  }

  public static async update(id, data) {
    const message = await Message.findOrFail(id)
    message.merge(data)
    await message.save()

    return message
  }

  public static async destroy(id) {
    const message = await Message.findOrFail(id)
    await message.delete()
  }
}
