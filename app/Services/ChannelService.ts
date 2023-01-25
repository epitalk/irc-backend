import Channel from "App/Models/Channel";
import Response from "@ioc:Adonis/Core/Response";

export default class ChannelService {
  public static async index() {
    return Channel.query().orderBy('id', 'asc');
  }

  public static async store({ name }: {name: string}) {
    return await Channel.create({ name })
  }

  public static async show(id: number) {
    return await Channel.findOrFail(id)
  }

  public static async update(id: number, data: {name: string}) {
    const channel = await Channel.findOrFail(id)
    channel.merge(data)
    await channel.save()

    return channel
  }

  public static async destroy(name: string) {
    const channel = await Channel.findBy('name', name)
    if (!channel || name === "general"){
      return null
    }
    await channel.delete()
    return channel
  }
}
