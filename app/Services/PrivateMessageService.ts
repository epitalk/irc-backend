import PrivateMessage from "App/Models/PrivateMessage";
import Database from "@ioc:Adonis/Lucid/Database";

export default class PrivateMessageService {
  public static async index() {
    return PrivateMessage.query().preload("receiver").preload("sender");
  }

  public static async getUsersWithMessage(userId: number) {
    // const sql = "SELECT DISTINCT user.* FROM user JOIN private_message ON (private_message.receiver_id = user.id OR private_message.sender_id = user.id) AND user.id != 1 WHERE private_message.receiver_id = 1 OR private_message.sender_id = 1 ORDER BY private_message.id DESC;";
    const users = await Database
      .from("user")
      .select("user.id", "user.username")
      .distinct()
      .join("private_message", (query) => {
        query
          .on("private_message.receiver_id", "=", "user.id")
          .andOnVal("user.id", "!=", userId)
          .orOn("private_message.sender_id", "=", "user.id")
          .andOnVal("user.id", "!=", userId)
      })
      .where('private_message.receiver_id', userId)
      .orWhere('private_message.sender_id', userId)
      .orderBy('private_message.id', 'desc');

    for (const u of users) {
      u.messages = await Database
        .from("private_message")
        .select("*")
        .where((builder) => {
          builder.where({ receiver_id: userId, sender_id: 1 })
            .orWhere({ receiver_id: 1, sender_id: userId });
        })
        .orderBy("id", "desc");
    }

    return users
  }

  public static async show(id) {
    return await PrivateMessage.findOrFail(id);
  }

  public static async store(content: string, receiverId: bigint, senderId: bigint) {
    return await PrivateMessage.create({ content, receiverId, senderId });
  }

  public static async update(id, data) {
    const message = await PrivateMessage.findOrFail(id);
    message.merge(data);
    await message.save();

    return message;
  }

  public static async destroy(id) {
    const message = await PrivateMessage.findOrFail(id);
    await message.delete();
  }
}
