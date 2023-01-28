import got from "got";
import Env from "@ioc:Adonis/Core/Env";
import Channel from "App/Models/Channel";

export default class MercureService {
  private static mercureUrl = Env.get("MERCURE_URL");
  private static token = Env.get("MERCURE_TOKEN");

  /*Sse for leave and join channel*/
  public static async chatActions(event: "leave" | "join", username: string, channel: string){
    await got.post(this.mercureUrl, {
      headers: {
        Authorization: "Bearer " + this.token
      },
      form: [
        ["topic", "actions"],
        ["data", JSON.stringify({ event, username, channel})]
      ]
    });
  }

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

  public static createTopic(channel: Channel) {
    return got.post(this.mercureUrl, {
      headers: {
        Authorization: "Bearer " + this.token
      },
      form: [
        ["topic", "topics"],
        ["data", JSON.stringify(channel)]
      ]
    });
  }
}
