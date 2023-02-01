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
      .orWhere('private_message.sender_id', userId);

    for (const u of users) {
      u.messages = await Database
        .from("private_message")
        .select("*", "private_message.created_at")
        .join("user", (query) => {
          query
            .on("private_message.sender_id", "=", "user.id")
        })
        .where((builder) => {
          builder.where({ receiver_id: userId, sender_id: u.id })
            .orWhere({ receiver_id: u.id, sender_id: userId });
        })
    }

    return users.sort((a, b) => {
      const lastMessageA = a.messages[a.messages.length - 1].id;
      const lastMessageB = b.messages[b.messages.length - 1].id;
      return lastMessageB - lastMessageA;
    })
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
