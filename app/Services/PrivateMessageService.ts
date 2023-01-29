import PrivateMessage from "App/Models/PrivateMessage";

export default class PrivateMessageService {
  public static async index() {
    return PrivateMessage.query().preload('receiver').preload('sender');
  }

  public static async getUserMessage(userId: number){
    return PrivateMessage.query()
      .where('receiver_id', userId)
      .orWhere('sender_id', userId)
      .preload('receiver')
      .preload('sender')
      .orderBy('id', 'desc');
  }

  public static async show(id) {
    return await PrivateMessage.findOrFail(id)
  }

  public static async store(content: string, receiverId: bigint, senderId: bigint) {
    return await PrivateMessage.create({ content, receiverId, senderId })
  }

  public static async update(id, data) {
    const message = await PrivateMessage.findOrFail(id)
    message.merge(data)
    await message.save()

    return message
  }

  public static async destroy(id) {
    const message = await PrivateMessage.findOrFail(id)
    await message.delete()
  }
}
