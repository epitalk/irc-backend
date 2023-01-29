import got from "got";
import Env from "@ioc:Adonis/Core/Env";
import Channel from "App/Models/Channel";
import User from "App/Models/User";

export default class MercureService {
  private static mercureUrl = Env.get("MERCURE_URL");
  private static token = Env.get("MERCURE_TOKEN");

  public static async newMessage(message: {content: string, username: string}, channel: string) {
    await got.post(this.mercureUrl, {
      headers: {
        Authorization: "Bearer " + this.token
      },
      form: [
        ["topic", channel],
        ["data", JSON.stringify(message)]
      ]
    });
    return message
  }

  public static actionTopic(channel: Channel, action: "create" | "delete" | "join" | "leave", user = null as User | null) {
    return got.post(this.mercureUrl, {
      headers: {
        Authorization: "Bearer " + this.token
      },
      form: [
        ["topic", "topics"],
        ["data", JSON.stringify({ action, channel, user })]
      ]
    });
  }
}
