import got from "got";
import Env from '@ioc:Adonis/Core/Env'
import Channel from "App/Models/Channel";

export default class MercureService {
  private static mercureUrl = Env.get('MERCURE_URL')
  private static token = Env.get('MERCURE_TOKEN')

  public static createTopic(channel: Channel) {

    console.log(channel.serialize());

    return got.post(this.mercureUrl, {
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
      form: [
        ['topic', 'topics'],
        ['data', JSON.stringify(channel)],
      ],
    })
  }
}
