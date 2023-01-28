import Message from "App/Models/Message";

export default class MessageService {
  public static async index() {
    return await Message.all()
  }

  public static async show(id) {
    return await Message.findOrFail(id)
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
