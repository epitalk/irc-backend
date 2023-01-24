import Message from 'App/Models/Message'

export default class MessageService {
  public static async index() {
    const messages = await Message.all();

    return messages
  }

  public static async store({ content, channel_id, user_id }) {
    const message = await Message.create({ content, channel_id, user_id })

    return message
  }

  public static async show(id) {
    const message = await Message.findOrFail(id)

    return message
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
